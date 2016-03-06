function refresh_handler() {
  var d = new Date();
  var append = "?" + d.getTime();
  var url = $(this).data('url');
  var my_type = $(this).prop('tagName');
  if (my_type == 'IMG') {
    url = $(this).attr('src');
  }

  console.log("Refresh " + my_type + " from " + url);

  if (url) {
    $.get({url: url + append, success: function(data) {
        console.log("GOT");

        if (my_type == 'IMG') {
          // change SRC
          console.log("It's an image, so set the src");
          $(this).src = data;

        } else {
          // change html()
          console.log("It's HTML, so set the content");
          $(this).html(data);
        }

    }});
  }
}

$(document).ready(function() {
  $('.reloadable').each( function() {
    console.log("found reloadable: " + $(this).attr('id'));
    var period = parseInt($(this).data('refresh'));
    var url = $(this).data('url');
    var my_type = $(this).prop('tagName');

    if (my_type == 'IMG') {
      url = $(this).attr('src');
    }

    console.log(period + "/" + my_type + "/" + url);

    if (period > 0 && url) {
      console.log("Added handler");
      $(this).everyTime(period*1000,refresh_handler,$(this).attr('id'));
    }
  });
});
