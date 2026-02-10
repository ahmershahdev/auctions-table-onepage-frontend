$(document).ready(function () {
  const $window = $(window);
  const $body = $("body");
  const $htmlBody = $("html, body");

  $body.css("overflow", "hidden");

  function handlePreloader() {
    $("#preloader").fadeOut(500, function () {
      $body.css("overflow", "auto");
      countUp();
    });
  }

  $window.on("load", handlePreloader);
  setTimeout(handlePreloader, 2000);

  function showPremiumAlert(
    message,
    type = "info",
    title = "Notification",
    autoHide = true,
  ) {
    const alert = $("#premiumAlert");
    const titleEl = $("#alertTitle");
    const messageEl = $("#alertMessage");

    alert.removeClass("success error info").addClass(type + " show");
    titleEl.text(title);
    messageEl.text(message);

    if (autoHide) {
      setTimeout(() => $("#premiumAlert").removeClass("show"), 4000);
    }
  }

  window.hidePremiumAlert = function () {
    $("#premiumAlert").removeClass("show");
  };

  $(".premium-alert-close").on("click", hidePremiumAlert);

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

  function countUp() {
    $(".counter").each(function () {
      const $el = $(this);
      const target = parseInt($el.data("target"));
      let current = 0;
      const increment = target / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          $el.text(target);
          clearInterval(interval);
        } else {
          $el.text(Math.floor(current));
        }
      }, 30);
    });
  }

  const typingTexts = [
    "Rare Collectibles & Fine Art",
    "Luxury Watches & Jewelry",
    "Vintage Cars & Electronics",
    "Real-Time Secure Bidding",
    "Trusted by 50,000+ Buyers",
  ];
  let textIndex = 0,
    charIndex = 0,
    isDeleting = false;

  function typeText() {
    const currentText = typingTexts[textIndex];
    const $el = $("#typingText");

    if (isDeleting) {
      $el.text(currentText.substring(0, charIndex - 1));
      charIndex--;
    } else {
      $el.text(currentText.substring(0, charIndex + 1));
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      delay = 400;
    }
    setTimeout(typeText, delay);
  }
  typeText();

  function updateTimer() {
    $(".auction-timer").each(function () {
      const $timer = $(this);
      let h = parseInt($timer.data("hours")) || 0;
      let m = parseInt($timer.data("minutes")) || 0;
      let s = parseInt($timer.data("seconds")) || 0;

      if (s > 0) s--;
      else if (m > 0) {
        m--;
        s = 59;
      } else if (h > 0) {
        h--;
        m = 59;
        s = 59;
      }

      $timer.data({ hours: h, minutes: m, seconds: s });
      const pad = (num) => String(num).padStart(2, "0");
      $timer.text(`${pad(h)}:${pad(m)}:${pad(s)}`);
    });
  }
  setInterval(updateTimer, 1000);

  $(".filter-btn").on("click", function () {
    const filterValue = $(this).data("filter");
    $(".filter-btn")
      .removeClass("active btn-primary")
      .addClass("btn-outline-light");
    $(this).removeClass("btn-outline-light").addClass("active btn-primary");

    if (filterValue === "all") {
      $(".auction-item").show();
    } else {
      $(".auction-item").each(function () {
        $(this).toggle($(this).data("category") === filterValue);
      });
    }
  });

  $(".wishlist-btn").on("click", function (e) {
    e.preventDefault();
    const $btn = $(this);
    $btn.toggleClass("liked");
    $btn.find("i").toggleClass("bi-heart bi-heart-fill");
  });

  $("#itemModal").on("show.bs.modal", function (e) {
    const $btn = $(e.relatedTarget);
    const title = $btn.data("title");

    $("#itemModalLabel, #modalTitle").text(title);
    $("#modalImg").attr({ src: $btn.data("img"), alt: title });
    $("#modalBid").text($btn.data("bid"));
    $("#modalDesc").text($btn.data("desc"));

    $(this).data({ "item-title": title, "item-bid": $btn.data("bid") });
  });

  $(document).on(
    "click",
    '#itemModal a.btn[data-bs-dismiss="modal"]',
    function (e) {
      if ($(this).find("i.bi-lightning-fill").length === 0) return;
      e.preventDefault();

      bootstrap.Modal.getInstance(document.getElementById("itemModal")).hide();
      setTimeout(() => {
        if ($("#bid").length)
          $htmlBody.animate(
            { scrollTop: $("#bid").offset().top - 80 },
            600,
            "swing",
          );
      }, 400);
    },
  );

  // Proper focus management for modals
  $("#loginModal").on("hidden.bs.modal", function () {
    // Focus on the button that triggered the modal
    $("#loginBtn, #mobileMenu .nav-link[href='#login']").first().focus();
  });

  $("#itemModal").on("hidden.bs.modal", function () {
    // Focus returns to the button that opened the modal (handled by Bootstrap)
  });
  $("#loginBtn").on("click", () => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(
      document.getElementById("mobileMenu"),
    );
    if (offcanvasInstance) offcanvasInstance.hide();
  });
  $("#termsLink").on("click", function (e) {
    e.preventDefault();
    $("#loginModal").modal("hide");
    setTimeout(
      () =>
        $htmlBody.animate(
          { scrollTop: $("#disclaimer").offset().top - 80 },
          600,
        ),
      300,
    );
  });

  $("#increaseBtn, #decreaseBtn").on("click", function (e) {
    e.preventDefault();
    const $input = $("#bidAmount");
    let value = parseInt($input.val()) || 100;
    const isIncrease = $(this).attr("id") === "increaseBtn";

    value = isIncrease ? Math.min(value + 1, 100000) : Math.max(value - 1, 100);
    $input.val(value);
  });

  $("#bidAmount").on("change", function () {
    let value = parseInt($(this).val()) || 100;
    $(this).val(Math.min(Math.max(value, 100), 100000));
  });

  $("#bidBtn").on("click", function () {
    setTimeout(
      () =>
        $htmlBody.animate(
          { scrollTop: $("#bid").offset().top - 80 },
          600,
          "swing",
        ),
      100,
    );
  });

  $("#bidForm").on("submit", function (e) {
    e.preventDefault();
    $("#bidSuccess").addClass("d-none");

    if (!this.checkValidity()) {
      e.stopPropagation();
      $(this).addClass("was-validated");
      return false;
    }

    $("#bidSuccess").removeClass("d-none");
    $(this)[0].reset();
    $("#bidAmount").val("100");
    $(this).removeClass("was-validated");
    setTimeout(() => $("#bidSuccess").addClass("d-none"), 5000);
  });

  $("#registerPassword").on("input", function () {
    const pw = $(this).val();
    let strength = 0;
    if (pw.length >= 7) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/[a-z]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;
    if (/[@$!%*?&]/.test(pw)) strength++;

    $(".progress").toggle(pw.length > 0);

    const classes = [
      "bg-warning",
      "bg-success",
      "bg-info",
      "bg-orange",
      "bg-danger",
    ];
    $("#passwordStrength")
      .css("width", (strength / 5) * 100 + "%")
      .removeClass()
      .addClass("progress-bar " + (classes[strength - 1] || ""));
  });

  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if ($("#registerPassword").val() !== $("#registerConfirmPassword").val()) {
      $("#errorMessage").text("Passwords must match.");
      const errorModal = new bootstrap.Modal(
        document.getElementById("errorModal"),
      );
      errorModal.show();
      $("#errorModal").on("hidden.bs.modal", function () {
        $("#registerPassword").focus();
      });
      return;
    }
    showPremiumAlert(
      "Your account has been created!",
      "success",
      "Registration Successful",
    );
    $(this)[0].reset();
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    showPremiumAlert(
      "Account login successful!",
      "success",
      "Login Successful",
    );
    $(this)[0].reset();
  });

  $("#forgotPasswordForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#forgotEmail").val().trim();
    if (email) {
      showPremiumAlert(
        "Password reset link sent to " + email,
        "success",
        "Success!",
      );
      $(this)[0].reset();
      $("#forgotPasswordModal").modal("hide");
    } else {
      showPremiumAlert("Please enter a valid email address.", "error", "Error");
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    $("#successMsg, #errorMsg").addClass("d-none");
    const $btn = $("#submitBtn");
    const originalText = $btn.html();
    $btn
      .prop("disabled", true)
      .html('<i class="bi bi-hourglass-split me-2"></i> Sending...');

    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: $(this).serialize(),
      headers: { Accept: "application/json" },
      success: function () {
        $("#contactForm")[0].reset();
        $("#successMsg").removeClass("d-none");
      },
      error: function () {
        $("#errorMsg").removeClass("d-none");
      },
      complete: function () {
        $btn.prop("disabled", false).html(originalText);
      },
    });
  });

  $("#newsletterForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#newsletterEmail").val().trim();
    if (email) {
      $("#newsletterSuccess").removeClass("d-none");
      setTimeout(() => $("#newsletterSuccess").addClass("d-none"), 4000);
      $(this)[0].reset();
    } else {
      $("#newsletterError").removeClass("d-none");
    }
  });

  $(document).on("click", ".toggle-password", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $icon = $btn.find("i");
    const $input = $btn.siblings(".password-input");

    if ($input.attr("type") === "password") {
      $input.attr("type", "text");
      $icon.removeClass("bi-eye").addClass("bi-eye-slash");
    } else {
      $input.attr("type", "password");
      $icon.removeClass("bi-eye-slash").addClass("bi-eye");
    }
  });
});
