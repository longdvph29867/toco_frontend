import '../style.css'
import '../style/messages.css'
import Demo from './pages/views/Demo';
import HomePage from './pages/views/homePage';
import ProductDetail from './pages/views/product_detail';
import { render, router } from './utilities/lib'

const container = document.getElementById('app');


router.on('/demo', function () {
  render( Demo, container);
});
router.on('/', function () {
  render( HomePage, container);
});
router.on('/product/:id', function ({data}) {
  render( ()=>ProductDetail(data.id), container);
});














router.resolve();
