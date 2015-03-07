// Create a namespace for my app
var MovieApp = MovieApp || {};

MovieApp.MovieList = {
  url: null,
  getMoviesButton: null,
  movieList: null,
  init: function(url,  $getMoviesButton, $movieList ){
    // the remote URL
    this.url = url;
    this.getMoviesButton = $getMoviesButton;
    this.movieList = $movieList;

    // The get method will be invoked by a HTML button.
    // So, by defualt it's "this" pointer will be the DOM
    // element for this button.
    // Let's use the bind method to change the "this" pointer
    // for all future invocations of the click handler to be
    // the MovieList.
    // this.getMoviesButton.on('click', this.get.bind(this));

    // Alternate to the above using closure, see notes below.
    this.getMoviesButton.on('click', this.getWithClosure());

    // Simulate a button click to get all the movies, ay.
    this.getMoviesButton.trigger('click');

  },
  render: function(content){
    // Clear the list of movies.
    this.movieList.empty();

    // Add the list of movies, content, to the html
    // unordered list.
    this.movieList.append(content);
  },
  getWithClosure: function(){
    // create a lexically scoped variable that will be
    // available in inner functions.
    // This variable's value will be set to the movie list
    // at runtime, when it's invoked in the init method above.
    var thisMovieList = this;

    // Build the html for all movies
    var handler = function(remoteMovies){
      var html = "", movie;

      remoteMovies.forEach(function(remoteMovie){
        // Create a new movie from a remoteMovie
        movie = new MovieApp.Movie(remoteMovie);
        // Generate HTML for one movie
        html += movie.render();
      });

      // use the lexically scoped variable, declared
      // in the outer function.
      thisMovieList.render(html);
    };

    // return a function that will invoke an ajax get.
    // the 'handle' function is a closure. It has access
    // to variables in it's lexical scope, i.e. outer
    // functions.
    return function(){
      $.ajax({
        url: thisMovieList.url,
        dataType: 'json'
      }).done(handler);
    };

  },
  get: function(){
    // Again, we must bind moviesHandler to this movie list
    // because the moviesHandler function implementation uses
    // the movie list's properties.
    $.ajax({
      url: this.url,
      dataType: 'json'
    }).done(this.moviesHandler.bind(this));
  },
  moviesHandler: function(remoteMovies){
    var html = "", movie;

    remoteMovies.forEach(function(remoteMovie){
      // Create a new movie from a remoteMovie
      movie = new MovieApp.Movie(remoteMovie);
      // Generate HTML for one movie
      html += movie.render();
    });
    this.render(html);
  }
};
