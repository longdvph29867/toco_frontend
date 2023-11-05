import { useEffect } from "../utilities/lib";

const Slider = () => {
  useEffect(() => {
    // slider
    // let isToggle = false;
    function update() {
      window.requestAnimationFrame(update);
      let carousel_inner = document.querySelector(".carousel-inner");
      let height_slide = document.querySelectorAll(".slide")[1].offsetHeight;
      carousel_inner.style.height = height_slide + "px";
    }

    update();
    // Slide tiếp theo
    function slideNext() {
      let lists = document.querySelectorAll(".slide");
      document.getElementById("carousel-inner").appendChild(lists[0]);
    }
    // SLide trước đó
    function slidePrev() {
      let lists = document.querySelectorAll(".slide");
      console.log("🚀 ~ file: Slider.js:24 ~ slidePrev ~ lists:", lists)
      document
        .getElementById("carousel-inner")
        .prepend(lists[lists.length - 1]);
    }
    // Slide tự động chạy
    let autoShow = setInterval(slideNext, 3500);
    // Button slide
    document.getElementById("btn-next").addEventListener("click", () => {
      slideNext();
      // Reset Interval - Nếu mở slide tự động chạy ở trên thì phải bỏ comment của 2 dòng dưới
      clearInterval(autoShow);
      autoShow = setInterval(slideNext, 3500);
    });
    // Button slide
    document.getElementById("btn-prev").addEventListener("click", () => {
      slidePrev();
      // Reset Interval - Nếu mở slide tự động chạy ở trên thì phải bỏ comment của 2 dòng dưới
      clearInterval(autoShow);
      autoShow = setInterval(slideNext, 3500);
    });
  }, []);
  return /*html*/ `
  <!-- Slider start -->
  <div class="carousel-slider">
  <div class="carousel-inner" id="carousel-inner">
    <div class="slide">
      <div class="bg-slide"></div>
      <!-- <img src="/images/views/" alt=""> -->
      <img src="/images/views/home_3.jpg" alt="" class="slide-image" />
      <div class="slide-content">
      <!-- Mấy cái nut đặt hàng này dẫn đến trang Order -->
      <a href="Order.html" class="order-now">Đặt hàng ngay</a>
      <div class="scroll-icon"></div>
      <div class="btn-scroll">Cuộn xuống</div>
      </div>
      </div>
      <div class="slide">
          <div class="bg-slide"></div>
          <img src="/images/views/home.jpg" alt="" class="slide-image" />
          <div class="slide-content">
              <a href="Order.html" class="order-now">Đặt hàng ngay</a>
              <div class="scroll-icon"></div>
              <div class="btn-scroll">Cuộn xuống</div>
          </div>
      </div>
      <div class="slide">
          <div class="bg-slide"></div>
          <img src="/images/views/home_2.jpg" alt="" class="slide-image" />
          <div class="slide-content">
              <a href="Order.html" class="order-now">Đặt hàng ngay</a>
              <div class="scroll-icon"></div>
              <div class="btn-scroll">Cuộn xuống</div>
          </div>
      </div>
  </div>
  <div class="carousel-button carousel-button-prev" id="btn-prev">
      <i class="fa-sharp fa-solid fa-chevron-left"></i>
  </div>
  <div class="carousel-button carousel-button-next" id="btn-next">
      <i class="fa-sharp fa-solid fa-chevron-right"></i>
  </div>
</div>
<!-- Slider end -->
    `;
};

export default Slider;
