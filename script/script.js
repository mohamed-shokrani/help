// slide show script 
var sw = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// end of slide show script 
$(document).ready(function() {
  $(".menu-toggle").click(function() {
      $("search-box").toggleClass("search-box");
      $(".menu-toggle").toggleClass("active");
      $("nav").toggleClass("active");
  });
});