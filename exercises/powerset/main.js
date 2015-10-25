/**
 * @file Powerset
 * @author Group 5 - Max, Emily, Andy
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
    ex.chromeElements.newButton.on("click", resetPressed);
    ex.chromeElements.resetButton.on("click", resetPressed);
    ex.chromeElements.submitButton.disable();
    var nextButton = ex.createButton(canvasWidth*(9/11), canvasHeight*(9/10),
                                    "Next").on("click", nextStep)
    var prevButton = ex.createButton(canvasWidth*(9/11)-60, canvasHeight*(9/10),
                                     "Prev").disable()//on("click", prevStep)
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
    // var separater = ex.createHeader(0, canvasHeight*(10/16), sep,
    //                                 {size:"small", textAlign:"left"})


	/////// Animation Configuration
	var animationDuration = 300;
	var defaultAnimaitonDuration = 300;

    //this function reset parameters and remove headers
    //this code is used in multiple function
    function clearUp(){
        quizButton.disable(); //Can't do quiz until step through visualization

        /////// Animation Configuration
        var animationDuration = 300;
        var defaultAnimaitonDuration = 300;

        state.recursiveDepth = 0;
        state.isReturning = false;
        state.isSubstituting = false;
        state.isMerging = false;
        state.isAdding1 = false;
        state.isAdding2 = false;

        //Remove every header
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
    }
    function newPressed(){
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

    //return a list of integer of length listLength, values from 0 to 9
    function generateList() {
        var arr = [];
        var isChar = Math.random()<.5;
        for (i = 0; i < state.listLength; i++) {
            n = Math.round(Math.random() * 10);
            //It's OK to have repeated element
            var e;
            if (isChar) e = String.fromCharCode(65+n);
            else e = Math.floor(Math.random() * 10);

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
    // console.log(xToString(["_"]))

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
            // console.log(ele.box())
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
        // console.log(x0, y0, x1, y1, xd, yd, d)
        recurseMove(0);
    }

    init();
    function init(){
        //generate recursiveCall data
        powersetMain(generateList())
        nextStep(); //To show the initial call of function
    }

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
                if (state.isSubstituting) {
                    state.isSubstituting = false;
                } else {
                //Normal return
                    drawSubstitute();//This may need changing as well.
                    if (state.recursiveDepth != 0) state.isSubstituting = true;
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
            if (state.isSubstituting) {
                drawSubstitute();
                state.isSubstituting = false;
                state.isAdding1 = true;
            } else if (state.isAdding1){
                drawAdd1();
                state.isAdding1 = false;
                state.isAdding2 = true;
            } else if (state.isAdding2) {
                drawAdd2();
                state.isAdding2 = false;
                state.isMerging = true;
            }
            else if (state.isMerging) {
                drawMerge();
                state.isMerging = false;
            }
             else
            {
            //Normal return
                drawReturn();
                if (state.recursiveDepth != 0) state.isSubstituting = true;
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
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        //Base Case
        if (state.recursiveDepth == state.listLength) {
            var s1 = "powerset("+xToString(input)+")"
            var h1 = ex.createHeader(xOrigin, yOrigin, s1,
                        {size:fontSize, textAlign:"right",
                         transition:"fade"});
            var s2 = xToString([[]])
            var h2 = ex.createHeader(xOrigin, yOrigin + lineHeight, s2,
                                {size:fontSize, textAlign:"right",
                                 transition:"fade"});
            h2.width(blockWidth);
            h1.width(blockWidth);
            thisCall.h1 = h1;
            thisCall.h2 = h2;
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
        nextButton.disable()
        console.log("drawReturn depth: " + state.recursiveDepth)
        var thisCall = state.recursiveCalls[state.recursiveDepth];

        state.rectLeft = sideMargin + blockWidth * state.recursiveDepth + 30;
        state.rectTop = topMargin + (state.recursiveDepth * 3) * lineHeight;
        if (state.recursiveDepth == 0) {
            // So it doesn't shade out the initial call to powerset
            state.rectTop += lineHeight;
        }
        state.rectWidth = canvasWidth - sideMargin - state.rectLeft;
        state.rectHeight = canvasHeight*(3/5) - state.rectTop;

        //if base case just remove one header
        if (state.recursiveDepth == state.listLength) {
            //Base Case
            //ex.graphics.ctx.fillRect(state.rectLeft, state.rectTop,
                                 // state.rectWidth, state.rectHeight);
            var s1 = "[[ ]]"
        } else {
            //ex.graphics.ctx.fillRect(state.rectLeft, state.rectTop,
                                 // state.rectWidth, state.rectHeight);

            var s1 = xToString(thisCall.result);
        }

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
        animateMoveElement(h6, xOrigin, yOrigin, function() {nextButton.enable()})

        //Doesn't set the block width to the final resulting list
        if (state.recursiveDepth != 0) h6.width(blockWidth);
        else h6.width(canvasWidth);
        thisCall.h6 = h6; //So we can remove the element later on

        //Solve the layer conflict; draw the button after the header is created
        if (state.recursiveDepth == 0)
            quizButton = ex.createButton(canvasWidth*(8/9)-10, 10,
                                     "Start Quiz").on("click", startQuiz)
    }

    //display the result after merge(or not) the first element with the returned value
    function drawSubstitute() {

        //remove header of the callee
        state.recursiveCalls[state.recursiveDepth+1].h6.hide();

        var listText = state.recursiveCalls[state.recursiveDepth+1].h1.text();
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
        nextButton.disable();
        //attempts to prevent timing issues when pressing next too fast
        console.log("drawAdd1 depth: " + state.recursiveDepth)

        var thisCall = state.recursiveCalls[state.recursiveDepth];

        function addE(e, l) {
            var l0 = [];
            for (i = 0; i < l.length; i++) {
                l0.push([e].concat(l[i]))
            }
            return l0;
        }
        function reviseH2() {
            console.log("revising in drawAdd1");
            //Revise this calls' join headers h2
            var returningList = state.recursiveCalls[state.recursiveDepth+1].result;
            var firstElement = thisCall.input[0];
            thisCall.h2.text(xToString(returningList));
            thisCall.h2.show();
            nextButton.enable();
        }
        //remove this call's join headers h2 h4
        thisCall.h4.hide();
        thisCall.h2.hide();
        setTimeout(reviseH2, 500);

    }


    function drawAdd2(){
        nextButton.disable();
        console.log("drawAdd2 depth: " + state.recursiveDepth);
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
            thisCall.h5.remove();
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
        var thisCall = state.recursiveCalls[state.recursiveDepth];
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

        //make animatio slower for this part
        animationDuration = 300;

        function fly() {
            console.log("fly")
            thisCall.h3.hide();
            //the element of the list that flies into the empty space

            for (var i = 0; i < returningList.length; i++) {
                var flier = ex.createHeader(initX, initY, xToString(firstElement), {size: fontSize});
                var destX = thisCall.h5.box().x;
                destX = destX + xd(addE("_", returningList), i)*fontWidth;
                animateMoveElement(flier, destX, initY, function(){});
                fliers.push(flier);
            }
            setTimeout(moveBack, 2000)
        }
        setTimeout(fly, 1000);

        function moveBack() {
            //move h5 back to the place of h3; remove h5 and fliers, show H3.
            console.log("moving")
            var xMoveBack = xToString(addE(1,thisCall.input)).length*fontWidth-45;
            animateMoveElement(thisCall.h5, thisCall.h5.box().x - xMoveBack, initY, function(){
                integrateH3();
                nextButton.enable();
                animationDuration = defaultAnimaitonDuration;
            });
            for (var i = 0; i < fliers.length; i++) {
                animateMoveElement(fliers[i], fliers[i].box().x - xMoveBack, initY, function(){});
            }
        }

    }

    function drawMerge(){
        console.log("merging");
        function showMergeResult() {
            var resultList = state.recursiveCalls[state.recursiveDepth].result;
            state.recursiveCalls[state.recursiveDepth].h2.text(xToString(resultList));
            state.recursiveCalls[state.recursiveDepth].h2.show();
        }
        state.recursiveCalls[state.recursiveDepth].h2.hide();
        state.recursiveCalls[state.recursiveDepth].h3.hide();
        setTimeout(showMergeResult, 500);
    }

    // Goes to the next step in quiz mode (regardless of whether the next
    // step is an actual question or not)
    function nextQuestion() {
        if (state.questionNum == 1 && ex.data.question1.complete == false) {
            if (q1Input.text() == "") {
                ex.alert("Please type your answer in the input box.",
                    {transition: "alert-long"});
                return; // So they are forced to input an answer
            }
            q1Input.disable();
            if (ex.data.question1.answer == q1Input.text().trim()) {
                ex.data.question1.finalCorrect = true;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question1.finalCorrect = false;
                ex.alert("Incorrect. The correct answer is " +
                    ex.data.question1.answer,
                    {color: "red", transition: "alert-long"});
            }
            ex.data.question1.complete = true;
            return; // so they can reflect on answer before moving on to next step
        }
        else if (state.questionNum == 2 && ex.data.question2.complete == false) {
            q2Dropdown.disable();
            if (ex.data.question2.answer == ex.data.question2.selected) {
                ex.data.question2.finalCorrect = true;
                ex.alert("Correct!", {color: "green", transition: "alert-long"});
            }
            else {
                ex.data.question2.finalCorrect = false;
                ex.alert("Incorrect", {color: "red", transition: "alert-long"});
            }
            ex.data.question2.complete = true;
            return; // so they can reflect on answer before moving on to next step
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
            state.recursiveDepth++;
        } else {
            //if next step is to merge
            if (state.isSubstituting) {
                drawSubstitute();
                state.isSubstituting = false;
            } else {
            //Normal return
                drawReturn();
                if (state.recursiveDepth != 0) state.isSubstituting = true;
                state.recursiveDepth--;
            }
        }

        // Moves on to the next question
        if (state.questionNum == 1 && ex.data.question1.complete == true)
            drawQ2();
        if (state.questionNum == 2 && ex.data.question2.complete == true)
            drawQ3();
    }

    var nextQButton;
    var quizList = generateList();
    ex.data.state.quizList = quizList;
    var q2Dropdown;
    var questionObjects = {};

    // Removes the visualization elements
    // Adds the necessary quiz elements
    function startQuiz() {
        ex.graphics.ctx.fillStyle = 'white';
        ex.graphics.ctx.fillRect(0,0,canvasWidth, canvasHeight);
        ex.graphics.ctx.fillStyle = 'grey';

        // Removing all the remaining headers on the screen
        for (var i = 0; i < state.recursiveCalls.length; i++) {
            var obj = state.recursiveCalls[i];
            console.log(obj.h1.text());
            if (obj.h1 != undefined) obj.h1.remove();
            if (obj.h2 != undefined) obj.h2.remove();
            if (obj.h3 != undefined) obj.h3.remove();
            if (obj.h4 != undefined) obj.h4.remove();
            if (obj.h5 != undefined) obj.h5.remove();
            if (obj.h6 != undefined) obj.h6.remove();
        }
        prevButton.remove();
        skipButton.remove();
        nextButton.remove();
        quizButton.remove();
        codeWell1.remove();

        codeWell1 = ex.createCode(10, canvasHeight-210,
                          ex.data.questionCode.display, ex.data.questionCode);

        // resetting values
        state.recursiveCalls = [];
        state.recursiveDepth = 0;
        state.isReturning = false;
        state.isSubstituting = false;
        state.isQuizzing = true;

        console.log(quizList);
        powersetMain(quizList);
        nextQButton = ex.createButton(canvasWidth*(11/12), canvasHeight*(9/10),
                                      "Next").on("click", nextQuestion);
        drawQ1();
    }

    var q1Input;
    // The function to display question 1 in quiz mode. Every drawQ# function
    // will get rid of the elements that were used in the previous question,
    // set the question number in the state, and then draw the question.
    function drawQ1() {
        console.log("Question 1");

        state.questionNum = 1;
        ex.data.question1.question = "How many total calls to powerset will " +
                                 "there be as a result of calling powerset(" +
                                 xToString(quizList) + ")?";
        ex.data.question1.answer = quizList.length + 1;

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question1.question, {size: "large"});

        questionObjects.question = question;

        q1Input = ex.createInputText(xQuestion,yQuestion + 60,"Answer (e.g.: 0)");

    }

    //Generates answers for question 1 of the quiz
    function genQ2Answers(fullList, numSelections) {
        pset = powerset(fullList);
        // The correct answer for Q2
        correct = fullList.slice(1,fullList.length);
        var selections = []
        cIndex = Math.round(Math.random() * (numSelections-1));

        // keep pushing to selections until we get enough options to fill it
        while(selections.length != 4) {
            n = Math.round(Math.random() * (pset.length-1));
            if ( pset[n].length < fullList.length &&
                 xToString(pset[n]) != xToString(correct) &&
                 selections.indexOf(pset[n]) == -1) {
                selections.push(pset[n]);
            }
        }
        selections[cIndex] = correct;
        ex.data.question2.answer = cIndex;

        for (var i = 0; i < selections.length; i++) {
            ex.data.question2.options.push("powerset( [" + selections[i] + "] )");
        }
    }

    // Draws question 2 of quiz mode
    function drawQ2() {
        q1Input.remove();
        questionObjects.question.remove();
        state.questionNum = 2;

        nextQButton.disable();
        genQ2Answers(quizList, 4);
        console.log(xToString(ex.data.question2.options));
        var elements = {};
        for (var i = 0; i < ex.data.question2.options.length; i++) {
            elements[ex.data.question2.options[i]] = q2Select(i);
        }

        function q2Select(i) {
            return function() {
                ex.data.question2.selected = i;
                nextQButton.enable();
            }
        }

        //coordinates of topleft of blocks
        var xOrigin = sideMargin + blockWidth * state.recursiveDepth;
        //times 1.5 because the height offirst line of a newblock is between
        //the height of second and third lines of the previous block
        var yOrigin = topMargin + state.recursiveDepth * 3 * lineHeight;

        // Make a dropdown
        q2Dropdown = ex.createDropdown(xOrigin,yOrigin,"Select One", {
            elements: elements
        });

        var xQuestion = canvasWidth/2;
        var yQuestion = canvasHeight*(5/8)+lineHeight;
        var question = ex.createParagraph(xQuestion, yQuestion,
                            ex.data.question2.question, {size: "large"});

        questionObjects.question = question;
    }

    function drawQ3() {
        q2Dropdown.remove();
        questionObjects.question.remove();
        state.questionNum = 3;
    }


};
