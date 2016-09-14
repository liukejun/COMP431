// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var promise = fetch(url)
            .then(r => r.json())
            .then(r => {
                var wordMap ={}
                var article = r.articles
                for (var i = 0; i < article.length; i++){
                    var txt = article[i].text
                    var words = txt.split(" ")
                    wordMap[article[i]._id] = words.length
                }
                r = wordMap
                return wordMap
            })
            return promise
        throw new Error('Implement me!')
    }

    function countWordsSafe(url) {
        var promise = countWords(url)
            .catch(function(error){
                return []
            })
            return promise
        throw new Error('Implement me!')
    }

    function getLargest(url) {
        var promise = fetch(url)
        .then(r => r.json())
        .then(r => {
                var wordMap ={}
                var max = 0
                var max_id
                var article = r.articles
                for (var i = 0; i < article.length; i++){
                    var txt = article[i].text
                    var words = txt.split(" ")
                    if (max < words.length){
                        max = words.length
                        max_id = article[i]._id
                    }
                }
               
                return max_id+''
            })
        return promise
        throw new Error('Implement me!')
    }

    exports.inclass = {
        author: 'Kejun Liu',
        countWords, countWordsSafe, getLargest
    }

})(this);
