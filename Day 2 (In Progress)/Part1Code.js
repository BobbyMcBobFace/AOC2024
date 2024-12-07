const fs = require('fs');

fs.readFile('List.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.trim().split(/\n/).map(row => row.split(/\s/));
    const bitArrays = lines.map(row => row.map(bit => +bit));

    const sortedArrays = [];
    let totalFailed = 0;
    let totalSorted = 0;

    bitArrays.forEach((array) => {
        let isAscending = true;
        let isDescending = true;

        for (let i = 0; i < array.length - 1; i++) {
            isAscending &&= (array[i] < array[i + 1]);
            isDescending &&= (array[i] > array[i + 1]);
        }

        if (isAscending || isDescending) {
            totalSorted++;
            sortedArrays.push(array);
        } else {
            totalFailed++;
        }
    });

    console.log(`Total Unsorted Tests: ${totalFailed}`);
    console.log(`Total Sorted Tests: ${totalSorted}`);

    const validSortedArrays = [];
    let totalValidFailed = 0;

    sortedArrays.forEach((array) => {
        let meetsCondition = true;

        for (let i = 0; i < array.length - 1; i++) {
            const difference = Math.abs(array[i] - array[i + 1]);
            if (difference < 1 || difference > 3) {
                meetsCondition = false;
                break;
            }
        }

        if (meetsCondition) {
            validSortedArrays.push(array);
        } else {
            totalValidFailed++;
        }
    });

    console.log(`Total Failed Sorted Tests: ${totalValidFailed}`);
    console.log(`Total Passed Sorted Arrays: ${validSortedArrays.length}`);
});
