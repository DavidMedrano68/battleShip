import { ship } from "../ship.js";
const ship1 = ship(3, "red");

test("ship has been hit", () => {
  ship1.hit();
  expect(ship1.getHitcount()).toBe(1);
});
test("ship has sunk", () => {
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});
