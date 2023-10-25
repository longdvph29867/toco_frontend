import '../style.css'
import '../style/messages.css'
import Demo from './pages/views/Demo';
import { render, router } from './utilities/lib'

const container = document.getElementById('app');


router.on('/demo', function () {
  render( Demo, container);
});














router.resolve();
