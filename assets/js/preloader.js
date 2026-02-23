$(document).ready(function () {
  const $window = $(window);
  const $body = $("body");
  $body.css("overflow", "hidden");

  function handlePreloader() {
    $("#preloader").fadeOut(500, function () {
      $body.css("overflow", "auto");
      window.countUp && window.countUp();
    });
  }

  $window.on("load", handlePreloader);
  setTimeout(handlePreloader, 2000);
});
