$(function() {
  $("#container").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      $(this).text("You swiped " + direction);
    },
    threshold: 0
  });
});
window.onload = function() {
  console.log("On load");
  var backgroundImageUrl = "http://xbmc-rocks.com/NFLCurrentScoresImageServlet.png";
  $("#container").css("background-image", "url(" + backgroundImageUrl + ")");
}
