var settings = {};
settings.index = 0;
var weeks = [];
$(function() {
  $("#container").swipe({
    tap: function(event, target) {
      console.log(" tap");
      location.href = "teams.html";
    },
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == "left") {
        console.log("Left");
        settings.index--;
      }
      if (direction == "right") {
        console.log("Right");
        settings.index++;
      }
      if (direction == "down" || direction == "up") {
        console.log("Down or up.");
        setImage();
      }
      if (settings.index < 0) {
        settings.index = weeks.length - 1;
      }
      if (settings.index > weeks.length) {
        settings.index = 0;
      }
      console.log("settings.index: " + settings.index);
      setImage();
    },
    threshold: 50
  });
});
$.getJSON("/TextFeed2Images/JsonServlet?action=weeks", function(data) {
  weeks = data;
  console.log(weeks.length + " weeks.");
  restoreSettings();
  if (settings.index == 0) {
    console.log("Index in settings is 0. Setting to current week.");
    for (settings.index = 0; settings.index < weeks.length && !weeks[settings.index].current; settings.index++);
  }
  console.log("settings.index: " + settings.index);
  $('.toast').fadeIn(400).delay(5000).fadeOut(400);
  setImage();
});

function saveSettings() {
  localStorage.setItem("weekSettings", JSON.stringify(settings));
}

function restoreSettings() {
  var settingsTemp = null;
  if (localStorage.getItem("weekSettings") != null) {
    settingsTemp = JSON.parse(localStorage.getItem("weekSettings"));
  }
  if (settingsTemp == null) {
    console.log("Settings are null from localStorage");
  } else {
    settings = settingsTemp;
    console.log("Restored settings: " + JSON.stringify(settings));
  }
}

function setImage() {
  if (settings.index == weeks.length) {
    settings.index = 0;
  }
  $("#image").attr("src", weeks[settings.index].imageUrl + "?epoch=" + (new Date).getTime());
  saveSettings();
}

function refreshIfCurrentWeek() {
  if (weeks[settings.index].current) {
    setImage();
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
