import { hasProto } from "./help/arrProto";
hasProto();
import { randomCoord } from "./help/helpFunc";
export default class Player {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.moves = [];
  }
  generateAttack() {
    const [y, x] = randomCoord();
    if (this.validatePlay([y, x])) {
      this.generateAttack();
    }
    this.moves.push([y, x]);
    return this.gameBoard.recieveAttack(y, x);
  }
  attack(y, x) {
    if (this.validatePlay([y, x])) {
      return undefined;
    }
    return this.gameBoard.recieveAttack(y, x);
  }
  validatePlay(attack) {
    return this.moves.Has(attack);
  }
  getMoves() {
    return this.moves;
  }
}
