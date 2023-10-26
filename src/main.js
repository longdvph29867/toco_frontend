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














router.resolve();
