export default function AdminLayout(component) {
  return `
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <div>
        <p class="app-sidebar__user-name"><b>Võ Trường</b></p>
        <p class="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li><a class="app-menu__item " href="index.html"><i class='app-menu__icon bx bx-tachometer'></i><span
            class="app-menu__label">Bảng điều khiển</span></a></li>
      <li><a class="app-menu__item " href="table-data-table.html"><i class='app-menu__icon bx bx-id-card'></i>
          <span class="app-menu__label">Quản lý danh mục</span></a></li>
      <li><a class="app-menu__item " href="#"><i class='app-menu__icon bx bx-user-voice'></i><span
            class="app-menu__label">Quản lý tài khoản</span></a></li>
      <li><a class="app-menu__item" href="table-data-product.html"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý sản phẩm</span></a>
      </li>
      <li><a class="app-menu__item" href="table-data-product.html"><i
            class='app-menu__icon bx bx-purchase-tag-alt'></i><span class="app-menu__label">Quản lý Toppings</span></a>
      </li>
    </ul>
  </aside>
    ${component()}
    `;
}
