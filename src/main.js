var self = this;
self.canvas = document.getElementById("canvas");
self.ctx = canvas.getContext("2d");
self.SaveButton = document.getElementById("SaveButton");
self.width = canvas.width = 600;
self.height = canvas.height = 600;
self.res = 50;
self.rows = Math.floor(self.width/res);
self.columns = Math.floor(self.height/res);
self.StringifiedData = undefined;
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

async function update() {
    // check if the maze is finished to enable the save button
    if (IsFinished()) {
        self.SaveButton.disabled = false;
        if (!self.StringifiedData) {
            let DataToSave = {
                map: [],
                rows: self.rows,
                columns: self.columns
            }
            for (let i = 0; i < self.columns; i++) {
                DataToSave.map.push([]);
                for (let j = 0; j < self.rows; j++) {
                    DataToSave.map[i].push({
                            x: self.grid[i][j].j,
                            y: self.grid[i][j].i,
                            walls: self.grid[i][j].walls
                        }
                    );
                }
            }
            self.StringifiedData = JSON.stringify(DataToSave);
            self.BlobData = new Blob([self.StringifiedData], {type: "application/json"});
            self.url = window.URL.createObjectURL(self.BlobData);
            self.link = document.createElement("a");
            self.link.href = self.url;
            self.link.download = "maze.json";
        }
    } else {
        self.SaveButton.disabled = true;
    }
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

function SaveMaze() {
    if (IsFinished()) {
        self.link.click();
    }
    
}

function IsFinished() {
    return self.path.length == 0 && self.StartingCell.GetNeighbors(grid).every(cell => cell.visited === true);
}
