const fs = require('fs');
const readline = require('readline');

const wordToFind = "XMAS";
let gridData = [];

function searchWord(grid, word) {
    const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: 1, y: -1 }
    ];

    let count = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            for (const direction of directions) {
                if (checkWord(grid, word, row, col, direction.x, direction.y)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function checkWord(grid, word, startRow, startCol, dirX, dirY) {
    let row = startRow;
    let col = startCol;

    for (let i = 0; i < word.length; i++) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length || grid[row][col] !== word[i]) {
            return false;
        }
        row += dirY;
        col += dirX;
    }

    return true;
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

    const count = searchWord(gridData, wordToFind);
    console.log(`The word "${wordToFind}" was found ${count} time${count === 1 ? '' : 's'}.`);
}

function main() {
    const filePath = 'List.txt';
    readFileAndProcess(filePath).catch(err => console.error(err));
}

main();
