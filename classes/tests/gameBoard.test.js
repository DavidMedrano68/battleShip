import GameBoard from "../gameBoard.js";
import { ship } from "../ship.js";
const gameBoard = new GameBoard();
const ship1 = ship(3, "red");
gameBoard.placeShips(ship1, 3, 2);
// the grid is a 10* 10 grid so if it doesnt have enough space it will return falsy
test("placing a big ship out of bounds", () => {
  expect(gameBoard.available(3, 8, 1)).toBeFalsy();
});
test("placing a ship that is not occupied", () => {
  expect(gameBoard.available(3, 4, 5)).toBe(true);
});
test("out of bounds attack", () => {
  expect(gameBoard.recieveAttack(10, 10)).toBeFalsy();
});
test("hits a ship", () => {
  expect(gameBoard.recieveAttack(2, 3)).toBe(true);
});
test("misses a ship but attacks gameboard", () => {
  expect(gameBoard.recieveAttack(5, 2)).toBe("missed");
});
