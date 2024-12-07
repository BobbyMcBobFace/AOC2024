const fs = require('fs');
const filePath = 'List.txt';
const target = /mul\((\d{1,3}),(\d{1,3})\)/g;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    let totalSum = 0;
    let match;


    while ((match = target.exec(data)) !== null) {
        const x = parseInt(match[1], 10); 
        const y = parseInt(match[2], 10);
        totalSum += mul(x, y); 
    }

    
    console.log(totalSum);  

});

function mul(x, y) {
    return x * y;
}
