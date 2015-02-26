// Create a namespace for my app
var MovieApp = MovieApp || {};

MovieApp.Movie = function(remoteMovie){
  this.title = remoteMovie.title;
  this.rating = remoteMovie.rating;
  this.total_gross = remoteMovie.total_gross;
  this.description = remoteMovie.description;
  this.id = remoteMovie.id;

  // Create copy of remote Reviews
  this.reviews = [];

  remoteMovie.reviews.forEach(function(review){
    var newReview = {};
    newReview.name = review.name;
    newReview.stars = review.stars;
    newReview.comment = review.comment;
    this.reviews.push(newReview);
  }, this);
};

MovieApp.Movie.prototype.render = function(){
  // spit out html for one movie
  var html = "<div id='movie-" + this.id + "'>";
  html += "<br><hr><br>";
  html += "<h3>" + this.title + "</h3>";
  html += "<dt>Rating</dt><dd>" + this.rating + "</dd>";
  html += "<dt>Total Gross</dt><dd>" + this.total_gross + "</dd>";
  html += "<dt>Description</dt><dd>" + this.description + "</dd>";


  html += "<br><b>Reviews</b><br><br>";
  this.reviews.forEach(function(review){
    html += "By <i>" + review.name + "</i>";
    html += ", Rating <b>" + review.stars + "</b>";
    html += "<p>" + review.comment + "</p>";
  });
  html += "</div>";
  return html;
};
