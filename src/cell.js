class Cell {
    constructor(j, i, res) {
        this.j = j;
        this.i = i;
        this.res = res;
        this.x = j * res;
        this.y = i * res;
        this.visited = false;
        this.highlighted = false

        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        }

        this.corner_cords = {
            topleft: [this.x, this.y],
            topright: [this.x + res, this.y],
            bottomright: [this.x + res, this.y + res],
            bottomleft: [this.x, this.y + res]
        }

        this.border_cords = {
            top: [this.corner_cords.topleft, this.corner_cords.topright],
            right: [this.corner_cords.topright, this.corner_cords.bottomright],
            bottom: [this.corner_cords.bottomright, this.corner_cords.bottomleft],
            left: [this.corner_cords.bottomleft, this.corner_cords.topleft]
        }
    };

    draw(ctx) {
        if (this.walls.top) {
            DrawLine(...this.border_cords.top, ctx, "black", 1)
        } if (this.walls.right) {
            DrawLine(...this.border_cords.right, ctx, "black", 1)
        } if (this.walls.bottom) {
            DrawLine(...this.border_cords.bottom, ctx, "black", 1)
        } if (this.walls.left) {
            DrawLine(...this.border_cords.left, ctx, "black", 1)
        }

        if (this.highlighted) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.res, this.res);
        } else if (this.visited) {
            ctx.fillStyle = "#9400D3";
            ctx.fillRect(this.x, this.y, this.res, this.res);
        } else {
            ctx.fillStyle = "purple";
            ctx.fillRect(this.x, this.y, this.res, this.res);
        }
    };

    GetNeighbors(grid) {
        let neighbors = [];

        if (ValidIndex(this.j, this.i - 1, grid)) { // top neighbor
            neighbors.push(grid[this.i - 1][this.j]);
        } if (ValidIndex(this.j + 1, this.i, grid)) { // right neighbor
            neighbors.push(grid[this.i][this.j + 1]);
        } if (ValidIndex(this.j, this.i + 1, grid)) { // bottom neighbor
            neighbors.push(grid[this.i + 1][this.j]);
        } if (ValidIndex(this.j - 1, this.i, grid)) { // left neighbor
            neighbors.push(grid[this.i][this.j - 1]);
        }

        return neighbors;
    }

    GetNewNeighbor(grid) {
        let neighbors = this.GetNeighbors(grid);
        let newNeighbors = [];
        for (let i = neighbors.length - 1; i > -1; i--) {
            if (!neighbors[i].visited) {
                newNeighbors.push(neighbors[i]);
            }
        }
        if (newNeighbors.length > 0) {
            return newNeighbors[Randint(0, newNeighbors.length - 1)];
        } else {
            return undefined;
        }
    }

    merge(that) {
        if (that.j == this.j && that.i + 1 == this.i) { // that is on the top
            this.walls.top = false;
            that.walls.bottom = false;
        } else if (that.j - 1 == this.j && that.i == this.i) { // that is on the right
            this.walls.right = false;
            that.walls.left = false;
        } else if (that.j == this.j && that.i - 1 == this.i) { // that is on the bottom
            this.walls.bottom = false;
            that.walls.top = false;
        } else if (that.j + 1 == this.j && that.i == this.i) { // that is on the left
            this.walls.left = false;
            that.walls.right = false;
        } else {
            console.log("the cell isn't a neighbor");
            return undefined;
        }
    };

    visit() {
        this.visited = true
        this.highlighted = true
    };

    leave() {
        this.highlighted = false
    };
}