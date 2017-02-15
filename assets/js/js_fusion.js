
$("#lupa").on('click', function() {
   $(this).hide();
   $("#close").show();
});
$("#close").on('click', function() {
   $(this).hide();
   $("#lupa").show();
});
