import { randomCoord } from "../help/helpFunc.js";
import { hasProto } from "../help/arrProto.js";
hasProto();
export default class Player {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.moves = [];
  }
  generateAttack() {
    const [y, x] = randomCoord();
    if (this.validatePlay([y, x])) {
      return this.generateAttack();
    }
    const response = this.gameBoard.recieveAttack(y, x);
    if (response == undefined) {
      return this.generateAttack();
    }
    this.moves.push([y, x]);
    return response;
  }
  attack(y, x) {
    this.moves.push([y, x]);
    return this.gameBoard.recieveAttack(y, x);
  }
  validatePlay(attack) {
    return this.moves.Has(attack);
  }
  getMoves() {
    return this.moves;
  }
}
