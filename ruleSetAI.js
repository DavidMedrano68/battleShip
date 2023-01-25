import GameBoard from "./gameBoard";
import { randomCoord } from "./help/helpFunc";
import { hasProto } from "./help/arrProto";
hasProto();
class ruleSetAI {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.moves = [];
  }
  generateAttack() {
    const [y, x] = randomCoord();
    if (this.validatePlay([y, x]) || !this.gameBoard.recieveAttack(y, x)) {
      this.generateAttack();
    }
    this.moves.push([y, x]);
    this.gameBoard.recieveAttack(y, x);
  }
  attack(y, x) {
    if (this.validatePlay([y, x]) || !this.gameBoard.recieveAttack(y, x)) {
      return undefined;
    }
    this.gameBoard.recieveAttack(y, x);
  }
  validatePlay(attack) {
    return this.moves.Has(attack);
  }
}
