import "../style.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/admin.css";
import "../style/messages.css";
import "../style/sign_up.css";
import Categories from "./pages/admin/categories/categories";
import AdminProducts from "./pages/admin/products/products";
import CartPage from "./pages/views/CartPage";
import ProductByCate from "./pages/views/products_by_category";
import Demo from "./pages/views/Demo";
import LoginPage from "./pages/views/LoginPage";
import RegisterPage from "./pages/views/RegisterPage";
import { render, router } from "./utilities/lib";
import AddProduct from "./pages/admin/products/add_product";
import User from "./pages/admin/user/user";
import AddUser from "./pages/admin/user/add_user";
import UpdateUser from "./pages/admin/user/update_users";
import AddCategories from "./pages/admin/categories/add_categories";
import UpdateCategories from "./pages/admin/categories/update_categories";
import Toppings from "./pages/admin/topping/topping";
import AddTopping from "./pages/admin/topping/add_toppings";
import UpdateTopping from "./pages/admin/topping/update_topping";
import UpdateProduct from "./pages/admin/products/update_products";
import AdminLayout from "./pages/admin/admin_layout";
import HomePage from "./pages/views/homePage";
import ProductDetail from "./pages/views/product_detail";

const container = document.getElementById("app");

router.on("/", function () {
  render(HomePage, container);
});
router.on("/demo", function () {
  render(Demo, container);
});
router.on("/login", function () {
  render(LoginPage, container);
});
router.on("/register", function () {
  render(RegisterPage, container);
});

router.on("/demo", function () {
  render(Demo, container);
});
router.on("/", function () {
  render(HomePage, container);
});

router.on("/product/:id", function ({ data }) {
  render(() => ProductDetail(data.id), container);
});
router.on("/product", function ({ queryString }) {
  render(() => ProductByCate(queryString), container);
});
router.on("/login", function () {
  render(LoginPage, container);
});
router.on("/register", function () {
  render(RegisterPage, container);
});
router.on("/cart", function () {
  render(CartPage, container);
});
router.on("/product/:id", function ({ data }) {
  render(() => ProductDetail(data.id), container);
});

// categories
router.on("/admin/categories", function () {
  render(() => AdminLayout(Categories), container);
});
router.on("/admin/categories/add", function () {
  render(() => AdminLayout(AddCategories), container);
});
router.on("/admin/categories/update/:id", function ({ data }) {
  render(() => AdminLayout(() => UpdateCategories(data.id)), container);
});

//admin products
router.on("/admin/products", function () {
  render(() => AdminLayout(AdminProducts), container);
});
router.on("/admin/products/add", function () {
  render(() => AdminLayout(AddProduct), container);
});
router.on("/admin/products/update/:slug", function ({ data }) {
  render(() => AdminLayout(() => UpdateProduct(data.slug)), container);
});

//admin users
router.on("/admin/users", function () {
  render(() => AdminLayout(User), container);
});
router.on("/admin/users/add", function () {
  render(() => AdminLayout(AddUser), container);
});
router.on("/admin/users/update/:id", function ({ data }) {
  render(() => AdminLayout(() => UpdateUser(data.id)), container);
});

// admin toppings
router.on("/admin/toppings", function () {
  render(() => AdminLayout(Toppings), container);
});
router.on("/admin/toppings/add", function () {
  render(() => AdminLayout(AddTopping), container);
});
router.on("/admin/toppings/update/:id", function ({ data }) {
  render(() => AdminLayout(() => UpdateTopping(data.id)), container);
});

router.resolve();
