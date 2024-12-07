const fs = require('fs'); // Import the filesystem module
const filePath = 'List.txt';
const target = /mul\((\d{1,3}),(\d{1,3})\)/g;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    let totalSum = 0;
    let match;

    // Loop through each match found by the regex
    while ((match = target.exec(data)) !== null) {
        const x = parseInt(match[1], 10); // First number
        const y = parseInt(match[2], 10); // Second number
        totalSum += mul(x, y); // Calculate product and add to total sum
    }

    
    console.log(totalSum);  

});

function mul(x, y) {
    return x * y;
}
