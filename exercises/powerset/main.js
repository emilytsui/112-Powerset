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

    // The state of our recursive visualization
    var state = ex.data.state

    //////////////layout configuration
    var canvasWidth = ex.width();
    var canvasHeight = ex.height();
    var topMargin = canvasHeight / 10;
    var sideMargin = canvasWidth / 20;
    var lineHeight = canvasHeight / 15;
    var blockWidth = (canvasWidth - sideMargin * 2) / (state.listLength + 1);
    //+1 because recursive calls are one more than length of the input
    var fontSize = "small"



    ///////////////button configuration
    ex.chromeElements.undoButton.disable();
    ex.chromeElements.redoButton.disable();
    ex.chromeElements.resetButton.disable();
    var nextButton = ex.createButton(canvasWidth*(9/11), canvasHeight*(9/10),
                                    "Next").on("click", nextStep)
    var prevButton = ex.createButton(canvasWidth*(9/11)-60, canvasHeight*(9/10),
                                     "Prev").on("click", prevStep)
    prevButton.disable(); //Not implemented correctly for right now
    var skipButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                     "Skip").on("click", skipStep)
    var quizButton = ex.createButton(canvasWidth*(8/9)-10, 10,
                                     "Start Quiz").on("click", startQuiz)
    quizButton.disable(); //Can't do quiz until step through visualization



    ///////// Code well containing powerset algorithm code
    var codeWell1 = ex.createCode(10, canvasHeight-180,
                                  ex.data.code.display, ex.data.code);


    //return a list of integer of length listLength, values from 0 to 9
    function generateList() {
        var arr = [];
        for (i = 0; i < state.listLength; i++) {
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
            // x is a list
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
            state.recursiveCalls.unshift({input: [],
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
                state.recursiveCalls.unshift({input: l,
                                        result: allSubsets});
                return allSubsets;
            }
    }

    //generate recursiveCall data
    powersetMain([1,2,3])
    console.log(state.recursiveCalls)

    //perform appropriate action after prevButton is clicked
    function prevStep() { //don't think this is implemented correctly
        if (state.recursiveDepth < 0){
            //Do nothing at depth 0
            return;
        }else{
            if (!state.isReturning){
                var thisCall = state.recursiveCalls[state.recursiveDepth];
                thisCall.h1.remove();
                thisCall.h2.remove();
                thisCall.h3.remove();
                drawCall();
                state.recursiveDepth--;
            }else{
                //if next step is to merge
                if (state.isMerging) {
                    drawReturn();//This may need to be changed!!
                    state.isMerging = false;
                } else {
                //Normal return
                    drawMerge();//This may need changing as well.
                    if (state.recursiveDepth != 0) state.isMerging = true;
                    state.recursiveDepth++;
                }
            }
        }
        return;
    }

    //perform appropriate action after nextButton is clicked
    function nextStep() {

        if (state.recursiveDepth == state.listLength + 1) {
            //start to return
            state.isReturning = true;
            state.recursiveDepth--;
        }

        if (state.recursiveDepth == -1) {
            //finish
            quizButton.enable();
            return;
        }

        if (!state.isReturning) {
            //recursive call
            drawCall();
            state.recursiveDepth++;
        } else {
            //if next step is to merge
            if (state.isMerging) {
                drawMerge();
                state.isMerging = false;
            } else {
            //Normal return
                drawReturn();
                if (state.recursiveDepth != 0) state.isMerging = true;
                state.recursiveDepth--;
            }
        }

    }

    //perform appropriate action after skipButton is clicked
    function skipStep() {
        // This is a quick implementation of skip using next
        // May consider revising this in the future.
        while (state.recursiveDepth != -1){
            nextStep();
        }
        quizButton.enable();
        return;
    }

    //draw blocks representing function call
    function drawCall() {

        //thisCall is an object, it stores the input, result and
        //header elements of this call
        var thisCall = state.recursiveCalls[state.recursiveDepth];
        var input = thisCall.input;

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + state.recursiveDepth * 1.5 * lineHeight;

        //Base Case
        if (state.recursiveDepth == state.listLength) {
            var s1 = "powerset("+xToString(input)+")"
            var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                        {size:fontSize, textAlign:"right",
                         transition:"fade"});
            h1.width(blockWidth);
            thisCall.h1 = h1;
            return;
        }

        //powerset([*,*,*****])
        var s1 = "powerset("+xToString(input)+")"
        var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
        h1.width(blockWidth);
        thisCall.h1 = h1;

        //[ ] +
        var s2 = "[ ] +"
        var h2 = ex.createHeader(xOrigin, yOrigin + lineHeight, s2,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
        h2.width(blockWidth);
        thisCall.h2 = h2;

        //[*] +
        var s3 = xToString([input[0]])+" +"
        var h3 = ex.createHeader(xOrigin, yOrigin + 2 * lineHeight, s3,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
        h3.width(blockWidth);
        thisCall.h3 = h3;
    }

    //remove headers that representing function call
    //display the return value
    function drawReturn() {
        var thisCall = state.recursiveCalls[state.recursiveDepth];

        //if base case just remove one header
        if (state.recursiveDepth == state.listLength) {
            //Base Case
            thisCall.h1.hide();
            var s1 = "[ ]"
        } else {
            thisCall.h1.hide();
            thisCall.h2.hide();
            thisCall.h3.hide();
            var s1 = xToString(thisCall.result);
        }

        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        var yOrigin = topMargin + state.recursiveDepth * 1.5 * lineHeight;

        //display the return value
        var h1 = ex.createHeader(xOrigin+30, yOrigin, s1,
                    {size:fontSize, textAlign:"left", transition:"fade"});

        //Doesn't set the block width to the final resulting list
        if (state.recursiveDepth != 0) h1.width(blockWidth);
        else h1.width(canvasWidth);
        thisCall.h1 = h1;

        //We used .hide() to get the fade transition, but thie removes it
        // to avoid any unforseen complications
        if (state.recursiveDepth != state.listLength) {
            thisCall.h2.remove();
            thisCall.h3.remove();
        }

    }

    //display the result after merge(or not) the first element with the returned value
    function drawMerge() {

        //remove header of the callee
        state.recursiveCalls[state.recursiveDepth+1].h1.hide();

        /////////The following code has a scary bug, possibly involving list alias.
        /////////Consider remove it.

        // //append the returned value onto the expression
        // //the returned list from the callee
        // var returnedList = state.recursiveCalls[state.recursiveDepth+1].result.slice();
        // //first half of the result is the same as the returned list
        // var firstHalfOfResult = returnedList
        // var firstElement = state.recursiveCalls[state.recursiveDepth].input[0];
        // //second half of the result is firstElement added to the front of each element in the returned list
        // var secondHalfOfResult = firstHalfOfResult.slice(); //.slice() to avoid alias
        // for (var i = 0; i < secondHalfOfResult.length; i++){
        //     secondHalfOfResult[i] = secondHalfOfResult[i].unshift(firstElement);
        // }

        // //s2 = "[]+", s3 = "[*]+"
        // var s2 = state.recursiveCalls[state.recursiveDepth].h2.text();
        // var s3 = state.recursiveCalls[state.recursiveDepth].h3.text();

        // state.recursiveCalls[state.recursiveDepth].h2.text(s2+": "+xToString(firstHalfOfResult));
        // state.recursiveCalls[state.recursiveDepth].h3.text(s3+": "+xToString(secondHalfOfResult));
    }

    function startQuiz() {
        return;
    }



};
