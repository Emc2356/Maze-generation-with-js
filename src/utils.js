function DrawLine(start, stop, ctx, color="black", width=1) {
    ctx.beginPath();
    ctx.moveTo(...start);
    ctx.lineTo(...stop);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function ValidIndex(j, i, grid) {
    if (j >= 0 && i >= 0 && j < grid.length && i < grid[0].length) {
        return true;
    } else {
        return false;
    }
}

function Randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}