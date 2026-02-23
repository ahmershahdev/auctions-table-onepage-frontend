$(document).ready(function () {
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
  window.countUp = countUp;

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
          $("html, body").animate(
            { scrollTop: $("#bid").offset().top - 80 },
            600,
            "swing",
          );
      }, 400);
    },
  );

  $("#loginModal").on("hidden.bs.modal", function () {
    $("#loginBtn, #mobileMenu .nav-link[href='#login']").first().focus();
  });

  $("#itemModal").on("hidden.bs.modal", function () {});

  $("#loginBtn").on("click", () => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(
      document.getElementById("mobileMenu"),
    );
    if (offcanvasInstance) offcanvasInstance.hide();
  });

  $("#increaseBtn, #decreaseBtn").on("click", function (e) {
    e.preventDefault();
    const $input = $("#bidAmount");
    let value = parseInt($input.val()) || 100;
    const isIncrease = $(this).attr("id") === "increaseBtn";
    value = isIncrease
      ? Math.min(value + 1, 1000000)
      : Math.max(value - 1, 100);
    $input.val(value);
  });

  $("#bidAmount").on("change", function () {
    let value = parseInt($(this).val()) || 100;
    $(this).val(Math.min(Math.max(value, 100), 1000000));
  });

  $("#bidBtn").on("click", function () {
    setTimeout(
      () =>
        $("html, body").animate(
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
});
