import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "../../utilities/lib";
import Spinner from "@/components/spinner";

export default function AdminLayout(component) {
  useEffect(() => {
    const dir = window.location.href;
    const app_menu__item = document.querySelectorAll(".app-menu__item");
    app_menu__item.forEach((menu_item) => {
      if (dir.includes(menu_item)) {
        menu_item.classList.add("active");
      }
    });
  });

  useEffect(() => {
    document
      .querySelector(".app-sidebar__toggle")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const appElement = document.querySelector(".app");
        if (appElement.classList.contains("sidenav-toggled")) {
          appElement.classList.remove("sidenav-toggled");
        } else {
          appElement.classList.add("sidenav-toggled");
        }
        // appElement.classList.toggle('sidenav-toggled')
      });
    const treeviewElements = document.querySelectorAll(
      '[data-toggle="treeview"]'
    );
    treeviewElements.forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.preventDefault();

        // Kiểm tra xem phần tử cha của nó có lớp 'is-expanded' không, nếu không thì loại bỏ lớp này ở tất cả các phần tử khác
        if (!element.parentElement.classList.contains("is-expanded")) {
          const allTreeviewElements = document.querySelectorAll(
            '[data-toggle="treeview"]'
          );
          allTreeviewElements.forEach(function (item) {
            item.parentElement.classList.remove("is-expanded");
          });
        }

        // Toggle lớp 'is-expanded' cho phần tử cha của phần tử được nhấp
        element.parentElement.classList.toggle("is-expanded");
      });
    });

    // Đặt lớp 'is-expanded' cho phần tử có thuộc tính data-toggle="treeview" và lớp 'is-expanded' mặc định
    const initialExpandedElements = document.querySelectorAll(
      '[data-toggle="treeview"].is-expanded'
    );
    initialExpandedElements.forEach(function (element) {
      element.parentElement.classList.add("is-expanded");
    });

    const tooltipElements = document.querySelectorAll(
      '[data-toggle="tooltip"]'
    );
    tooltipElements.forEach(function (element) {
      const tooltip = new bootstrap.Tooltip(element);
    });
  });
  return `
  
  <div class="app sidebar-mini rtl">
  <header class="app-header">
  <!-- Sidebar toggle button--><p class="app-sidebar__toggle" data-toggle="sidebar"
    aria-label="Hide Sidebar"></p>
  <!-- Navbar Right Menu-->
  <ul class="app-nav">


    <!-- User Menu-->
    <li><a classgit ="app-nav__item" href="/index.html"><i class="fa-solid fa-right-from-bracket"></i> </a>

    </li>
  </ul>
</header>

<aside class="app-sidebar">
  <div class="app-sidebar__user">
    <div>
      <img width="150px" src="https://tocotocotea.com.vn/wp-content/uploads/2021/04/Logo-ngang-01.png">
    </div>
  </div>
  <hr>
  <ul class="app-menu">
    <li><a class="app-menu__item" href="/admin/categories"><i class="app-menu__icon fa-regular fa-rectangle-list"></i>
        <span class="app-menu__label">Quản lý danh mục</span></a></li>
    <li><a class="app-menu__item " href="/admin/users" ><i class="app-menu__icon fa-regular fa-id-card"></i><span
          class="app-menu__label" >Quản lý tài khoản</span></a></li>
    <li><a class="app-menu__item" href="/admin/products">
        <i class="app-menu__icon fa-solid fa-boxes-packing"></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
    </li>
    <li><a class="app-menu__item" href="/admin/toppings"><i 
    class="app-menu__icon fa-solid fa-ice-cream"></i><span class="app-menu__label">Quản lý Toppings</span></a>
    </li>
  </ul>
</aside>
  ${component()}
  </div>
  ${Spinner()}
    `;
}
