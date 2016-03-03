function refresh_handler() {
  console.log("Refresh!");
}

$(document).ready(function() {
  $('.reloadable').each( function() {
    console.log("found reloadable: " + $(this).attr('id'));
    var period = parseInt($(this).data('refresh'));
    var url = $(this).data('url');

    console.log(period + "/" + url);

    if (period > 0 && url) {
      console.log("Added handler");
      $(this).everyTime(period*1000,refresh_handler,$(this).attr('id'));
    }
  });
});
