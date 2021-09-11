var self = this;
self.canvas = document.getElementById("canvas");
self.ctx = canvas.getContext("2d");
self.width = canvas.width = 600;
self.height = canvas.height = 600;
self.res = 30;
self.rows = Math.floor(self.width/res);
self.columns = Math.floor(self.height/res);
self.path = [];
self.grid = [];
for (let i = 0; i < self.columns; i++) {
    self.grid.push([]);
    for (let j = 0; j < self.rows; j++) {
        self.grid[i].push(new Cell(j, i, self.res));
    }
}
self.CurrentCell = self.StartingCell = grid[0][0];
self.CurrentCell.visit();

update();

function update() {
    self.NextCell = CurrentCell.GetNewNeighbor(grid);
    if (self.NextCell) {
        self.NextCell.visit();
        self.path.push(self.NextCell);
        self.CurrentCell.merge(NextCell);
        self.CurrentCell.leave();
        self.CurrentCell = NextCell;
    } else {
        if (self.path.length > 0) {
            self.CurrentCell.leave();
            self.NextCell = self.path[self.path.length-1];
            self.path.pop();
            self.NextCell.visit();
            self.CurrentCell = self.NextCell;
        } else {
            self.NextCell = self.StartingCell;
            self.NextCell.visit();
            self.StartingCell.GetNeighbors(grid).forEach(cell => cell.leave());
        }
    }
    self.grid.forEach(row => row.forEach(cell => cell.draw(ctx)));
    window.requestAnimationFrame(update);
};

