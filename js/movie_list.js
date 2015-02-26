// Create a namespace for my app
var MovieApp = MovieApp || {};

MovieApp.MovieList = {
  get: function(){
    $.ajax({
      url: 'http://localhost:3000',
      dataType: 'json'
    }).done(MovieApp.MovieList.moviesHandler);
  },
  moviesHandler: function(remoteMovies){
    var html = "", movie;

    remoteMovies.forEach(function(remoteMovie){
      // Create a new movie from a remoteMovie
      movie = new MovieApp.Movie(remoteMovie);
      // Generate HTML for one movie
      html += movie.render();
    });
    $('#movies').append(html);
  }
};
