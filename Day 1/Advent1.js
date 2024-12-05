import { readFileSync } from "fs";

function readNumberLists() {
    
    var text1 = readFileSync("./List1.txt", "utf8");
    var List1 = text1.split("\n").map(Number);
    
   
    var text2 = readFileSync("./List2.txt", "utf8");
    var List2 = text2.split("\n").map(Number);
    
    return [List1, List2];
}

const  [List1, List2] = readNumberLists();

function sortLists(lists) {
    const sortedList1 = lists[0].sort((a, b) => a - b);
    const sortedList2 = lists[1].sort((a, b) => a - b);
    
    return [sortedList1, sortedList2];
}

const [sortedList1, sortedList2] = sortLists([List1, List2]);

function calculateTotalDistance(list1, list2) {
    const maxLength = Math.min(list1.length, list2.length);
    let totalDistance = 0;

    for (let i = 0; i < maxLength; i++) {
        const distance = Math.abs(list1[i] - list2[i]);
        totalDistance += distance;
    }

    return totalDistance;
}


const totalDistance = calculateTotalDistance(sortedList1, sortedList2);

console.log("Total Distance Between Paired Numbers:", totalDistance);


