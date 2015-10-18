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
    ex.chromeElements.submitButton.disable();
    var nextButton = ex.createButton(canvasWidth*(9/11), canvasHeight*(9/10),
                                    "Next").on("click", nextStep)
    var prevButton = ex.createButton(canvasWidth*(9/11)-60, canvasHeight*(9/10),
                                     "Prev").on("click", prevStep)
    //prevButton.disable(); //Not implemented correctly for right now
    var skipButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                     "Skip").on("click", skipStep)
    var quizButton = ex.createButton(canvasWidth*(8/9)-10, 10,
                                     "Start Quiz").on("click", startQuiz)
    quizButton.disable(); //Can't do quiz until step through visualization



    ///////// Code well containing powerset algorithm code
    var codeWell1 = ex.createCode(10, canvasHeight-180,
                                  ex.data.code.display, ex.data.code);
    var sep = Array(Math.round(canvasWidth/6)).join("*")
    //////// Separater at the center
    var separater = ex.createHeader(0, canvasHeight/2, sep,
                                    {size:"small", textAlign:"left"})


    //return a list of integer of length listLength, values from 0 to 9
    function generateList() {
        var arr = [];
        for (i = 0; i < state.listLength; i++) {
            n = Math.round(Math.random() * 10);
            while(arr.indexOf(n) != -1) {
            //Makes sure no item is repeated in array
                n = Math.round(Math.random() * 10);
            }
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
    powersetMain(generateList())
    console.log(state.recursiveCalls)

    //perform appropriate action after prevButton is clicked
    function prevStep() { //don't think this is implemented correctly
        if (state.recursiveDepth <= 0){
            //Do nothing at depth 0
            return;
        }else{
            if (!state.isReturning){
                state.recursiveDepth--;
                var thisCall = state.recursiveCalls[state.recursiveDepth];
                if (state.recursiveDepth <= state.listLength){
                    thisCall.h1.remove();
                    thisCall.h2.remove();
                    thisCall.h3.remove();
                }else{
                    thisCall.h1.remove();
                }
            }else{
                //if next step is to merge
                if (state.isMerging) {
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
            thisCall.h4.hide();
            thisCall.h5.hide();
            var s1 = xToString(thisCall.result);
        }

        var xOrigin = sideMargin + blockWidth * state.recursiveDepth + 30;
        var yOrigin = topMargin + state.recursiveDepth * 1.5 * lineHeight;

        //display the return value
        var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                    {size:fontSize, textAlign:"left", transition:"fade"});

        //Doesn't set the block width to the final resulting list
        if (state.recursiveDepth != 0) h1.width(blockWidth);
        else h1.width(canvasWidth);
        thisCall.h1 = h1;

        //We used .hide() to get the fade transition, but this removes it
        // to avoid any unforseen complications
        if (state.recursiveDepth != state.listLength) {
            thisCall.h2.remove();
            thisCall.h3.remove();
            thisCall.h4.remove();
            thisCall.h5.remove();
        }

    }

    //display the result after merge(or not) the first element with the returned value
    function drawMerge() {

        //remove header of the callee
        state.recursiveCalls[state.recursiveDepth+1].h1.hide();

        var listText = state.recursiveCalls[state.recursiveDepth+1].h1.text();
        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth + 1) + 10;
        var depth = state.recursiveDepth;
        // I think I have solved the height problem for merge.
        // Just for future reference I kept the original code in comments
        var yOrigin1 = topMargin + (state.recursiveDepth * 1.5+1) * lineHeight
        //topMargin + (depth + 1) * (0.5*depth)*lineHeight + 34;
        var yOrigin2 = topMargin + (state.recursiveDepth * 1.5+2) * lineHeight
        //topMargin + (depth + 1) * (0.5*depth)*lineHeight + 66;
        // if (depth%2 == 1) { //hacky fix for the height of the appended lists
        //     yOrigin1 += 15;
        //     yOrigin2 += 15;
        // }
        var h1 = ex.createHeader(xOrigin, yOrigin1, listText,
                    {size:fontSize, textAlign:"left", transition:"fade"});
        var h2 = ex.createHeader(xOrigin, yOrigin2, listText,
                    {size:fontSize, textAlign:"left", transition:"fade"});

        var thisCall = state.recursiveCalls[state.recursiveDepth];
        thisCall.h4 = h1;
        thisCall.h5 = h2;


    }

    var firstQuiz = true;
    // Goes to the next step in quiz mode (regardless of whether the next
    // step is an actual question or not)
    function nextQuestion() {

        //Remove previous question
        if (firstQuiz) firstQuiz = false;
            else{
                //Remove question
                questionObjects.question.remove();
                //Remove ansers
                for (var i = 0; i < questionObjects.options.length; i++) {
                    questionObjects.options[i].remove();
                }
            }
        console.log(state.recursiveDepth);
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

            //// Starts question 1
            if (state.recursiveDepth == 0) {
                ex.data.state.questionNum = 1;
                nextQButton.disable();
                submitQButton.disable();
                drawQuestion();
            }
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

    var nextQButton;
    var submitQButton;
    var questionObjects = {};

    // Checks if the submitted answer to a question in quiz mode is correct
    function submitQuestion() {
        submitQButton.disable();
        if (state.questionNum == 1) {
            if (ex.data.question1.answer == ex.data.question1.selected) {
                ex.showFeedback("Correct!");
            }
            else ex.showFeedback("Incorrect");
        }

        nextQButton.enable();
    }


    // Removes the visualization elements
    // Adds the necessary quiz elements
    function startQuiz() {
        var thisCall = state.recursiveCalls[0];
        thisCall.h1.remove();
        prevButton.remove();
        skipButton.remove();
        nextButton.remove();
        quizButton.remove();

        // resetting values
        state.recursiveCalls = [];
        state.recursiveDepth = 0;
        state.isReturning = false;
        state.isMerging = false;
        state.isQuizing = true;

        // powersetMain(generateList());
        powersetMain([6,2,8]); // hardcoded temporarily
        nextQButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                      "Next").on("click", nextQuestion);
        submitQButton = ex.createButton(canvasWidth*(9/11), canvasHeight*(9/10),
                                        "Submit").on("click", submitQuestion);
        submitQButton.disable();
    }


    
    function drawQ1() {
        var answerOptions = [];
        function clickOnAnswer(n) {
            return function() {
                for (i = 0; i < numberOfAnswers; i++) {
                    answerOptions[i].style({fontStyle: "normal"});
                }
                answerOptions[n].style({fontStyle: "italic"});
                ex.data.question1.selected = n;
                submitQButton.enable();
            }
        }
        var xOrigin = canvasWidth/2;
        var yOrigin = canvasHeight/2+lineHeight;
        var question = ex.createParagraph(xOrigin, yOrigin,
                            ex.data.question1.question, {size: "large"});

        var numberOfAnswers = 4;
        for (i = 0; i < numberOfAnswers; i++) {
            option = ex.createParagraph(xOrigin, yOrigin+lineHeight*(i+1),
                    ex.data.question1.options[i], {size: "large"});
            option.on("click", clickOnAnswer(i));
            answerOptions.push(option);
        }
        questionObjects.question = question;
        questionObjects.options = answerOptions;
    }


};
