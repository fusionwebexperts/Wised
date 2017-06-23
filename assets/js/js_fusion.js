
$(".open-details").on('click', function() {
   $(this).hide();
   $(this).parent().find(".close-details").show();
});
$(".close-details").on('click', function() {
   $(this).hide();
   $(this).parent().find(".open-details").show();
});
