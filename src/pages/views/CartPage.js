import { cartService } from "../../service/viewsService"
import { showMesssage, useEffect, useState } from "../../utilities/lib"
import '../../../style/cart.css'
import { localUserService } from "../../service/localService"
export default function CartPage() {
  const [listCarts, setListCarts] = useState([])
  useEffect( () => {
    const { account } = localUserService.get()
    cartService.getCartByAccount(account)
    .then((res) => {
      // console.log(res.data);
      setListCarts(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  

  return /*html*/`
    <div class="cart-container">
      <div class="cart-header">
        <div class="cart-content">
          <div class="cart-item cart-item-img">
            Hình ảnh
          </div>
          <div class="cart-item cart-item-name">
            Tên sản phẩm
          </div>
          <div class="cart-item cart-item-topping">
            Topping
          </div>
          <div class="cart-item cart-item-price">
            Giá tiền
          </div>
          <div class="cart-item cart-item-quantity">
            Số lượng
          </div>
          <div class="cart-item cart-item-total">
            Số tiền
          </div>
          <div class="cart-item cart-item-action">
            Thao tác
          </div>
        </div>
      </div>
      <div class="cart-list">
        ${listCarts.map(item => {
          const totalTopping = item.id_topping.reduce((total, item) => total + item.toppingPrice, 0) * item.quantity
          const itemTotalPrice = (item.id_product.sale_price * item.quantity) + totalTopping

          return /*html*/`
          <div class="cart-content">
            <div class="cart-item cart-item-img">
              <img src="${item.id_product.images[0]}" alt="" />
            </div>
            <div class="cart-item cart-item-name">
              <p>${item.id_product.productName}</p>
            </div>
            <div class="cart-item cart-item-topping">
              ${item.id_topping.map(item => `${item.toppingName}(${item.toppingPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})})`).join(", ")}
            </div>
            <div class="cart-item cart-item-price">
              <span>${item.id_product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
              <span>${item.id_product.sale_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
            </div>
            <div class="cart-item cart-item-quantity">
              <button>-</button>
              <input type="text" value="${item.quantity}"/>
              <button>+</button>
            </div>
            <div class="cart-item cart-item-total">
              <span>${itemTotalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
            </div>
            <div class="cart-item cart-item-action">
              <button>Xoá</button>
            </div>
          </div>
          `
        }).join('')}
      </div>
    </div>
  `
}
