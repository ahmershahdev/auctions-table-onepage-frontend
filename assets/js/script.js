$(document).ready(function () {
  $('body').css('overflow', 'hidden');

  $(window).on('load', function () {
    $('#preloader').fadeOut(500, function () {
      $('body').css('overflow', 'auto');
      countUp();
    });
  });

  setTimeout(function () {
    $('#preloader').fadeOut(500, function () {
      $('body').css('overflow', 'auto');
      countUp();
    });
  }, 2000);


  function countUp() {
    $('.counter').each(function () {
      const target = parseInt($(this).data('target'));
      const $el = $(this);
      let current = 0;
      const increment = target / 30;

      const interval = setInterval(function () {
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
    'Rare Collectibles & Fine Art',
    'Luxury Watches & Jewelry',
    'Vintage Cars & Electronics',
    'Real-Time Secure Bidding',
    'Trusted by 50,000+ Buyers'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = typingTexts[textIndex];
    const $el = $('#typingText');

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

  $('.filter-btn').on('click', function () {
    const filterValue = $(this).data('filter');

    $('.filter-btn').removeClass('active btn-primary').addClass('btn-outline-light');
    $(this).removeClass('btn-outline-light').addClass('active btn-primary');

    if (filterValue === 'all') {
      $('.auction-item').show();
    } else {
      $('.auction-item').each(function () {
        if ($(this).data('category') === filterValue) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });

  function updateTimer() {
    $('.auction-timer').each(function () {
      const $timer = $(this);
      let h = parseInt($timer.data('hours')) || 0;
      let m = parseInt($timer.data('minutes')) || 0;
      let s = parseInt($timer.data('seconds')) || 0;

      if (s > 0) {
        s--;
      } else if (m > 0) {
        m--;
        s = 59;
      } else if (h > 0) {
        h--;
        m = 59;
        s = 59;
      }

      $timer.data('hours', h).data('minutes', m).data('seconds', s);

      const pad = (num) => String(num).padStart(2, '0');
      $timer.text(pad(h) + ':' + pad(m) + ':' + pad(s));
    });
  }

  setInterval(updateTimer, 1000);

  $('.wishlist-btn').on('click', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $icon = $btn.find('i');

    $btn.toggleClass('liked');

    if ($btn.hasClass('liked')) {
      $icon.removeClass('bi-heart').addClass('bi-heart-fill');
    } else {
      $icon.removeClass('bi-heart-fill').addClass('bi-heart');
    }
  });

  $('#itemModal').on('show.bs.modal', function (e) {
    const $btn = $(e.relatedTarget);

    const title = $btn.data('title');
    const img = $btn.data('img');
    const bid = $btn.data('bid');
    const desc = $btn.data('desc');

    $('#itemModalLabel').text(title);
    $('#modalTitle').text(title);
    $('#modalImg').attr('src', img).attr('alt', title);
    $('#modalBid').text(bid);
    $('#modalDesc').text(desc);
  });


  const sections = $('section[id]');
  
  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop() + 120;
    
    sections.each(function () {
      const $sec = $(this);
      const top = $sec.offset().top;
      const bottom = top + $sec.outerHeight();
      const id = $sec.attr('id');

      if (scrollPos >= top && scrollPos < bottom) {
        $('#navbarNav .nav-link').removeClass('active');
        $('#navbarNav .nav-link[href="#' + id + '"]').addClass('active');

        $('#mobileMenu .nav-link').removeClass('active');
        $('#mobileMenu .nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });


  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > 400) {
      $('#scrollTopBtn').addClass('visible');
    } else {
      $('#scrollTopBtn').removeClass('visible');
    }
  });

  $('#scrollTopBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });


  $(window).on('scroll', function () {
    const scroll = $(this).scrollTop();
    if (scroll < $(window).height()) {
      $('.hero-overlay .container').css('opacity', 1 - (scroll * 0.001));
    }
  });


  $('.offcanvas-login-btn').on('click', function (e) {
    e.preventDefault();
    const offcanvasElement = document.getElementById('mobileMenu');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });

});
