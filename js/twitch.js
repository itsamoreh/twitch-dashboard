var usernames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "cromster404"];
var userData = [];

var writeData = function() {

  $(".list").html("");

  for(var x = 0; x < userData.length; x++) {

    if(userData[x]._links) {
      username = userData[x]._links.self.substr(37);
    }

    var linkUsername = '<a href=https://twitch.tv/' + username + '>' + username + '</a>';

    if(userData[x].stream === null) {

      $(".list").append(

        '<div class="row offlineRow"><div class="col-sm-10 col-sm-offset-1"><div class="panel panel-danger"><div class="panel-heading">' +
        linkUsername +
        '<span class="status">Offline <i class="fa fa-times-circle"></i></span></div><div class="panel-body"><div class="col-sm-2"><img class="img-thumbnail" src="' +
        'img/no-stream.png' +
        '"></div><div class="col-sm-10"><p><i class="fa fa-times-circle"></i> ' +
        linkUsername +
        ' is offline' +
        '</p></div></div></div></div></div>'

      );

    } else if(userData[x].stream) {

      var linkImg = '<a href=https://twitch.tv/' + username + '>' + '<img class="img-thumbnail" src="' + userData[x].stream.preview.medium + '"></a>';

      $(".list").append(

        '<div class="row onlineRow"><div class="col-sm-10 col-sm-offset-1"><div class="panel panel-success"><div class="panel-heading">' +
        linkUsername +
        '<span class="status">Online <i class="fa fa-check-circle"></i></span></div><div class="panel-body"><div class="col-sm-2">' +
        linkImg +
        '</div><div class="col-sm-10"><p>' +
        '<i class="fa fa-gamepad"></i> ' +
        userData[x].stream.game +
        '</p><br><p><i class="fa fa-info-circle"></i> ' +
        userData[x].stream.channel.status +
        '</p><br><p><i class="fa fa-eye"></i> ' +
        userData[x].stream.viewers +
        '</div></div></div></div></div>'

      );

    } else {

      $(".list").append(

        '<div class="row offlineRow"><div class="col-sm-10 col-sm-offset-1"><div class="panel panel-warning"><div class="panel-heading">' +
        userData[x].message +
        '<span class="status">Error <i class="fa fa-times-circle"></i></span></div><div class="panel-body"><div class="col-sm-2"><img class="img-thumbnail" src="' +
        'img/error.png' +
        '"></div><div class="col-sm-10"><p><i class="fa fa-exclamation-circle"></i> ' +
        userData[x].message +
        '</p></div></div></div></div></div>'

      );
    }

  }

}

// GET DATA FROM TWITCH API FOR USERNAMES
function getData(){
  for(var x = 0; x < usernames.length; x++) {
    var username = usernames[x];
    $.ajax({
      url: 'https://api.twitch.tv/kraken/streams/'+ username +'?callback=?',
      dataType: 'json',
      success: function(data) {
        userData.push(data);
      },
      complete: function () {
        writeData();
      }
    });
  }
}

// SHOW ONLINE ROWS
function online() {

  $(".onlineRow").removeClass("hiddenRow");
  $(".offlineRow").addClass("hiddenRow");

}
// SHOW OFFLINE ROWS
function offline() {

  $(".offlineRow").removeClass("hiddenRow");
  $(".onlineRow").addClass("hiddenRow");

}
// SHOW ALL ROWS
function all() {

  $(".offlineRow").removeClass("hiddenRow");
  $(".onlineRow").removeClass("hiddenRow");

}

// CLICK EVENTS
$(function() {
  $(".showOnline").on("click", function() {
    online();
  });
  $(".showOffline").on("click", function() {
    offline();
  });
  $(".showAll").on("click", function() {
    all();
  });
});

$(document).ready( function() {

  getData();

});
