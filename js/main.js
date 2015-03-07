$(document).ready(function(){
  MovieApp.MovieList.init('http://localhost:3000', $("#get-movies"), $('#movies'));
});

// Create a namespace for my app
var MovieApp = MovieApp || {};
