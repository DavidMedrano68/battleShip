import Player from "./player";
import GameBoard from "./gameBoard";
import { ship } from "./ship";

const gameBoard = new GameBoard();
const player1 = new Player(gameBoard);
const double = ship(2);
console.log(gameBoard.placeShips(double, 4, 5));
