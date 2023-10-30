import { useEffect } from "../utilities/lib";

// component header
const Header = (action = false) => {
    
    useEffect(() => {
        //fetch categories

    }, [])
    

    useEffect(() => {
        // header
        if(action) {
            window.onscroll = () => {
                if (window.scrollY > 0) {
                    document.querySelector("#nav").classList.add("fixed");
                } else {
                    document.querySelector("#nav").classList.remove("fixed");
                }
            };
        }
    });
return /*html*/ `
    <a href="tel:+84962013495" class="delivery">
        <img src="../../public/images/views/delivery.png" alt="" />
    </a>
    <div id="header">
        <section id="nav" class="${action ? '' : 'fixed'}">
            <a id="header_logo" href="/">
                <img src="../../public/images/views/logo.png" alt="" />
            </a>
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
                        <li><a href="Order.html">TOCOTOCO KEM TRÀ SỮA</a></li>
                        <li><a href="Order.html">TOCOTOCO KEM CAFE</a></li>
                        <li><a href="Order.html">INSTANT MILKTEA</a></li>
                    </ul>
                </li>
                <li>
                    <a href="Instant_milktea.html" class="navbar__link">Sản phẩm
                        <i class="fa-sharp fa-solid fa-chevron-down"></i></a>
                    <ul class="sub-menu">
                        <li><a href="Order.html">TOCOTOCO KEM TRÀ SỮA</a></li>
                        <li><a href="Order.html">TOCOTOCO KEM CAFE</a></li>
                        <li><a href="Order.html">INSTANT MILKTEA</a></li>
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
                <li class="center">
                    <a href="TuyenDung.html" class="navbar__link">Tuyển dụng</a>
                </li>
            </ul>
            <div class="btn-search">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <label for="toggler" id="modal" class="fas fa-bars"></label>
        </section>
    </div>
  `;
};

export default Header;
