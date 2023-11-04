import "../style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/admin.css";
import "../style/messages.css";
import "../style/sign_up.css";
import Categories from "./pages/admin/categories/categories";
import AdminProducts from "./pages/admin/products/products";
import CartPage from "./pages/views/CartPage";

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

const container = document.getElementById("app");

router.on("/demo", function () {
  render(Demo, container);
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

// categories
router.on("/admin/categories", function () {
  render(Categories, container);
});
router.on("/admin/categories/add", function () {
  render(AddCategories, container);
});
router.on("/admin/categories/update/:id", function ({ data }) {
  render(() => UpdateCategories(data.id), container);
});

// products
router.on("/admin/products", function () {
  render(AdminProducts, container);
});
router.on("/admin/products/add", function () {
  render(AddProduct, container);
});
router.on("/admin/products/update/:id", function ({ data }) {
  render(() => UpdateProduct(data.id), container);
});

// users
router.on("/admin/users", function () {
  render(User, container);
});
router.on("/admin/users/add", function () {
  render(AddUser, container);
});
router.on("/admin/users/update/:id", function ({ data }) {
  render(() => UpdateUser(data.id), container);
});

// toppings
router.on("/admin/toppings", function () {
  render(Toppings, container);
});
router.on("/admin/toppings/add", function () {
  render(AddTopping, container);
});
router.on("/admin/toppings/update/:id", function ({ data }) {
  render(() => UpdateTopping(data.id), container);
});

router.resolve();
