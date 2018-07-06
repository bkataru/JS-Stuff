/*
* Hashifier: My feeble attempt at a hashing algorithm.
* Security: Untested, not recommended for production environments. The algo was made for educational purposes only.
* Standard hash size: 120 chars
* Required packages: None.
* Follows the Common.js module pattern so this module can be imported into any Node.js program.
* Methods:
*   1. hashifier.hashify([text], [salt]) -- main method for creating hashes
* */
var hashifier = (function() {
    var rotAlgo = function(text, rotNo) {
        var elems = text.split('');
        var newElems = [];
        elems.forEach(function (elem, index) {
            var curNo = elem.charCodeAt(0);
            var newNo = curNo + rotNo;

            var newChar = String.fromCharCode(newNo);
            newElems.push(newChar);
        });

        return newElems.join('');
    };

    var fibonacciSum = function(range) {
        var a = 0, b = 1, list = [], sum = 0;
        while(a < range)
        {
            var f = a + b;
            sum += a;
            a = b;
            b = f;
        }

        if(range % 2 === 0)
        {
            return Math.round(sum / 1.2);
        }
        else
        {
            return Math.round(sum / 1.7);
        }
    };

    var reversify = function(number) {
        var sum = fibonacciSum(number);
        if(number % 2 === 0)
        {
            sum = fibonacciSum(sum);
        }
        return sum;
    };

    var summify = function(textArr, saltArr) {
        var finalText = [];
        var textArrIndex = 0;
        var saltArrIndex = 0;
        for(var i = 1; i <= 120; i++) {
            if(i % 3 === 0)
            {
                if(textArrIndex >= textArr.length) {
                    textArr = rotAlgo(textArr.join(''), i).split('');
                    textArrIndex = 0;
                }
                finalText.push(textArr[textArrIndex]);
                textArrIndex++;
            }
            else
            {
                if(saltArrIndex >= saltArr.length)
                {
                    saltArr = rotAlgo(saltArr.join(''), i).split('');
                    saltArrIndex = 0;
                }
                finalText.push(saltArr[saltArrIndex]);
                saltArrIndex++;
            }
        }

        return finalText.join('');
    };

    return {
        hashify: function(text, salt) {
            var toRot = Math.round((text.charCodeAt(text.length - 1) + salt.charCodeAt(Math.round(salt.length / 2))
                + salt.charCodeAt(salt.length - 1)) / 30);
            var newTextArr = rotAlgo(text, toRot).split('');

            var saltRotNo = reversify(toRot);
            var newSaltArr = rotAlgo(salt, saltRotNo).split('');

            var finalText = summify(newTextArr, newSaltArr);

            return finalText;
        }
    }
})();

module.exports = hashifier;

