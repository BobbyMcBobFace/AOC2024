const fs = require('fs');

fs.readFile('List.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.trim().split(/\n/).map(row => row.split(/\s+/));
    const reports = lines.map(row => row.map(Number));

    let totalSafeReports = 0;

    reports.forEach(report => {
        if (isSafe(report)) {
            totalSafeReports++;
        } else {
            for (let i = 0; i < report.length; i++) {
                const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
                if (isSafe(modifiedReport)) {
                    totalSafeReports++;
                    break;
                }
            }
        }
    });

    console.log(`Total Safe Reports: ${totalSafeReports}`);
});


function isSafe(report) {
    let isAscending = true;
    let isDescending = true;

    for (let i = 0; i < report.length - 1; i++) {
        const difference = Math.abs(report[i] - report[i + 1]);
        if (difference < 1 || difference > 3) {
            return false; 
        }
        isAscending &&= (report[i] < report[i + 1]);
        isDescending &&= (report[i] > report[i + 1]);
    }

    return isAscending || isDescending;
}
