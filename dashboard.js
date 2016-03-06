function refresh_handler() {
  var d = new Date();
  var append = "?" + d.getTime();
  var url = $(this).data('url');
  var my_type = $(this).prop('tagName');

  // console.log("Refresh " + my_type + " from " + url);

  var that = this;
  var id = $(this).attr('id');

  if (url) {
    if (my_type == 'IMG') {
      var loader = $('#loader_' + id);
      loader.attr('src', url + append);
    //  console.log(loader);
    } else {
      $.get({url: url + append, success: function(data) {
      //    console.log("GOT");
          $(that).html(data);
        }});
    }
  }
}

$(document).ready(function() {

  $('body').append("<div id='dashboard_loaders' style='display:none'></div>")

  $('.reloadable').each( function() {
    //console.log("found reloadable: " + $(this).attr('id'));
    var period = parseInt($(this).data('refresh'));
    var url = $(this).data('url');
    var my_type = $(this).prop('tagName');
    var id = $(this).attr('id');

    if (my_type == 'IMG') {
      url = $(this).attr('src');
      $(this).data('url', url);
      // for each image, there's a hidden img tag to load in the background
      $('#dashboard_loaders').append("<img class='reloadable_loader' id='loader_" + id + "' data-url='" + url + "' />")
    }

    // console.log(period + "/" + my_type + "/" + url);

    if (period > 0 && url) {
      $(this).everyTime(period*1000,refresh_handler,$(this).attr('id'));
    }

    $('.reloadable_loader').load( function() {
      var id = $(this).attr('id');
      var owner = id.substr(7);
      $('#' + owner).attr('src', $(this).attr('src'));
    });


  });
});
