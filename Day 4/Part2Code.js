const fs = require('fs');
const readline = require('readline');

let gridData = [];

function searchXMas(grid) {
    let count = 0;

    for (let row = 0; row < grid.length - 2; row++) {
        for (let col = 0; col < grid[row].length - 2; col++) {
            count += checkAllPatterns(grid, row, col);
        }
    }

    return count;
}

function checkAllPatterns(grid, startRow, startCol) {
    let count = 0;

    if (matchesStandardXMas(grid, startRow, startCol)) count++;
    if (matchesTopMPattern(grid, startRow, startCol)) count++;
    if (matchesLeftMPattern(grid, startRow, startCol)) count++;
    if (matchesRightMPattern(grid, startRow, startCol)) count++;

    return count;
}

function matchesStandardXMas(grid, startRow, startCol) {
    return (
        grid[startRow][startCol] === 'S' &&
        grid[startRow][startCol + 2] === 'S' &&
        grid[startRow + 1][startCol + 1] === 'A' &&
        grid[startRow + 2][startCol] === 'M' &&
        grid[startRow + 2][startCol + 2] === 'M'
    );
}

function matchesTopMPattern(grid, startRow, startCol) {
    return (
        grid[startRow][startCol] === 'M' &&
        grid[startRow][startCol + 2] === 'M' &&
        grid[startRow + 1][startCol + 1] === 'A' &&
        grid[startRow + 2][startCol] === 'S' &&
        grid[startRow + 2][startCol + 2] === 'S'
    );
}

function matchesLeftMPattern(grid, startRow, startCol) {
    return (
        grid[startRow][startCol] === 'M' &&
        grid[startRow][startCol + 2] === 'S' &&
        grid[startRow + 1][startCol + 1] === 'A' &&
        grid[startRow + 2][startCol] === 'M' &&
        grid[startRow + 2][startCol + 2] === 'S'
    );
}

function matchesRightMPattern(grid, startRow, startCol) {
    return (
        grid[startRow][startCol] === 'S' &&
        grid[startRow][startCol + 2] === 'M' &&
        grid[startRow + 1][startCol + 1] === 'A' &&
        grid[startRow + 2][startCol] === 'S' &&
        grid[startRow + 2][startCol + 2] === 'M'
    );
}

async function readFileAndProcess(filePath) {
    const readStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        gridData.push(line.trim());
    }

    const count = searchXMas(gridData);
    console.log(`The X-MAS pattern was found ${count} time${count === 1 ? '' : 's'}.`);
}

function main() {
    const filePath = 'List.txt'; 
    readFileAndProcess(filePath).catch(err => console.error(err));
}

main();
