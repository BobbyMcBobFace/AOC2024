import { readFileSync } from "fs";

function readNumberList(filePath) {

    const text = readFileSync(filePath, "utf8");

    const numberList = text.split("\n").map(Number).filter(num => !isNaN(num));
    return numberList;
}

const List1 = readNumberList("./List1.txt");
const List2 = readNumberList("./List2.txt");

function calculateSimilarityScore(leftList, rightList) {
    const countMap = new Map();

    rightList.forEach(function(num) {
        if (countMap.has(num)) {
            countMap.set(num, countMap.get(num) + 1);
        } else {
            countMap.set(num, 1);
        }
    });

    let totalScore = 0;
    leftList.forEach(function(num) {
        if (countMap.has(num)) {
            totalScore += num * countMap.get(num);
        }
    });

    return totalScore;
}

const similarityScore = calculateSimilarityScore(List1, List2);

console.log("Total Similarity Score:", similarityScore);