import '../../style/itemTopping.css'
import { convertVND } from '../utilities/lib'

export default function ItemTopping(topping) {
  return /*html*/`
  <div class="content-item-topping">
    <label>
        <input type="checkbox" name="topping" value="${topping._id}">
        <div class="item-topping item-topping-active">
            <span>${topping.toppingName} (+${convertVND(topping.toppingPrice)})</span>
            <div class="item-topping-icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>
        </div>
    </label>
  </div>
  `
}
