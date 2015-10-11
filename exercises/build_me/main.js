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

    //A good place to start is the kitchen sink

};
