const UI = {
  renderGrid() {
    const grid = document.createElement("div");
    let x = 0;
    let y = 9;
    for (let i = 0; i < 100; i++) {
      if (x >= 9) {
        y--;
        x = 0;
      }
      if (i == 0 && y == 9) {
        x = 0;
      } else {
        x++;
      }
      this.renderCell(y, x, null, grid);
    }
  },
  renderCell(y, x, status) {
    const cell = document.createElement("div");
    cell.setAttribute("data-x", x);
    cell.setAttribute("data-y", y);
    cell.id = "cell";
    cell.className = status;
    return cell;
  },
  findCell(y, x) {
    return document.querySelector(`[data-y="${y}"][data-x="${x}"]`) || false;
  },
};
