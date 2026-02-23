$(document).ready(function () {
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
