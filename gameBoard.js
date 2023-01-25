class GameBoard {
  constructor(board, placeShips = []) {
    this.board =
      board ||
      Array(10)
        .fill(null)
        .map(() => Array(10).fill(null));
    this.placedShips = placeShips;
    this.missedAttacks = [];
  }
  available(length, desiredX, desiredY) {
    let desiredCoord = [];
    for (let index = 0; index < length; index++) {
      const [y, x] = this.coords(desiredX, desiredY, index);
      if (y < 10 && x < 10) {
        desiredCoord.push(this.board[y][x]);
      } else {
        return false;
      }
    }
    return desiredCoord.every((coord) => coord === null);
  }
  coords(desiredX, desiredY, iteration) {
    return [desiredY, desiredX + iteration];
  }
  placeShips(ship, desiredX, desiredY) {
    const available = this.available(ship.length, desiredX, desiredY);
    if (available) {
      for (let i = 0; i < ship.length; i++) {
        const [y, x] = this.coords(desiredX, desiredY, i);
        this.board[y][x] = { ship };
      }
    }
  }
  recieveAttack(y, x) {
    if (this.checkOutofBounds(y, x)) {
      return undefined;
    }
    if (this.board[y][x] == "X" || this.board[y][x] == "-") {
      return undefined;
    }
    if (this.board[y][x] == null) {
      this.missedAttacks.push([y, x]);
      this.board[y][x] = "-";
      return true;
    } else if (this.board[y][x].ship) {
      this.board[y][x].ship.hit();
      this.board[y][x] = "X";
      return true;
    }
    return undefined;
  }
  allShipsSunk() {
    this.placeShips.every((ship) => ship.isSunk());
  }
  missedAttacks() {
    return this.missedAttacks;
  }
  checkOutofBounds(y, x) {
    return y > 9 || x > 9;
  }
  checkBoard() {
    return this.board;
  }
}
let ship = {
  length: 3,
  hit: () => {
    ship.length--;
  },
  isSunk: () => {
    return ship.length < 1;
  },
};
let ship2 = {
  length: 2,
  hit: () => {
    ship.length--;
  },
  isSunk: () => {
    return ship2.length < 1;
  },
};
const gameBoard = new GameBoard();
gameBoard.placeShips(ship, 3, 2);

gameBoard.recieveAttack(2, 3);
gameBoard.recieveAttack(2, 4);
gameBoard.recieveAttack(2, 5);
console.log(gameBoard.checkBoard());
console.log(ship.isSunk());
console.log(ship2.isSunk());
