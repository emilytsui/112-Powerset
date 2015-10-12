/** 
 * @file Select the Language
 * @author 
 */
var main = function(ex) {
    //always quiz-immediate
    console.log(ex.data.meta.mode);

    /**
     * @returns {object} See Piazza post 
     */
    var generateContent = function () {
        var content = {};
        //populate content
        return content;
    };

    /**
     * @param {object} the result of generateContent()
     * @param {object} just pass in ex.data
     * @returns {number} floating point from 0 to 1
     */
    var grade = function (content,state) {
        return 1.0; 
    };


    ////////////content configuration
    var listLength = 2;
    //a list of objects that have two properties: input and result
    //Most important varaible
    var recursiveCalls = []; 
    var recursiveDepth = 0;
    //true if returning
    var isReturning = false;
    //true if function has returned, but not yet substitute into
    //previous call
    var isSubstituting = false;
    //true if the returned values has been substituted, but not yet merged
    var isMerging = false;



    //////////////layout configuration
    var canvasWidth = ex.width();
    var canvasHeight = ex.height();
    var topMargin = canvasHeight / 10;
    var sideMargin = canvasWidth / 20;
    var lineHeight = canvasHeight / 15;
    var blockWidth = (canvasWidth - sideMargin * 2) / (listLength + 1);
    //+1 because recursive calls are one more than length of the input
    var fontSize = "large"



    ///////////////button configuration
    var nextButton = ex.createButton(canvasWidth*(8/10), canvasHeight*(9/10),
                                    "Next").on("click", nextStep)





    //return a list of integer of length listLength, values from 0 to 9
    function generateList() {
        var arr = [];
        for (i = 0; i < listLength; i++) {
            n = round(Math.random() * 10);
            arr.push(n);
        }
        return(arr);
    }


    //if x is of type number, string or list, xToString convert x to string
    function xToString(x) {
        if (typeof(x) == "number") 
            return x.toString();
        else if (typeof(x) == "string") 
            return "\""+x+"\"";
        else {
            var str = "[";
            for (var i = 0; i < x.length; i++) {
                str += xToString(x[i]);
                if (i != x.length-1) {
                    str += ", ";
                }
            }
            str += "]";
            return str;
        }   
    }
    //Test
    //console.log(xToString([[],[1,2],"ss"]))


    function powersetMain(l) {
        if (l.length == 0) {
            recursiveCalls.unshift({input: [], 
                                        result: [[]]})
            return [[]];
        }
            else {
                var allSubsets = [];
                var powerSet = powersetMain(l.slice(1));
                for (i = 0; i < powerSet.length; i++) {
                    var subset = powerSet[i];
                    allSubsets.push(subset);
                    var subset0 = [l[0]].concat(subset);
                    allSubsets.push(subset0);
                }
                recursiveCalls.unshift({input: l, 
                                        result: allSubsets});
                return allSubsets;
            }
    }

    //generate recursiveCall data
    powersetMain([1,2])
    console.log(recursiveCalls)


    //perform appropriate action after nextButton is hitted
    function nextStep() {

        if (recursiveDepth == listLength + 1) {
            //start to return
            isReturning = true;
            recursiveDepth--;
        }

        if (recursiveDepth == -1) {
            //finish
            return;
        }

        if (!isReturning) {
            //recursive call
            drawCall();
            recursiveDepth++;
        } else {
            //if next step is to merge
            if (isMerging) {
                drawMerge();
                isMerging = false;
            } else {
            //Normal return
                drawReturn();
                if (recursiveDepth != 0) isMerging = true;
                recursiveDepth--;
            }
        }

    }

    //draw blocks representing function call
    function drawCall() {

        //thisCall is an object, it stores the input, result and 
        //header elements of this call
        var thisCall = recursiveCalls[recursiveDepth];
        var input = thisCall.input;

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * recursiveDepth;
        //times 1.5 because the height offirst line of a newblock is between the height of
        //second and third lines of the previous block
        var yOrigin = topMargin + recursiveDepth * 1.5 * lineHeight;

        //Base Case
        if (recursiveDepth == listLength) {
            var s1 = "powerset("+xToString(input)+")"
            var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                        {size:fontSize, textAlign:"right"});
            h1.width(blockWidth);
            thisCall.h1 = h1; 
            return;
        }

        //powerset([*,*,*****])
        var s1 = "powerset("+xToString(input)+")"
        var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                                {size:fontSize, textAlign:"right"});
        h1.width(blockWidth);
        thisCall.h1 = h1;

        //[ ] +
        var s2 = "[ ] +"
        var h2 = ex.createHeader(xOrigin, yOrigin + lineHeight, s2,
                                {size:fontSize, textAlign:"right"});
        h2.width(blockWidth);
        thisCall.h2 = h2;

        //[*] +
        var s3 = "["+xToString(input[0])+"] +"
        var h3 = ex.createHeader(xOrigin, yOrigin + 2 * lineHeight, s3,
                                {size:fontSize, textAlign:"right"});
        h3.width(blockWidth);
        thisCall.h3 = h3;
    }

    //remove headers that represnting function call
    //dosplay the return value
    function drawReturn() {
        var thisCall = recursiveCalls[recursiveDepth];

        //if base case just remove one header
        if (recursiveDepth == listLength) {
            //Base Case 
            thisCall.h1.remove();
            var s1 = "[ ]"
        } else {
            thisCall.h1.remove();
            thisCall.h2.remove();
            thisCall.h3.remove();
            var s1 = xToString(thisCall.result);
        }

        var xOrigin = sideMargin + blockWidth * recursiveDepth;
        var yOrigin = topMargin + recursiveDepth * 1.5 * lineHeight;

        //display the return value
        var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                    {size:fontSize, textAlign:"left"});
        h1.width(blockWidth);
        thisCall.h1 = h1; 
    }

    //display the result after merge(or not) the first element with the returned value
    function drawMerge() {

        //remove header of the callee
        recursiveCalls[recursiveDepth+1].h1.remove();

        /////////The following code has a scary bug, possibly involving list alias.
        /////////Consider remove it.

        // //append the returned value onto the expression
        // //the returned list from the callee
        // var returnedList = recursiveCalls[recursiveDepth+1].result.slice();
        // //first half of the result is the same as the returned list
        // var firstHalfOfResult = returnedList
        // var firstElement = recursiveCalls[recursiveDepth].input[0];
        // //second half of the result is firstElement added to the front of each element in the returned list 
        // var secondHalfOfResult = firstHalfOfResult.slice(); //.slice() to avoid alias
        // for (var i = 0; i < secondHalfOfResult.length; i++){
        //     secondHalfOfResult[i] = secondHalfOfResult[i].unshift(firstElement);
        // }

        // //s2 = "[]+", s3 = "[*]+"
        // var s2 = recursiveCalls[recursiveDepth].h2.text();
        // var s3 = recursiveCalls[recursiveDepth].h3.text();

        // recursiveCalls[recursiveDepth].h2.text(s2+": "+xToString(firstHalfOfResult));
        // recursiveCalls[recursiveDepth].h3.text(s3+": "+xToString(secondHalfOfResult));
    }



};
