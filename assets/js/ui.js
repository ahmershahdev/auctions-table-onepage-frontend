$(document).ready(function () {
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
});
