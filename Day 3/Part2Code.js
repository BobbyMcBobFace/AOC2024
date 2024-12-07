const fs = require('fs');
const filePath = 'List.txt';
const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doPattern = /do\(\)/g;
const dontPattern = /don't\(\)/g;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    let totalSum = 0;
    let match;
    let mulEnabled = true; 

    const tokens = data.split(/(?=mul\()|(?=do\(\))|(?=don't\(\))/);
    console.log(tokens);

    for (const token of tokens) {
        if (doPattern.test(token)) {
            mulEnabled = true; 
        } else if (dontPattern.test(token)) {
            mulEnabled = false; 
        } else if (mulEnabled) {
            while ((match = mulPattern.exec(token)) !== null) {
                const x = parseInt(match[1], 10);
                const y = parseInt(match[2], 10);
                totalSum += mul(x, y);
            }
        }
    }

    console.log(totalSum);
});

function mul(x, y) {
    return x * y;
}
