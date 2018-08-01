//dependency
require("dotenv").config();

var keys = require("/keys"); // access to twitter api keys and spotify secret

var fs = require("fs");// read/write 

var require = require("request"); // npm request package

//npm installations ( twitter and spotify)
//per the  twitter npm installation guide 
//noted capitialzation
var Twitter = require('twitter');//methods are stream

var Spotify = require('node-spotify-api');//methods are search and request

//api keys pulled in from the keys.js file
var spotify = new Spotify(keys.spotify);


//functions for selections

//movie search 

var findMovie = function(movieSearch) {
    // default movie
    if(movieSearch === undefined) {
        movieSearch = "Mr. Nobody";
    }
    
    var url = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    //for t at least one argument is required

request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
        //get response back in json format then break it down in the console
       var jsonObj = JSON.parse(body);

        console.log("Title" + jsonObj.Title);
        console.log("Year" + jsonObj.Year);
        console.log("Rating" + jsonObj.Rating);
        console.log("Title" + jsonObj.Title);
        console.log("IMDB Rating: " + jsonObj.imdbRating);
        console.log("Country: " + jsonObj.Country);
        console.log("Language: " + jsonObj.Language);
        console.log("Plot: " + jsonObj.Plot);
        console.log("Actors: " + jsonObj.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonObj.Ratings[1].Value);
    }//end of data display 
 });// end of request function
}// end of movie search function 
// call this entire function in the case switch function 



//grabs artist name after being passed through the search function

var findArtist = function(artist){
    return artist.name;
};
// spotify search function

var spotSearch = function(songName){
    
    if(songName === undefined){
        spotify.search(
            {
              type: 'track',
               query:"What's my age again" 
            },
            function(err, data){
                if(err){
                    return console.log('Error occurred:' + err);
                }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(findArtist));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
              }
            }
        )
    }
}//end of spotify search function

//twitter function

var latestTweet = function(){
    var client = new Twitter(keys.twitter);

    var params = {
    screen_name: 'liriCassie'
    };

    client.get( "statuses/user_timeline", params, function(err,tweets, response){
        if(!err){
            //loop over 20 tweets 
            for(var i =0; i< tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
            }
        }
    });
}//end of latestTweet function


// functions that are done  latestTweet , spotSearch, findMovie
//now set up a function that takes in node arguements for each 
var doWhatItSays = function(){
fs.readFile("random.txt", function(error,data){
    console.log(data);

    var dataArgs = data.split(",")//split the text on this file at the comma

    if(dataArgs.length === 2){
        pick(dataArgs[0], dataArgs[1]);
    }
    else if(dataArgs.length === 1){
        pick(dataArgs[0]);
    }  
});
}

//function that determines which function to run

var pick = function(options, functionStuff){
switch(options){
case "my-tweets":
    latestTweet(functionStuff);
    break;
case "spotify-this-song":
    spotSearch(functionStuff);
    break;
case "movie-this":
    findMovie(functionStuff);
    break;
case "do-what-it-says":
    doWhatItSays();
    break;
default:
    console.log("Liri has no idea what you're talking about");
    }
};


//takes in arguments from the command line
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
 //console arguments 
  runThis(process.argv[2], process.argv[3]);
  



