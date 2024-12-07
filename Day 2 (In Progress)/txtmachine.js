
var isDescending = true;
var isAscending = true;
var failed = 0;


for (var i=0, l=array.length-1; i<l; i++) {

    isAscending = isAscending && (array[i] < array[i + 1]);
    isDescending = isDescending && (array[i] > array[i + 1]);

}

if(isAscending || isDescending) {
    console.log("Array is sorted: " + array); 
} else {
  console.log("Array is not sorted: " + array);
  failed++
  console.log("Failed Tests: " + failed);
}

