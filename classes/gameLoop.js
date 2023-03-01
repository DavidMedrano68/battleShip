import GameBoard from "./gameBoard.js";
import { ship } from "./ship.js";
import Player from "./player.js";
import { UI } from "../src/Ui.js";

export default class Game {
  constructor() {}

  init() {
    const grid = document.querySelector(".grid");
    const form = document.querySelector("form");
    const formXval = document.querySelector(".xCord");
    const formYval = document.querySelector(".yCord");
    const playerSide = document.querySelector(".player");
    const enemySide = document.querySelector(".enemy");
    const playerMessage = document.querySelector(".playerMessage");
    const enemyMessage = document.querySelector(".enemyMessage");
    const gameBoard = new GameBoard();
    const enemyGameboard = new GameBoard();
    const player1 = new Player(enemyGameboard);
    const player2 = new Player(gameBoard);
    const shipLengths = [
      [1, "blue"],
      [1, "red"],
      [2, "green"],
      [4, "brown"],
      [3, "orange"],
    ];
    const shipArray = createShipArr();
    const enemyShipArray = createShipArr();
    function createShipArr() {
      const array = [];
      for (let ships of shipLengths) {
        array.push(ship(ships[0], ships[1]));
      }
      return array;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const shipCoords = gameBoard.placeShips(
        shipArray[0],
        formXval.valueAsNumber,
        formYval.valueAsNumber
      );
      if (shipCoords == false) {
        return;
      }
      shipCoords.forEach((ship) => {
        drawShips(ship[0], ship[1], shipArray[0].color);
      });
      shipArray.shift();
      checkShipArr();
    });
    function checkShipArr() {
      if (!shipArray.length) {
        form.remove();
        const enemyGrid = document.createElement("div");
        enemyGrid.classList = "enemyGrid";
        enemySide.appendChild(enemyGrid);
        UI.createGrid(enemyGrid, enemySide);

        while (enemyShipArray.length) {
          enemyGameboard.autoPlaceShips(enemyShipArray[0]);
          enemyShipArray.shift();
        }
        deployEventListeners();
      }
    }

    function drawShips(y, x, shipColor) {
      const ship = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
      ship.style.backgroundColor = shipColor;
    }
    function markOnBoard(y, x, status) {
      const cell = document.querySelector(
        `.grid > [data-y="${y}"][data-x="${x}"]`
      );
      if (status) {
        cell.classList = "hit";
        cell.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
      if (status == "missed") {
        cell.classList = "missed";
        cell.innerHTML = '<i class="fa-solid fa-o"></i>';
      }
    }

    function deployEventListeners() {
      const playableCells = document.querySelectorAll(".enemyGrid > .null");
      playableCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          display(player1.attack(e.target.dataset.y, e.target.dataset.x), e);
        });
      });
    }
    function display(attack, e) {
      playerMessage.textContent = "";
      if (attack) {
        e.target.classList = "hit";
        e.target.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        playerMessage.textContent = "you have landed an atttack";
      }
      if (attack == "missed") {
        e.target.classList = "missed";
        e.target.innerHTML = '<i class="fa-solid fa-o"></i>';
        playerMessage.textContent = "you have missed an attack";
      }
      if (attack == true || attack == "missed") {
        if (allShipsSunk(gameBoard, enemyGameboard)) {
          deleteGrid("you have");
        } else {
          const enemyAttack = player2.generateAttack();
          enemyMessage.textContent = "";
          if (enemyAttack == "missed") {
            enemyMessage.textContent = "your opponent has missed";
          }
          if (enemyAttack == true) {
            enemyMessage.textContent = "your opponent has landed an attack";
          }
          if (enemyAttack == true || enemyAttack == "missed") {
            const [y, x] = player2.getMoves().at(-1);
            markOnBoard(y, x, enemyAttack);
            if (allShipsSunk(gameBoard, enemyGameboard)) {
              deleteGrid("enemy has");
            }
          }
        }
      }
    }
    function deleteGrid(winningPlayer) {
      enemySide.remove();
      playerSide.remove();
      enemyMessage.remove();
      playerMessage.remove();
      const retryScreen = UI.createElem("div", "retry");
      const winner = UI.createElem("div", "winner");
      const retryButton = UI.createElem("input", "retryBtn");
      retryButton.setAttribute("type", "submit");
      const main = document.querySelector(".main");
      winner.textContent = `${winningPlayer} won`;
      main.append(retryScreen);
      retryScreen.append(winner);
      retryScreen.append(retryButton);
      retryButton.addEventListener("click", () => {
        main.innerHTML =
          '<div class="enemyMessage"></div> <div class="playerMessage"></div> <div class="player"> <div class="grid"></div> </div> <div class="enemy"> <form action="#" class="form"> <label for="" >X <input required class="xCord" type="number" min="0" max="9"/></label> <label for="" >Y <input required class="yCord" type="number" min="0" max="9" /></label><input type="submit" value="submit" /> </form></div>';
        const newGame = new Game();
        newGame.init();
      });
    }
    function allShipsSunk(playerBoard, enemyBoard) {
      if (playerBoard.allShipsSunk() || enemyBoard.allShipsSunk()) {
        return true;
      }
      return false;
    }
    UI.createGrid(grid, playerSide);
  }
}
