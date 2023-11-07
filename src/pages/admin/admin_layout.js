import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "../../utilities/lib";

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
  return `
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <div>
        <img width="150px" src="https://tocotocotea.com.vn/wp-content/uploads/2021/04/Logo-ngang-01.png">
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li><a class="app-menu__item" href="/admin/dasboard"><i class="app-menu__icon fa-solid fa-chart-line"></i><span
            class="app-menu__label">Bảng điều khiển</span></a></li>
      <li><a class="app-menu__item" href="/admin/categories"><i class='app-menu__icon bx bx-id-card'></i>
          <span class="app-menu__label">Quản lý danh mục</span></a></li>
      <li><a class="app-menu__item " href="/admin/users" ><i class="fa-regular fa-id-card"></i><span
            class="app-menu__label" >Quản lý tài khoản</span></a></li>
      <li><a class="app-menu__item" href="/admin/products"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item" href="/admin/toppings"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý Toppings</span></a>
      </li>
    </ul>
  </aside>
    ${component()}
    `;
}
