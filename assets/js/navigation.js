$(document).ready(function () {
  const $window = $(window);
  const $htmlBody = $("html, body");

  $(document).on("click", ".nav-link.mobile-link", function (e) {
    var target = $(this).attr("href");
    if (target && target.startsWith("#") && $(target).length) {
      e.preventDefault();
      var offcanvasInstance = bootstrap.Offcanvas.getInstance(
        document.getElementById("mobileMenu"),
      );
      if (offcanvasInstance) offcanvasInstance.hide();
      setTimeout(() => {
        $htmlBody.animate(
          { scrollTop: $(target).offset().top - 80 },
          600,
          "swing",
        );
      }, 350);
    }
  });

  $("#scrollTopBtn").on("click", function () {
    $htmlBody.animate({ scrollTop: 0 }, 600, "swing");
  });

  $window.on("scroll", function () {
    const scrollPos = $(this).scrollTop();
    $("#scrollTopBtn").toggleClass("visible", scrollPos > 400);
    if (scrollPos < $window.height()) {
      $(".hero-overlay .container").css("opacity", 1 - scrollPos * 0.001);
    }
    $("section[id]").each(function () {
      const $sec = $(this);
      const top = $sec.offset().top;
      const bottom = top + $sec.outerHeight();
      const id = $sec.attr("id");
      if (scrollPos + 120 >= top && scrollPos + 120 < bottom) {
        $(".nav-link").removeClass("active");
        $('.nav-link[href="#' + id + '"]').addClass("active");
      }
    });
  });
});
