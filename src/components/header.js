import { localUserService } from "@/service/localService";
import { useEffect, useState } from "../utilities/lib";

// component header
const Header = (action = false) => {
  let [categories, setCategories] = useState([]);

  let [products, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://toco-backend.vercel.app/categories")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setCategories(data.data);
      });
    fetch("https://toco-backend.vercel.app/products?category=instant-milk-tea")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setProduct(data.data);
      });
  }, []);
  useEffect(() => {
    // header
    if (action) {
      if (window.scrollY > 0) {
        document.querySelector("#nav").classList.add("fixed");
      }
      window.onscroll = () => {
        if (window.scrollY > 0) {
          document.querySelector("#nav").classList.add("fixed");
        } else {
          document.querySelector("#nav").classList.remove("fixed");
        }
      };
    }
    useEffect(() => {
      const logOut_btn = document.querySelector("#logout");
      logOut_btn.addEventListener("click", () => {
        localUserService.remove();
        location.href = "/";
      });
    });

    const btnMenuMoblie = document.getElementById("modal");
    btnMenuMoblie.addEventListener("click", function () {
      document
        .querySelector(".header-right")
        .classList.toggle("showMenumobile");
    });
  });
  return /*html*/ `
    <a href="tel:+84962013495" class="delivery">
      <img src="/images/views/delivery.png" alt="" />
    </a>
    <div id="header">
      <section id="nav" class="${action ? "" : "fixed"}">
        <a id="header_logo" href="/">
          <img src="/images/views/logo.png" alt="" />
        </a>
        <div class="header-right">
          <ul class="main-menu" id="header__navbar-modal">
            <li class="center">
              <a href="/" class="navbar__link">Trang chủ</a>
            </li>
            <li>
              <a href="#" class="navbar__link">Giới
                thiệu <i class="fa-sharp fa-solid fa-chevron-down"></i></a>
              <ul class="sub-menu">
                <li>
                  <a href="#">Lịch sử và sứ mệnh</a>
                </li>
                <li>
                  <a href="#">Thành tựu đạt
                    được</a>
                </li>
              </ul>
            </li>
            <li>
                <a href="Instant_milktea.html" class="navbar__link">Danh mục
                  <i class="fa-sharp fa-solid fa-chevron-down"></i></a>
                <ul class="sub-menu">
                ${categories.map((item) => {
                  return /*html*/ `
                    <li>
                      <a href="/product?category=${item.categorySlug}">${item.categoryName}</a>
                    </li>
                  `;
                })}
                </ul>
            </li>
            <li>
              <a href="TinTuc.html" class="navbar__link">Tin tức <i
                class="fa-sharp fa-solid fa-chevron-down"></i></a>
              <ul class="sub-menu">
                <li><a href="TinTuc_TTKM.html">Tin tức khuyến mãi</a>
                </li>
                <li><a href="TinTuc_CCTH.html">Câu chuyện thương
                  hiệu</a></li>
                <li><a href="TinTuc_SK.html">Sự kiện</a></li>
              </ul>
            </li>
            <li class="center">
              <a href="CuaHang.html" class="navbar__link">Cửa hàng</a>
            </li>
            <li class="login-container">
            ${
              localUserService.get()
                ? `<div>
            <img class="img-user" src="https://toco-production-v1.firebaseapp.com/assets/icons/logo_icon.png">
            
          </div>
          <span class="sigout" id="logout">Đăng xuất</span>`
                : `<a href="/login">Đăng nhập</a>
            <a href="/register">Đăng ký</a>`
            }
                
                
            </li>
          </ul>

          <div class="btn-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <label id="modal" class="fas fa-bars"></label>
        </div>
      </section>
    </div>
  `;
};

export default Header;
