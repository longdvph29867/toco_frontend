import { cartService } from "../../service/viewsService";
import {
  convertVND,
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../utilities/lib";
import "../../../style/cart.css";
import { localUserService } from "../../service/localService";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import Footer from "../../components/footer";
export default function CartPage() {
  const [listCarts, setListCarts] = useState([]);

  const fetchData = () => {
    const { account } = localUserService.get();
    cartService
      .getCartByAccount(account)
      .then((res) => {
        // console.log(res.data);
        setListCarts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const { account } = localUserService.get();
    showSpinner(true);
    cartService
      .getCartByAccount(account)
      .then((res) => {
        // console.log(res.data);
        showSpinner(false);
        setListCarts(res.data.data);
      })
      .catch((err) => {
        showSpinner(false);
        console.log(err);
      });
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const data = {
      quantity: Number(newQuantity),
    };
    cartService
      .putCart(id, data)
      .then((res) => {
        // console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const preBtns = document.querySelectorAll(".pre-quantity");
    const nextBtns = document.querySelectorAll(".next-quantity");
    const deleteBtns = document.querySelectorAll(".bnt-delete-cart");
    const inputQuantitys = document.querySelectorAll(".input-quantity");
    inputQuantitys.forEach((item) => {
      item.addEventListener("input", function () {
        const quantity = item.value * 1;
        const idCart = item.dataset.id;
        updateQuantity(idCart, quantity);
      });
    });

    preBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const idCart = btn.dataset.id;
        const isQuantity = btn.dataset.quantity * 1;
        updateQuantity(idCart, isQuantity - 1);
      });
    });
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const idCart = btn.dataset.id;
        const isQuantity = btn.dataset.quantity * 1;
        updateQuantity(idCart, isQuantity + 1);
      });
    });
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const idCart = btn.dataset.id;
        cartService
          .deleteCart(idCart)
          .then((res) => {
            // console.log(res);
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }, [listCarts]);

  return /*html*/ `
    ${Header()}
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
          <div class="cart-item cart-item-quantity cart-item-quantity-thead">
            Số lượng
          </div>
          <div class="cart-item cart-item-total">
            Số tiền
          </div>
          <div class="cart-item cart-item-action cart-item-action-thead">
            Thao tác
          </div>
        </div>
      </div>
      <div class="cart-list">
        ${listCarts
          .map((item) => {
            const totalTopping =
              item.id_topping.reduce(
                (total, item) => total + item.toppingPrice,
                0
              ) * item.quantity;
            const itemTotalPrice =
              item.id_product.sale_price * item.quantity + totalTopping;

            return /*html*/ `
          <div class="cart-content">
            <div class="cart-item cart-item-img">
              <a href="/product/${item.id_product.slug}">
                <img src="${item.id_product.images[0]}" alt="" />
              </a>
            </div>
            <div class="cart-item cart-item-name">
              <p>${item.id_product.productName}</p>
            </div>
            <div class="cart-item cart-item-topping">
              ${item.id_topping
                .map(
                  (item) =>
                    `${item.toppingName}(${convertVND(item.toppingPrice)})`
                )
                .join(", <br>")}
            </div>
            <div class="cart-item cart-item-price">
              <span>${convertVND(item.id_product.price)}</span>
              <span>${convertVND(item.id_product.sale_price)}</span>
            </div>
            <div class="cart-item cart-item-quantity">
              <button data-id="${item._id}" data-quantity="${
              item.quantity
            }" class="pre-quantity">-</button>
              <input data-id="${item._id}" type="number" value="${
              item.quantity
            }" class="input-quantity"/>
              <button data-id="${item._id}" data-quantity="${
              item.quantity
            }" class="next-quantity">+</button>
            </div>
            <div class="cart-item cart-item-total">
              <span>${convertVND(itemTotalPrice)}</span>
            </div>
            <div class="cart-item cart-item-action">
              <button data-id="${item._id}" class="bnt-delete-cart">Xoá</button>
            </div>
          </div>
          `;
          })
          .join("")}
      </div>
      <div class="btn-order-cart">
        <button class="btn-show-more">Đặt hàng</button>
      </div>
    </div>
  ${Footer()}
  ${Spinner()}
  `;
}
