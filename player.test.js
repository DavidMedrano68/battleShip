import Player from "./player";
import GameBoard from "./gameBoard";
import { ship } from "./ship";

const gameBoard = new GameBoard();
const player1 = new Player(gameBoard);
const double = ship(2);
gameBoard.placeShips(double, 4, 5);
test("player attacks outbounds", () => {
  expect(player1.attack(10, 10)).toBeFalsy();
});

// test("player attacks", () => {
//   expect(player1.attack(5, 4)).toBe(true);
// });
test("computer Attacks", () => {
  expect(player1.generateAttack()).toBe(true);
});
test("print 3 hits", () => {
  expect(gameBoard.checkBoard()).toBe(true);
});
