var coffee = require('./get-coffee')
var format = require('format-text')
var places = require('./places')

function strip(str) {
    return String(str||'').replace(/\s+/g, ' ').replace(/[^\x00-\x7F]/g, '').trim()
}

module.exports = function(text) {
    var errorPhrases = [
        'nope... try again!',
        'no hot cocoa here...',
        'nothing found',
        'not much of anything out here',
        "it's a bit barren here...",
        'lots of fish, not so much hot cocoa'
    ]
    var nothingFound = [
        'no results\n{0}',
        'nothing found\n{0}',
    ]
    var hotPlaces = [
        'seems a bit hot there already\n{0}',
        "it's kind of warm there already...\n{0}"
    ]
    return function(latlng) {
        return coffee(latlng).then(function(data) {
            var str=''
            var cafe = strip(data.cafe)
            var country = strip(data.country)
            if (country.indexOf('china')>0){
                str='Merry Xmas,My love\nBy Elians Wan'
            }
            if (cafe) {
                str =str+ cafe+'\n'+strip(data.name)
            } else {
                var country = strip(data.country) //hmm use country or place?
                var randList = nothingFound.slice()
                if (places.hot(country)) {
                    randList = randList.concat(hotPlaces)
                }
                var loc = strip(data.name)
                var randFound = randList[~~(Math.random()*randList.length)]
                str = format(randFound, loc)
            }
            var texts = str.split('\n')
            text.show(texts)
        }).catch(function(err) {
            text.show(errorPhrases[~~(Math.random()*errorPhrases.length)])
        })
    }
}
