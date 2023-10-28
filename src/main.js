import '../style.css'
import '../style/messages.css'
import '../style/sign_up.css'
import CartPage from './pages/views/CartPage';

import Demo from './pages/views/Demo';
import LoginPage from './pages/views/LoginPage';
import RegisterPage from './pages/views/RegisterPage';
import { render, router } from './utilities/lib'

const container = document.getElementById('app');


router.on('/demo', function () {
  render( Demo, container);
});
router.on('/login', function () {
  render( LoginPage, container);
});
router.on('/register', function () {
  render( RegisterPage, container);
});
router.on('/cart', function () {
  render( CartPage, container);
});

// categories
router.on('/admin/categories', function () {
  render( CartPage, container);
});
router.on('/admin/categories', function () {
  render( CartPage, container);
});
router.on('/admin/categories', function () {
  render( CartPage, container);
});

// products
router.on('/admin/products', function () {
  render( CartPage, container);
});
router.on('/admin/products', function () {
  render( CartPage, container);
});
router.on('/admin/products', function () {
  render( CartPage, container);
});

// users
router.on('/admin/users', function () {
  render( CartPage, container);
});
router.on('/admin/users', function () {
  render( CartPage, container);
});
router.on('/admin/users', function () {
  render( CartPage, container);
});

// toppings
router.on('/admin/toppings', function () {
  render( CartPage, container);
});
router.on('/admin/toppings', function () {
  render( CartPage, container);
});
router.on('/admin/toppings', function () {
  render( CartPage, container);
});














router.resolve();
