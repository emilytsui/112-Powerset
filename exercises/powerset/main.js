/**
 * @file Powerset
 * @author Group 5 - Max, Emily, Andy
 */
var main = function(ex) {
	ex.data.meta = {
        "author": "",
        "email": "",
        "title": "Powerset",
        "description": "Learn the powerset through recursion",
        "id": "answerid-stl",
        "language": "python",
        "difficulty": "medium",
        "mainFile": "main.js",
        "instrFile": "instr.html",
        "constructorName": "main",
        "menuDisplayName": "Powerset",
        "requires": {
        }
    }
    ex.data.code = {
        "lang": "python",
        "size": "small",
        "display": "def powerset(a):\n# returns a list of all subsets of the list a\n    if (len(a) == 0):\n        return [[]]\n    else:\n        allSubsets = [ ]\n        for subset in powerset(a[1:]):\n            allSubsets += [subset]\n            allSubsets += [[a[0]] + subset]\n        return allSubsets"
    }
    ex.data.state = {
        "recursiveDepth": 0,
        "listLength": 3,
        "recursiveCalls": [],
        "prevFns": [],
        "isReturning": false,
        "isSubstituting": false,
        "isMerging": false,
        "isAdding1": false,
        "isAdding2": false,
        "isQuizzing": false,
        "questionNum": 0,
        "rectLeft": 0,
        "rectTop": 0,
        "rectWidth": 0,
        "rectHeight": 0,
        "visualList": []
    }
    ex.data.questionCode = {
        "lang": "python",
        "size": "small",
        "display": "def powerset(a):\n# returns a list of all subsets of the list a\n    if (len(a) == 0):\n        return [[]]\n    else:\n        allSubsets = [ ]\n        for subset in powerset(a[1:]):\n            allSubsets += [subset]\n            allSubsets += [[a[0]] + subset]\n        return allSubsets"
    }
    ex.data.question = []
    for (i = 0; i < 10; i++)
        ex.data.question.push({})
    ex.data.question[1] = {
        "question": "",
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[2] = {
        "question": "What will the next recursive call be?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[3] = {
        "question": "What will the list at this location be?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[4] = {
        "question": "What will the next recursive call be?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[5] = {
        "question": "What will be the result of this last recursive call?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[6] = {
        "question": "",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false
    }
    ex.data.question[7] = {
        "question": "What is the line of the code primarily associated with the action pointed by the arrow?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false,
        "started": false
    }
    ex.data.question[8] = {
        "question": "What is the result list from performing the action pointed by the arrow?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false,
        "started": false
    }
    ex.data.question[9] = {
        "question": "What is the resulting list from initial call?",
        "options": [],
        "answer": -1,
        "selected": -1,
        "complete": false,
        "finalCorrect": false,
        "started": false
    }


    ex.data.meta.mode = "practice";
    // ex.data.meta.mode = "quiz-immediate";
    // ex.data.meta.mode = "quiz-delay";

    var mode = ex.data.meta.mode;

    // console.log(mode);

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
    ex.graphics.ctx.fillStyle = 'grey';

    //////////////layout configuration
    var canvasWidth = ex.width();
    var canvasHeight = ex.height();
    var topMargin = canvasHeight / 25;
    var sideMargin = canvasWidth / 25;
    var lineHeight = canvasHeight / 18;
    var blockWidth = (canvasWidth - sideMargin * 2) / (state.listLength + 1);
    //+1 because recursive calls are one more than length of the input
    var fontSize = "small"



    ///////////////button configuration
    ex.chromeElements.undoButton.disable();
    ex.chromeElements.redoButton.disable();
    ex.chromeElements.newButton.on("click", newPressed);
    ex.chromeElements.resetButton.on("click", resetPressed);
    ex.chromeElements.submitButton.disable();

    //keybinding removal is not working
    function disableNext(){
        if (nextButton!=undefined) 
            nextButton.disable();
        //The .off("keydown") and .off("keypress") seems to have bug
        //bind to null instead
        // console.log(nextButton.style())
    }
    function enableNext(){
        if (nextButton!=undefined) nextButton.enable();
    }

    var nextButton;
    var prevButton;
    var skipButton;
    var quizButton;
    var codeWell1;
    var sep;

    /////// Animation Configuration
    var animationDuration = 100;
    var defaultAnimationDuration = 100;

    var resetMode;
    //this function reset parameters and remove headers
    //this code is used in multiple function
    function clearUp(){

        /////// Animation Configuration
        var animationDuration = 300;
        var defaultAnimationDuration = 300;

        state.recursiveDepth = 0;
        state.isReturning = false;
        state.isSubstituting = false;
        state.isMerging = false;
        state.isAdding1 = false;
        state.isAdding2 = false;
        state.reverseFn = [];

        //Remove every header in the teaching part
        for (var i = 0; i < state.listLength+1; i++) {
            var thisCall = state.recursiveCalls[i];
            try{
                thisCall.h1.remove();
            }
            catch(err){}
            try{
                thisCall.h2.remove();
            }
            catch(err){}
            try{
                thisCall.h3.remove();
            }
            catch(err){}
            try{
                thisCall.h4.remove();
            }
            catch(err){}
            try{
                thisCall.h5.remove();
            }
            catch(err){}
            try{
                thisCall.h6.remove();
            }
            catch(err){}
        }

        if (state.isQuizzing) {
            state.isQuizzing = false;
            state.questionNum = 0;
            for (var key in questionObjects) {
                questionObjects[key].remove();
                delete questionObjects[key];
            }
            resetQuestions();
            codeWell1.hide();
            nextQButton.hide();
            resetMode = true;
            init();
        }
    }
    function newPressed(){
        newHelper();
        newHelper();
        // hacky fix for state not resetting unless you press new twice
    }
    function newHelper() {
        ex.saveState({});
        clearUp();
        init();
    }
    function resetPressed(){
        skipButton.enable();
        nextButton.enable();
        prevButton.enable();
        clearUp();
        nextStep();
    }

    function resetQuestions () {
        questions = [ex.data.question[1], ex.data.question[2], ex.data.question[3],
                     ex.data.question[4], ex.data.question[5], ex.data.question[6],
                     ex.data.question[7], ex.data.question[8], ex.data.question[9]];
        for (var i = 0; i < questions.length; i++) {
            questions[i].options = [];
            questions[i].answer = -1;
            questions[i].selected = -1;
            questions[i].finalCorrect = false;
        }
        questions[1].question = ""; //bc question 1 is dynamically generated
        questions[6].question = ""; //bc question 6 is also dynamically generated
    }

    function clearCanvas(){
        console.log("clearCanvas")
        ex.graphics.ctx.clearRect(0,0,canvasWidth,canvasHeight);
    }

    function drawArrow(arrowX, arrowY) {
        console.log("drawArrow")
        console.log(arrowX);
        ex.graphics.ctx.moveTo(arrowX, arrowY);

        var sizeOfArrow = 50;
        ex.graphics.ctx.beginPath();
        ex.graphics.ctx.lineWidth=5;
        ex.graphics.ctx.strokeStyle = '#0000ff';
        ex.graphics.ctx.moveTo(arrowX+sizeOfArrow/2, arrowY);
        ex.graphics.ctx.lineTo(arrowX+sizeOfArrow, arrowY+sizeOfArrow/2);
        ex.graphics.ctx.stroke();

        ex.graphics.ctx.moveTo(arrowX, arrowY+sizeOfArrow/2);
        ex.graphics.ctx.lineTo(arrowX+sizeOfArrow, arrowY+sizeOfArrow/2);
        ex.graphics.ctx.stroke();

        ex.graphics.ctx.moveTo(arrowX+sizeOfArrow/2, arrowY+sizeOfArrow);
        ex.graphics.ctx.lineTo(arrowX+sizeOfArrow, arrowY+sizeOfArrow/2);
        ex.graphics.ctx.stroke();
    }


    //return a list of integer of length listLength, values from 0 to 9
    function generateList() {
        var arr = [];
        var isChar = Math.random()<.5;
        for (i = 0; i < state.listLength; i++) {
            n = Math.floor(Math.random() * 10);
            var e;
            if (isChar) e = String.fromCharCode(65+n);
            else e = Math.floor(Math.random() * 10);
            while(arr.indexOf(e) != -1) {
            //Makes sure no item is repeated in array
                n = Math.floor(Math.random() * 10);
                if (isChar) e = String.fromCharCode(65+n);
                else e = n;
            }
            arr.push(e);
        }
        return(arr);
    }

    function powerset(a) {
        if (a.length == 0) {
            return [[]];
        }
        else {
            var allSubsets = [];
            var recur = powerset(a.slice(1,a.length))
            for (var i = 0; i < recur.length; i++) {
                allSubsets.push(recur[i]);
                allSubsets.push([a[0]].concat(recur[i]));
            }
        }
        return allSubsets;
    }


    //if x is of type number, string or list, xToString convert x to string
    function xToString(x) {
        if (typeof(x) == "object") {
            // x is a list
            var str = "[";
            for (var i = 0; i < x.length; i++) {
                str += xToString(x[i]);
                if (i != x.length-1) {
                    str += ",";
                }
            }
            str += "]";
            return str;
        }
        else if (x == "_")
            return "___";
        else if (typeof(x) == "number")
            return x.toString();
        else if (typeof(x) == "string")
            return "\""+x+"\"";
    }
    //Test
    // // console.log(xToString(["_"]))

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

    function animateMoveElement(ele, x1, y1, fn) {
        function recurseMove(d0) {
            // // console.log(ele.box())
            ele.show();
            if (d0 >= d) {
                fn();
                return;
            }
            ele.position(Math.round(x0+xd*d0), Math.round(y0+yd*d0));
            setTimeout(function(){
                recurseMove(d0+1);
            }, timeInterval);
        }

        var x0 = ele.box().x;
        var y0 = ele.box().y;
        var d = Math.max(Math.abs(x1-x0), Math.abs(y1-y0))/2;
        var timeInterval = Math.round(animationDuration / d);
        var xd = (x1-x0)/d;
        var yd = (y1-y0)/d;
        // // console.log(x0, y0, x1, y1, xd, yd, d)
        recurseMove(0);
    }

    var serverState = ex.data.instance.state;
    if (serverState != null) {
        if (serverState.exdata.state.isQuizzing) {
            //quizing
            console.log(serverState);
            ex.data = serverState.exdata;
            state = ex.data.state;
            quizState = serverState;
            questionObjects = serverState.questionObjects;
            revertQuiz();
        } else {
            //not quizing

        }
    } else {init()}

    // init()

    function init(){
        state.visualList = generateList();

        //generate recursiveCall data
        nextButton = ex.createButton(canvasWidth*(9/11), canvasHeight*(9/10),
                                        "Next", {color: "blue"}).on("click", nextStep)

        prevButton = ex.createButton(canvasWidth*(9/11)-60, canvasHeight*(9/10),
                                         "Prev", {color: "blue"}).on("click", prevStep)
        skipButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                         "Skip", {color: "orange"}).on("click", skipStep)
        quizButton = ex.createButton(canvasWidth*(8/9)-10, 10,
                                         "Start Quiz", {color: "blue"}).on("click", startQuiz)



        ///////// Code well containing powerset algorithm code
        codeWell1 = ex.createCode(10, canvasHeight-180,
                                      ex.data.code.display, ex.data.code);
        codeWell1.show();
        sep = Array(Math.round(canvasWidth/6)).join("*")
        //////// Separater at the center
        // var separater = ex.createHeader(0, canvasHeight*(10/16), sep,
        //                                 {size:"small", textAlign:"left"})

        powersetMain(state.visualList);
        if (resetMode) {
            resetMode = false;
            return;
        }
        ex.chromeElements.instrButton.trigger("click");
        nextStep(); //To show the initial call of function
    }

    //perform appropriate action after prevButton is clicked
    function prevStep() {
        if (state.prevFns.length == 0) return;
        var thisFn = state.prevFns.pop();
        thisFn();
    }

    function reverseFn(fn){
        var thisFn = state.prevFns.pop();
        var fnArguments = Array.prototype.shift.apply(arguments);
        state.prevFns.push(function(){
            thisFn();
            fn.apply(this, fnArguments);
        })
    }

    //perform appropriate action after nextButton is clicked
    function nextStep() {
        // console.log("next step")
        // console.log(state.recursiveDepth)
        if (state.recursiveDepth == -1) return;

        //for quizzing
        if (state.isQuizzing) {
            state.isAdding1 = false;
            state.isAdding2 = false;
        }

        state.prevFns.push(function(){})
        if (state.recursiveDepth == state.listLength + 1) {
            ////
            reverseFn(function(state_isReturning){
                state.recursiveDepth++;
                state.isReturning = !state.isReturning;
            })
            ////
            //start to return
            state.isReturning = true;
            state.recursiveDepth--;
        }


        if (!state.isReturning) {
            ////
            reverseFn(function(){
                state.recursiveDepth--;
            })
            ////
            //recursive call
            drawCall();
            state.recursiveDepth++;
        } else {
            //if next step is to merge
            if (state.isSubstituting) {
                ////
                reverseFn(function(){
                    state.isAdding1 = !state.isAdding1;
                    state.isSubstituting = !state.isSubstituting;
                })
                ////
                drawSubstitute();
                state.isSubstituting = false;
                state.isAdding1 = true;
            } else if (state.isAdding1){
                ////
                reverseFn(function(){
                    state.isAdding1 = !state.isAdding1;
                    state.isAdding2 = !state.isAdding2;
                })
                ////
                drawAdd1();
                state.isAdding1 = false;
                state.isAdding2 = true;
            } else if (state.isAdding2) {
                ////
                reverseFn(function(){
                    state.isAdding2 = !state.isAdding2;
                    state.isMerging = !state.isMerging;
                })
                ////
                drawAdd2();
                state.isAdding2 = false;
                state.isMerging = true;
            }
            else if (state.isMerging) {
                ////
                reverseFn(function(){
                    state.isMerging = !state.isMerging;
                })
                ////
                drawMerge();
                state.isMerging = false;
            }
             else
            {
            //Normal return
                drawReturn();
                if (state.recursiveDepth != 0) {
                    ////
                    reverseFn(function(){
                        state.isSubstituting = !state.isSubstituting;
                    })
                    ////
                    state.isSubstituting = true;
                }
                ////
                reverseFn(function(){
                    state.recursiveDepth++;
                })
                ////
                state.recursiveDepth--;
            }
        }
    }

    //perform appropriate action after skipButton is clicked
    function skipStep() {
        clearUp();
        //generate input and result header
        for (var i = 0; i < state.listLength+1; i++){

            var xOrigin = sideMargin + blockWidth * i;
            var yOrigin = topMargin + i * 3 * lineHeight;
            var thisCall = state.recursiveCalls[i];
            var s1 = "powerset("+xToString(thisCall.input)+")"
            var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                        {size:fontSize, textAlign:"right",
                         transition:"fade"});
            state.recursiveCalls[i].h1 = h1;

            var s2 = xToString(thisCall.result);
            var h2 = ex.createHeader(xOrigin, yOrigin + lineHeight, s2,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
            state.recursiveCalls[i].h2 = h2;
            h2.width(blockWidth);
            h1.width(blockWidth);
        }

        skipButton.disable();
        nextButton.disable();
        prevButton.disable();
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
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        //Base Case
        if (state.recursiveDepth == state.listLength) {
            ////
            var depth = state.recursiveDepth;
            reverseFn(function(){
                var thisCall = state.recursiveCalls[depth];
                thisCall.h1.remove();
                thisCall.h2.remove();
            })
            ////
            var s1 = "powerset("+xToString(input)+")"
            var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                        {size:fontSize, textAlign:"right",
                         transition:"fade"});
            var s2 = xToString([[]])
            var h2 = ex.createHeader(xOrigin, yOrigin + lineHeight, s2,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
            var s3 = "We are now in the base case.\
             The funtion returns a value instead of calling itself."
            if (!state.isQuizzing){
                        var h3 =  ex.alert(s3,{color: "green", transition: "alert-long"});
                        h3.position(canvasWidth*(1/4), canvasHeight/2)}
            h2.width(blockWidth);
            h1.width(blockWidth);
            thisCall.h1 = h1;
            thisCall.h2 = h2;
            return;
        }
        ////
        reverseFn(function(){
            var depth = state.recursiveDepth;
            var thisCall = state.recursiveCalls[depth];
            thisCall.h1.remove();
            thisCall.h2.remove();
            thisCall.h3.remove();
        })

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

        var s4 = "We are now in the recursive case.\
         The function recursively calls itself. with a new set of arguments.";
        if (!state.isQuizzing) {
            var h4 =  ex.alert(s4,{color: "green", transition: "alert-long"});
            h4.position(canvasWidth*(1/4), canvasHeight/2)
        }
    }

    //remove headers that representing function call
    //display the return value
    function drawReturn() {

        ////
        reverseFn(function(){
            thisCall.h6.remove();
        })
        ////
        disableNext()
        // console.log("drawReturn depth: " + state.recursiveDepth)
        var thisCall = state.recursiveCalls[state.recursiveDepth];

        var s1 = xToString(thisCall.result);


        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        // var yOrigin = topMargin + state.recursiveDepth * 2.0 * lineHeight;
        var yOrigin = topMargin + (state.recursiveDepth * 3 - 1.5) * lineHeight;

        if (state.recursiveDepth == 0) { // Correctly formats return value
            xOrigin += canvasWidth*(1/4);
            yOrigin += lineHeight * 1.5;
            s1 = " = " + s1;
        }

        //Animated Move, +150 because alignment
        var x0 = thisCall.h2.box().x+150
        var y0 = thisCall.h2.box().y
        //display the return value
        var h6 = ex.createHeader(x0, y0, s1,
                    {size:fontSize, textAlign:"left", transition:"fade"});
        if (!state.isQuizzing)
            animateMoveElement(h6, xOrigin, yOrigin, function() {
            // console.log("enabled***");
             enableNext()})
        else {
            h6.position(xOrigin, yOrigin);
            enableNext();
        }

        //Doesn't set the block width to the final resulting list
        if (state.recursiveDepth != 0) h6.width(blockWidth);
        else h6.width(canvasWidth);
        thisCall.h6 = h6; //So we can remove the element later on

        var s7 = "The function returns with value" + s1;
        if (!state.isQuizzing){
            var h7 =  ex.alert(s7,{color: "green", transition: "alert-long"});
            h7.position(canvasWidth*(1/4), canvasHeight/2)
        }

        //Solve the layer conflict; draw the button after the header is created

    }

    //display the result after merge(or not) the first element with the returned value
    function drawSubstitute() {
        ////
        reverseFn(function(){

            thisCall.h4.remove();
            thisCall.h5.remove();

            state.recursiveCalls[depth+1].h6.show();
        })
        ////

        //remove header of the callee

        state.recursiveCalls[state.recursiveDepth+1].h6.hide();

        var listText = state.recursiveCalls[state.recursiveDepth+1].h6.text();
        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth + 1) + 10;
        var depth = state.recursiveDepth;
        // I think I have solved the height problem for merge.
        // Just for future reference I kept the original code in comments
        var yOrigin1 = topMargin + (state.recursiveDepth * 3 + 1) * lineHeight
        //topMargin + (depth + 1) * (0.5*depth)*lineHeight + 34;
        var yOrigin2 = topMargin + (state.recursiveDepth * 3 + 2) * lineHeight
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

    function drawAdd1(){
        var thisCall = state.recursiveCalls[state.recursiveDepth];
        ////
        var h2Text = thisCall.h2.text();
        reverseFn(function(){
            thisCall.h2.text(h2Text);
            thisCall.h4.show();
        })
        ////
        disableNext();
        //attempts to prevent timing issues when pressing next too fast
        // console.log("drawAdd1 depth: " + state.recursiveDepth)

        var thisCall = state.recursiveCalls[state.recursiveDepth];
        var s= "This step corresponds to \n allSubsets += [subset]";
        if (!state.isQuizzing){
            var al = ex.alert(s,{color: "green", transition: "alert-long"});
            al.position(canvasWidth*(1/4), canvasHeight/2)
        }


        function reviseH2() {
            // console.log("revising in drawAdd1");
            //Revise this calls' join headers h2
            var returningList = state.recursiveCalls[state.recursiveDepth+1].result;
            var firstElement = thisCall.input[0];
            thisCall.h2.text(xToString(returningList));
            thisCall.h2.show();
            enableNext();
        }
        //remove this call's join headers h2 h4
        thisCall.h4.hide();
        thisCall.h2.hide();
        setTimeout(reviseH2, 500);

    }


    function drawAdd2(){
        var thisCall = state.recursiveCalls[state.recursiveDepth];

        ////
        var h5Text = thisCall.h5.text();
        var h3Text = thisCall.h3.text();
        var h5x = thisCall.h5.box().x;
        var h5y = thisCall.h5.box().y;
        reverseFn(function(){
            thisCall.h5.position(h5x, h5y);
            thisCall.h5.text(h5Text);
            thisCall.h3.text(h3Text);
            thisCall.h5.show();
        })
        ////
        disableNext();
        // console.log("drawAdd2 depth: " + state.recursiveDepth);
        function addE(e, l) {
            var l0 = [];
            for (i = 0; i < l.length; i++) {
                l0.push([e].concat(l[i]))
            }
            return l0;
        }

        function integrateH3(){
            for (var i = 0; i < fliers.length; i++)
                fliers[i].remove();
            thisCall.h5.hide();
            thisCall.h3.text(xToString(addE(firstElement, returningList)));
            thisCall.h3.show();
        }

        //calculate number of characters before ith element in l
        //formula in this function are empirical result
        //and are subject to changes
        //I've tried hundreds of times, this is the best I can get.
        function xd(l, index) {
            var k = 0;
            for (var j = 0; j < index; j++)

                k += xToString(l[j]).length-4.1;
            if (index == 0) k--;
            return k+2.2+index*2;
        }
        var returningList = state.recursiveCalls[state.recursiveDepth+1].result;
        var firstElement = thisCall.input[0];
        //fontwidth is subject to changes
        var fontWidth = 10;
        var fliers = [];
        var initX = thisCall.h5.box().x - fontWidth*3;
        var initY = thisCall.h3.box().y;

        thisCall.h5.hide();
        thisCall.h5.text(xToString(addE("_", returningList)));
        thisCall.h5.show();
        var s= "This step corresponds to \n allSubsets += [[a[0]] + subset]";
        if (!state.isQuizzing){
            var al = ex.alert(s,{color: "green", transition: "alert-long"});
            al.position(canvasWidth*(1/4), canvasHeight/2)
        }
        //make animatio slower for this part
        animationDuration = 100;

        function fly() {
            // console.log("fly")
            thisCall.h3.hide();
            //the element of the list that flies into the empty space

            for (var i = 0; i < returningList.length; i++) {
                var flier = ex.createHeader(initX, initY, xToString(firstElement), {size: fontSize});
                var destX = thisCall.h5.box().x;
                destX = destX + xd(addE("_", returningList), i)*fontWidth;
                animateMoveElement(flier, destX, initY, function(){});
                fliers.push(flier);
            }
            setTimeout(moveBack, 700)
        }
        setTimeout(fly, 200);

        function moveBack() {
            //move h5 back to the place of h3; remove h5 and fliers, show H3.
            // console.log("moving")
            var xMoveBack = xToString(addE(1,thisCall.input)).length*fontWidth-45;
            animateMoveElement(thisCall.h5, thisCall.h5.box().x - xMoveBack, initY, function(){
                integrateH3();
                enableNext();
                animationDuration = defaultAnimationDuration;
            });
            for (var i = 0; i < fliers.length; i++) {
                animateMoveElement(fliers[i], fliers[i].box().x - xMoveBack, initY, function(){});
            }
        }

    }

    function drawMerge(){
        var thisCall = state.recursiveCalls[state.recursiveDepth];

        ////
        var h2Text = thisCall.h2.text();
        reverseFn(function(){
            thisCall.h2.text(h2Text);
            thisCall.h2.show();
            thisCall.h3.show();
        })
        ////
        // console.log("merging");

        function showMergeResult() {
            var resultList = thisCall.result;
            thisCall.h2.text(xToString(resultList));
            thisCall.h2.show();
        }
        thisCall.h2.hide();
        thisCall.h3.hide();
        setTimeout(showMergeResult, 500);
    }






    // Goes to the next step in quiz mode (regardless of whether the next
    // step is an actual question or not)
    function nextQuestion() {
        console.log("quizNumber:, questionNum: ")
        console.log(quizNumber)
        console.log(state.questionNum)

        ex.chromeElements.submitButton.enable()

        if (state.questionNum == 1 && ex.data.question[1].complete == false) {
            if (questionObjects.input.element.text() == "") {
                ex.alert("Please type your answer in the input box.",
                    {transition: "alert-long"});
                return; // So they are forced to input an answer
            }
            questionObjects.input.element.disable();
            ex.data.question[1].complete = true;
            if (ex.data.question[1].answer == questionObjects.input.element.text().trim()) {
                ex.data.question[1].finalCorrect = true;
                updateState(1);
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[1].finalCorrect = false;
                updateState(1);
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect. The correct answer is " +
                    ex.data.question[1].answer,
                    {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 2 && ex.data.question[2].complete == false) {
            questionObjects.dropdown.element.disable();
            ex.data.question[2].complete = true;
            if (ex.data.question[2].answer == ex.data.question[2].selected) {
                ex.data.question[2].finalCorrect = true;
                updateState(2)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[2].finalCorrect = false;
                updateState(2)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 3 && ex.data.question[3].complete == false) {
            questionObjects.dropdown.element.disable();
            ex.data.question[3].complete = true;
            if (ex.data.question[3].answer == ex.data.question[3].selected) {
                ex.data.question[3].finalCorrect = true;
                updateState(3)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[3].finalCorrect = false;
                updateState(3)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 4 && ex.data.question[4].complete == false) {

            questionObjects.dropdown.element.disable();
            ex.data.question[4].complete = true;
            if (ex.data.question[4].answer == ex.data.question[4].selected) {
                ex.data.question[4].finalCorrect = true;
                updateState(4)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[4].finalCorrect = false;
                updateState(4)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 5 && ex.data.question[5].complete == false) {

            questionObjects.dropdown.element.disable();
            ex.data.question[5].complete = true;
            if (ex.data.question[5].answer == ex.data.question[5].selected) {
                ex.data.question[5].finalCorrect = true;
                updateState(5)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[5].finalCorrect = false;
                updateState(5)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 6 && ex.data.question[6].complete == false) {
            if (questionObjects.input.element.text() == "") {
                ex.alert("Please type your answer in the input box.",
                    {transition: "alert-long"});
                return; // So they are forced to input an answer
            }
            questionObjects.input.element.disable();
            ex.data.question[6].complete = true;
            if (ex.data.question[6].answer == questionObjects.input.element.text().trim()) {
                ex.data.question[6].finalCorrect = true;
                updateState(6)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[6].finalCorrect = false;
                updateState(6)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect. The correct answer is " +
                    ex.data.question[6].answer,
                    {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 7 && ex.data.question[7].complete == false) {

            questionObjects.dropdown.element.disable();
            ex.data.question[7].complete = true;
            if (ex.data.question[7].answer == ex.data.question[7].selected) {
                ex.data.question[7].finalCorrect = true;
                updateState(7)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[7].finalCorrect = false;
                updateState(7)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 8 && ex.data.question[8].complete == false) {

            questionObjects.dropdown.element.disable();
            ex.data.question[8].complete = true;
            if (ex.data.question[8].answer == ex.data.question[8].selected) {
                ex.data.question[8].finalCorrect = true;
                updateState(8)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[8].finalCorrect = false;
                updateState(8)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 9 && ex.data.question[9].complete == false) {

            questionObjects.dropdown.element.disable();
            ex.data.question[9].complete = true;
            if (quizNumber < 9) nextQButton.disable();
            state.recursiveDepth++;
            drawReturn();
            state.recursiveDepth--;
            if (ex.data.question[9].answer == ex.data.question[9].selected) {
                ex.data.question[9].finalCorrect = true;
                updateState(9)
                if (mode == "quiz-delay") return;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question[9].finalCorrect = false;
                updateState(9)
                if (mode == "quiz-delay") return;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            clearQuestionObjects();
            return; // so they can reflect on answer before moving on to next step
        }


        // console.log(state.recursiveDepth);
        if (state.recursiveDepth == state.listLength + 1) {
            //start to return
            state.isReturning = true;
            state.recursiveDepth--;
        }

        if (state.recursiveDepth == -1) {
            //finish
            return;
        }

        if (!state.isReturning) {
            //recursive call
            drawCall();
            state.recursiveDepth++;
        } else {
            //if next step is to merge
            if (state.isSubstituting) {
                drawSubstitute();
                state.isSubstituting = false;
            } else {
            //Normal return
                if (state.questionNum <=8 && ex.data.question[8].complete == false)
                {
                    drawReturn();
                } else if (quizNumber >= 8){
                    drawReturn();
                }
                if (state.recursiveDepth != 0) state.isSubstituting = true;
                state.recursiveDepth--;

            }
        }

        // Moves on to the next question
        if (state.questionNum == 1 && ex.data.question[1].complete == true){
            drawQ2();
            updateState();
            console.log(state.recursiveDepth)
        }
        else if (state.questionNum == 2 && ex.data.question[2].complete == true){
            drawQ3();
            updateState();
            console.log(state.recursiveDepth)
        }
        else if (state.questionNum == 3 && ex.data.question[3].complete == true) {
            console.log(state.recursiveDepth)
            if (state.recursiveCalls[state.recursiveDepth-2].h3 !== undefined)
                state.recursiveCalls[state.recursiveDepth-2].h3.show();
            drawQ4();
            updateState();
        }
        else if (state.questionNum == 4 && ex.data.question[4].complete == true) {
            q5Header = state.recursiveCalls[state.recursiveDepth-1].h2;
            if (q5Header !== undefined) q5Header.hide();
            drawQ5();
            updateState();
        }
        else if (state.questionNum == 5 && ex.data.question[5].complete == true) {
            //q5Header.show();
            if (q6OneStep){
                nextQuestion();
                q6OneStep = false;
            }
            drawQ6();
            updateState();
        }
        else if (state.questionNum == 6 && ex.data.question[6].complete == true) {
            if (ex.data.question[7].started == false){
                ex.data.question[7].started = true;
                nextQButton.disable();
                nextQuestion()
                // Fake next click for just once, set the timer to ensure
                // that the previous timer event finishes
            }else{
                nextQButton.enable();
                drawQ7();
                updateState();
            }
        }
        else if (state.questionNum == 7 && ex.data.question[7].complete == true) {
            if (ex.data.question[8].started == false){
                ex.data.question[8].started = true;
                nextQButton.disable();
                clearCanvas();
                nextQuestion()
                // Fake next click for just once, set the timer to ensure
                // that the previous timer event finishes
            }else{
                nextQButton.enable();
                drawQ8();
                updateState();
            }
        }
        else if (state.questionNum == 8 && ex.data.question[8].complete == true) {
            clearCanvas();
            drawQ9();
            updateState();
        }

    }

    var nextQButton;
    var quizList;
    var q5Header;
    var correctStep = false;
    






    function updateState(i, l){

        console.log("update: i = "+xToString(i))
        
        quizState.quizList = quizList;
        if (i > quizState.quizNumber)
            quizState.quizNumber = i;

        if (i >= 1 && i <= 9 && ex.data.question[i].finalCorrect)
            quizState.quizScore ++;
        scoreBoard.text("Score: "+quizState.quizScore);
        if (i == 9) ex.setGrade(quizState.quizScore/9.0, "");
        quizState.exdata = ex.data;
        quizState.questionObjects = questionObjects;


        quizState.depth = state.recursiveDepth

        console.log("depth: "+state.recursiveDepth)
        console.log("state.questionNum: "+state.questionNum)

        ex.saveState(quizState);
        // console.log(quizState.quizScore);
    }

    function addQuestionObjects(element, name, type, content) {
        questionObjects[name] = {"element": element,
                                  "name":name,
                                  "position":element.position(),
                                  "type":type,
                                  "text":element.text(),
                                  "content":content
                                }
    }

    function clearQuestionObjects(){
        for (var property in questionObjects) {
            if (questionObjects.hasOwnProperty(property)){
                console.log(questionObjects[property].element)
                questionObjects[property].element.remove();
                delete questionObjects[property];
            }
        } 
    }


    function revertQuiz() {
        console.log("revertQuiz!")
        console.log(state.recursiveDepth)
        codeWell1 = ex.createCode(10, canvasHeight-180,
                              ex.data.code.display, ex.data.code);
        codeWell1.show();
        questionObjects={};
        quizList = quizState.quizList;
        quizScore = quizState.quizScore;
        quizNumber = quizState.quizNumber;

        scoreBoard = ex.createHeader(canvasWidth-80, 20, "Score: "+xToString(quizState.quizScore),
                                {size: "medium"})
        scoreBoard.innerWidth(40)

        for (i = 0; i <= quizNumber; i++) {
            ex.data.question[i].complete = true
        }

        nextQButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                      "Next").on("click", nextQuestion);
        ex.chromeElements.submitButton.enable()
        ex.chromeElements.submitButton.on("click", nextQuestion)
        ex.chromeElements.resetButton.disable();
        nextQButton.show();


        //random but important stuff
        state.isSubstituting = false;
        correctStep = true;

        console.log("depth: "+serverState.depth)
        var depth = serverState.depth;
        state.recursiveDepth = 0;
        if (!state.isReturning)
            while (state.recursiveDepth < depth){
                console.log(state.recursiveDepth)
                nextStep();
            }
        else {
            state.isReturning = false;
            while (state.recursiveDepth < 4) nextStep();
            state.recursiveDepth = depth+1;
            state.isReturning = true;
            //skip returning step, which has animation
            nextStep();
            nextStep();
        }


        var drawFn = [drawQ1, drawQ2, drawQ3, drawQ4, drawQ5, drawQ6, drawQ7, drawQ8, drawQ9]
        console.log("state.questionNum:"+state.questionNum)
        drawFn[state.questionNum-1]();

    }

    // Removes the visualization elements
    // Adds the necessary quiz elements
    function startQuiz() {
        // console.log(mode);
        console.log("startQuiz")
        if (mode == "quiz-immediate") {
            ex.chromeElements.resetButton.disable();
            ex.chromeElements.newButton.disable();
        }
        quizState = {
        "quizList": [],
        "quizNumber": 0, // quiz that have taken
        "quizScore": 0,
        "exdata": {},
        "questionObjects": {},
        "depth": 0
        }
        questionObjects = {};


        state.isQuizzing = true;
        quizList = generateList();
        quizScore = 0;
        ex.data.state.quizList = quizList;

        scoreBoard = ex.createHeader(canvasWidth-80, 20, "Score: "+xToString(quizState.quizScore),
                                {size: "medium"})
        scoreBoard.innerWidth(40)



        // Removing all the remaining headers on the screen
        for (var i = 0; i < state.recursiveCalls.length; i++) {
            var obj = state.recursiveCalls[i];
            if (obj.h1 !== undefined) obj.h1.remove();
            if (obj.h2 !== undefined) obj.h2.remove();
            if (obj.h3 !== undefined) obj.h3.remove();
            if (obj.h4 !== undefined) obj.h4.remove();
            if (obj.h5 !== undefined) obj.h5.remove();
            if (obj.h6 !== undefined) obj.h6.remove();
        }
        prevButton.remove();
        skipButton.remove();
        nextButton.remove();
        quizButton.remove();

        // resetting values
        state.recursiveCalls = [];
        state.recursiveDepth = 0;
        state.isReturning = false;
        state.isSubstituting = false;
        state.isQuizzing = true;




        // console.log(quizList);
        powersetMain(quizList);
        nextQButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                      "Next").on("click", nextQuestion);
        ex.chromeElements.submitButton.enable()
        ex.chromeElements.submitButton.on("click", nextQuestion)
        ex.chromeElements.resetButton.disable();
        nextQButton.show();



        drawQ1();

        quizNumber = 0;
        updateState(0, quizList)
    }

    // The function to display question 1 in quiz mode. Every drawQ# function
    // will get rid of the elements that were used in the previous question,
    // set the question number in the state, and then draw the question.
    function drawQ1() {
        // console.log("Question 1");

        state.questionNum = 1;
        ex.data.question[1].question = "How many total calls to powerset will " +
                                 "there be as a result of calling powerset(" +
                                 xToString(quizList) + "), including the first" +
                                    "call?";
        ex.data.question[1].answer = quizList.length + 1;

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[1].question, {size: "large"});

        
        addQuestionObjects(question, "question", "header", null);

        var q1Input = ex.createInputText(xQuestion,yQuestion + 100,"Answer (e.g.: 0)");

        addQuestionObjects(q1Input, "input", "inputtext", null)


        //if have done this q1, freeze the input
        if (quizState.quizNumber >= 1) q1Input.disable()
    }

    //Generates answers for question 2 of the quiz
    function genQ2Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q2
        correct = fullList.slice(1,fullList.length);
        var selections = []
        cIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            n = Math.round(Math.random() * (pset.length-1));
            if ( pset[n].length < fullList.length &&
                 xToString(pset[n]) != xToString(correct) &&
                 selections.indexOf(pset[n]) == -1) {
                selections.push(pset[n]);
            }
        }
        selections[cIndex] = correct;
        ex.data.question[2].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[2].options.push("powerset( [" + selections[i] + "] )");
        }
    }

    // Draws question 2 of quiz mode
    function drawQ2() {

        clearQuestionObjects();

        console.log("drawQ2")
        state.questionNum = 2;

        if (quizNumber < 2) nextQButton.disable();
        genQ2Answers(quizList, 4);
        // console.log(xToString(ex.data.question[2].options));
        var elements = {};
        for (var i = 0; i < ex.data.question[2].options.length; i++) {
            elements[ex.data.question[2].options[i]] = q2Select(i);
        }

        function q2Select(i) {
            return function() {
                ex.data.question[2].selected = i;
                nextQButton.enable();
            }
        }

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        // Make a dropdown
        var q2Dropdown = ex.createDropdown(xOrigin,yOrigin,"Select One", {
            elements: elements
        });

        addQuestionObjects(q2Dropdown, "dropdown", "dropdown", elements)

        //if have done
        if (quizNumber >= 2) q2Dropdown.disable()

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[2].question, {size: "large"});

        addQuestionObjects(question, "question", "header", null)        

    }

    //Generates answers for question 3 of the quiz
    function genQ3Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q3
        correct = [fullList[1]];
        var selections = []
        cIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            n = Math.round(Math.random() * (pset.length-1));
            if ( pset[n].length < fullList.length &&
                 xToString(pset[n]) != xToString(correct) &&
                 selections.indexOf(pset[n]) == -1) {
                selections.push(pset[n]);
            }
        }
        selections[cIndex] = correct;
        ex.data.question[3].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[3].options.push("[" + selections[i] + "]");
        }
    }

    // Draw Question 3 of Quiz mode
    function drawQ3 () {
        clearQuestionObjects();

        state.questionNum = 3;
        if (quizNumber < 3) nextQButton.disable();
        genQ3Answers(quizList, 4);
        // console.log(xToString(ex.data.question[3].options));
        var elements = {};
        for (var i = 0; i < ex.data.question[3].options.length; i++) {
            elements[ex.data.question[3].options[i]] = q3Select(i);
        }

        function q3Select(i) {
            return function() {
                ex.data.question[3].selected = i;
                nextQButton.enable();
            }
        }
        if (state.recursiveCalls[state.recursiveDepth-1].h3 !== undefined)
            state.recursiveCalls[state.recursiveDepth-1].h3.hide();

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        // Make a dropdown
        var q3Dropdown = ex.createDropdown(xOrigin-45 ,yOrigin-35,"Choose the answer", {
            elements: elements
        });//The current coordinate heree is hardcoded. May be bugggy.
        
        addQuestionObjects(q3Dropdown, "dropdown", "dropdown", elements)

        if (quizNumber >= 3) q3Dropdown.disable()

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[3].question, {size: "large"});

        
        addQuestionObjects(question, "question", "header", null);

    }

    //Generates answers for question 4 of the quiz
    function genQ4Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q2
        correct = fullList.slice(3,fullList.length);
        // The answer is implemented in a way such that
        // lists longer than 3 can also be used for quiz.
        var selections = []
        cIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            n = Math.round(Math.random() * (pset.length-1));
            if ( pset[n].length < fullList.length &&
                 xToString(pset[n]) != xToString(correct) &&
                 selections.indexOf(pset[n]) == -1) {
                selections.push(pset[n]);
            }
        }
        selections[cIndex] = correct;
        ex.data.question[4].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[4].options.push("powerset( [" + selections[i] + "] )");
        }
    }

   // Draw Question 4 of Quiz mode
    function drawQ4 () {
        clearQuestionObjects();

        state.questionNum = 4;
        if (quizNumber < 4) nextQButton.disable();
        genQ4Answers(quizList, 4);
        var elements = {};
        for (var i = 0; i < ex.data.question[4].options.length; i++) {
            elements[ex.data.question[4].options[i]] = q4Select(i);
        }

        function q4Select(i) {
            return function() {
                ex.data.question[4].selected = i;
                nextQButton.enable();
            }
        }

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth+.3);
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        // Make a dropdown
        var q4Dropdown = ex.createDropdown(xOrigin,yOrigin,"Choose the answer", {
            elements: elements
        });
        

        addQuestionObjects(q4Dropdown, "dropdown", "dropdown", elements)
        if (quizNumber >= 4) q4Dropdown.disable()

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[4].question, {size: "large"});

        
        addQuestionObjects(question, "question", "header", null);

    }

    //Generates answers for question 5 of the quiz
    function genQ5Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q2
        correct = [[]];
        var dummy = [];
        // The answer is implemented in a way such that
        // lists longer than 3 can also be used for quiz.
        var selections = []
        cIndex = Math.round(Math.random() * (numSelections-1));
        var dIndex = Math.round(Math.random() * (numSelections-1));
        while (dIndex == cIndex)
            dIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            n = Math.round(Math.random() * (pset.length-1));
            if ( pset[n].length < fullList.length &&
                 xToString(pset[n]) != xToString(correct) &&
                 selections.indexOf(pset[n]) == -1) {
                selections.push(pset[n]);
            }
        }
        selections[cIndex] = correct;
        selections[dIndex] = dummy;
        ex.data.question[5].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[5].options.push(selections[i]);
        }
    }

    // Draw Question 5 of Quiz mode
    function drawQ5 () {
        clearQuestionObjects();

        state.questionNum = 5;

        if (quizNumber < 5) nextQButton.disable();

        genQ5Answers(quizList, 4);
        var elements = {};
        for (var i = 0; i < ex.data.question[5].options.length; i++) {
            elements[xToString(ex.data.question[5].options[i])] = q5Select(i);
        }

        function q5Select(i) {
            return function() {
                ex.data.question[5].selected = i;
                nextQButton.enable();
            }
        }

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth-.3);
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + (state.recursiveDepth-.75) * 3 * lineHeight;
        var q5Dropdown = ex.createDropdown(xOrigin, yOrigin, "Select", {
            elements: elements
        });
        
        addQuestionObjects(q5Dropdown, "dropdown", "dropdown", elements)
        if (quizNumber >= 5) q5Dropdown.disable()

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[5].question, {size: "large"});
        
        addQuestionObjects(question, "question", "header", null);

    }

    // Draws Question 6 of the quiz
    function drawQ6() {
        console.log("drawQ6***")
        clearQuestionObjects();
        // Because you don't do question 6 immediately after question 5;
        // there is one step in between the two questions
        if (!correctStep) {
            correctStep = true;
            return;
        }
        state.questionNum = 6;


        var tempList = quizList.slice(quizList.length-1, quizList.length);
        ex.data.question[6].question = "What is the length of the list that " +
                                 "results from powerset(" +
                                 xToString(tempList) + ")?";
        ex.data.question[6].answer = Math.pow(2, tempList.length);

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[6].question, {size: "large"});
        console.log(question)

        
        addQuestionObjects(question, "question", "header", null);

        var q6Input = ex.createInputText(xQuestion,yQuestion + 60,"Answer (e.g.: 0)");
        if (quizNumber >= 6) q6Input.disable()
        
        addQuestionObjects(q6Input, "input", "inputtext", null)

    }

    //Generates answers for question 7 of the quiz
    function genQ7Answers(fullList, numSelections) {
        // The correct answer for Q7
        var answers = ["return [[]]", "allSubsets += [subset]",
        "allSubsets += [[a[0]] + subset]", "return allSubsets"];

        var selections = []

        selections = answers;
        cIndex = 2;

        ex.data.question[7].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[7].options.push(selections[i]);
        }
    }

    // Draws Question 7 of the quiz
    function drawQ7 () {
        console.log("drawQ7")
        clearQuestionObjects();
        state.questionNum = 7;

        if (quizNumber < 7) nextQButton.disable();

        genQ7Answers(quizList, 4);
        // console.log(ex.data.question[7].options);
        var elements = {};
        for (var i = 0; i < ex.data.question[7].options.length; i++) {
            elements[ex.data.question[7].options[i]] = q7Select(i);
        }

        function q7Select(i) {
            return function() {
                ex.data.question[7].selected = i;
                nextQButton.enable();
            }
        }

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var q7Dropdown = ex.createDropdown(xQuestion, yQuestion+ 2 * lineHeight, "Select the answer", {
            elements: elements
        });
        
        addQuestionObjects(q7Dropdown, "dropdown", "dropdown", elements)
        if (quizNumber >= 7) q7Dropdown.disable()


        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[7].question, {size: "large"});
        
        addQuestionObjects(question, "question", "header", null)

        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth+0.5);
        var yOrigin = topMargin + ((state.recursiveDepth) * 3 + 1.7)* lineHeight;
        drawArrow(xOrigin-15, yOrigin-15);

    }

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

   //Generates answers for question 8 of the quiz
    function genQ8Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q8
        var correct = [];
        for (var i = 0; i < pset.length; i++){
            if (i % 2 != 0){
                correct.push(pset[i])
            }
        }
        // The answer is implemented in a way such that
        // lists longer than 3 can also be used for quiz.
        var answer = xToString(correct);
        var selections = [];
        cIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            var temp = xToString(shuffle(correct));
            if (temp != answer &&
                selections.indexOf(temp) == -1) {
                selections.push(temp);
            }
        }
        selections[cIndex] = answer;
        ex.data.question[8].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[8].options.push(selections[i]);
        }

    }

    // Draws Question 8 of the quiz
    function drawQ8 () {
        clearQuestionObjects();

        state.questionNum = 8;

        if (quizNumber < 8) nextQButton.disable();

        genQ8Answers(quizList, 4);
        // console.log(ex.data.question[8].options);
        var elements = {};
        for (var i = 0; i < ex.data.question[8].options.length; i++) {
            elements[ex.data.question[8].options[i]] = q8Select(i);
        }

        function q8Select(i) {
            return function() {
                ex.data.question[8].selected = i;
                nextQButton.enable();
            }
        }

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var q8Dropdown = ex.createDropdown(xQuestion, yQuestion+ 2 * lineHeight, "Select the answer", {
            elements: elements
        });
        
        addQuestionObjects(q8Dropdown, "dropdown", "dropdown", elements)
        if (quizNumber >= 8) q8Dropdown.disable()


        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[8].question, {size: "large"});

        
        addQuestionObjects(question, "question", "header", null)
        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth+0.5);
        var yOrigin = topMargin + ((state.recursiveDepth) * 3 + 1.7)* lineHeight;
        drawArrow(xOrigin-15, yOrigin-15);

    }

   //Generates answers for question 9 of the quiz
    function genQ9Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q9
        var correct = xToString(pset);
        // The answer is implemented in a way such that
        // lists longer than 3 can also be used for quiz.
        var selections = [];
        cIndex = Math.round(Math.random() * (numSelections-1));
        // keep pushing to selections until we get enough options to fill it
        while(selections.length != numSelections) {
            n = Math.round(Math.random() * (pset.length-1));
            var temp = xToString(shuffle(pset));
            if ( temp != correct &&
                 selections.indexOf(temp) == -1) {
                selections.push(temp);
            }
        }
        selections[cIndex] = correct;
        ex.data.question[9].answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question[9].options.push(selections[i]);
        }

    }

    // Draws Question 9 of the quiz
    function drawQ9 () {
        clearQuestionObjects();
        state.questionNum = 9;

        if (quizNumber < 9) nextQButton.disable();

        genQ9Answers(quizList, 4);
        // console.log(ex.data.question[9].options);
        var elements = {};
        for (var i = 0; i < ex.data.question[9].options.length; i++) {
            elements[ex.data.question[9].options[i]] = q9Select(i);
        }

        function q9Select(i) {
            return function() {
                ex.data.question[9].selected = i;
                nextQButton.enable();
            }
        }

        var xOrigin = sideMargin + blockWidth * (state.recursiveDepth + 2.2);
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + (state.recursiveDepth + 0.9) * 3 * lineHeight;
        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var q9Dropdown = ex.createDropdown(xOrigin, yOrigin, "Select the resulting list from initial call", {
            elements: elements
        });
        
        addQuestionObjects(q9Dropdown, "dropdown", "dropdown", elements)
        if (quizNumber >= 9) q9Dropdown.disable()

        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question[9].question, {size: "large"});
        

        addQuestionObjects(question, "question", "header", null)

    }
};
