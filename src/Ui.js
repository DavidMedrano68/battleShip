export const UI = {
  createGrid(playerGrid, parent) {
    let x = 0;
    let y = 9;
    for (let i = 0; i < 100; i++) {
      if (x >= 9) {
        y--;
        x = 0;
      } else if (y == 9 && i == 0) {
        x = 0;
      } else {
        x++;
      }
      playerGrid.appendChild(this.createCell(x, y, null));
    }
    const vertNums = this.createElem("div", "numbers");
    const horNums = this.createElem("div", "horNumbers");
    let number = 9;
    let horNumber = 0;
    for (let i = 0; i != 10; i++) {
      const num = document.createElement("div");
      num.innerText = number;
      vertNums.appendChild(num);
      number--;
    }
    for (let i = 0; i != 10; i++) {
      const Hor = document.createElement("div");
      Hor.innerText = horNumber;
      horNums.appendChild(Hor);
      horNumber++;
    }
    const seperationDiv = document.createElement("div");
    parent.insertBefore(vertNums, playerGrid);
    parent.appendChild(seperationDiv);
    parent.appendChild(horNums);
  },
  createCell(x, y, status) {
    const cell = document.createElement("div");
    cell.setAttribute("data-x", x);
    cell.setAttribute("data-y", y);
    cell.id = "cell";
    cell.className = status;
    return cell;
  },
  createElem(type, id) {
    const elem = document.createElement(type);
    elem.classList = id;
    return elem;
  },
};
