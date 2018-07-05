/*
* An algorithm for inserting commas into numbers to make them look more presentable -- works any number digits above four
* */

function insertCommas(strNum) { // The number in string format
    if(strNum.length > 3) // Checking to see if a comma is required
    {
        var reversedStr = strNum.split('').reverse().join(''); // Reverse the number string to prepare it for slicing
        var insertedArr = []; // Contains the number string substrings with each of length three (the string will be split into parts of three)
        var iterations = Math.ceil(reversedStr.length / 3); // The number of times the splitting msut happen
        for(var i = 0; i < iterations; i++) { // loop, what else?
            var start = i * 3; // The starting index, initially at 0
            insertedArr.push(reversedStr.substr(start, 3).split('').reverse().join('')); // Push into the array the substring consisting of three consecutive elements, that have been split into an array, reversed and joined back together into another string -- The new substring must be reversed because the initial number string was reversed.
        }
        return insertedArr.reverse().join(','); // Reverse the array of substrings (because original string was reversed initially) and join them using a comma to create a string, finally returning it.
    }
    else // No comma required so return the original as is
    {
        return strNum; // return as it is.
    }
}