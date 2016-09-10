var index = 0;
var weeks = [];
$(function() {
  $("#container").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == "left") {
        index--;
      }
      if (direction == "right") {
        index++;
      }
      if (index < 0) {
        index = weeks.length - 1;
      }
      if (index > weeks.length) {
        index = 0;
      }
      console.log("Index: " + index);
      $("#image").attr("src", weeks[index].imageUrl);
    },
    threshold: 0
  });
});
$.getJSON("/TextFeed2Images/JsonServlet?action=weeks", function(data) {
  weeks = data;
  console.log(weeks.length + " weeks.");
  for (index = 0; index < weeks.length && !weeks[index].current; index++);
  console.log("index: " + index);
  $('.toast').fadeIn(400).delay(3000).fadeOut(400);
});

function refreshIfCurrentWeek() {
  if (weeks[index].current) {
    $("#image").attr("src", weeks[index].imageUrl + "?epoch=" + (new Date).getTime());
  }
}

function set_body_height() { // set body height = window height
  $('body').height($(window).height());
}

$(document).ready(function() {
  $(window).bind('resize', set_body_height);
  set_body_height();
  setInterval(refreshIfCurrentWeek, 60000);
});
