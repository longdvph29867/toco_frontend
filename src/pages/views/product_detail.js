import "../../../style/product-detail.css";
import {
  useState,
  useEffect,
  showSpinner,
  router,
  showMesssage,
  convertVND,
} from "../../utilities/lib";
import BestSelling from "../../components/detail/best_selling";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import { localUserService } from "../../service/localService";
import { cartService } from "../../service/viewsService";
import ItemTopping from "../../components/ItemTopping";
import Comments from "../../components/detail/Comments";

const ProductDetail = (slug) => {
  const [product, setProduct] = useState({});
  const [topping, setTopping] = useState([]);
  useEffect(function () {
    showSpinner(true);
    fetch("https://toco-backend.vercel.app/products/" + slug)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        showSpinner(false);
        setProduct(data.data);
      });

    showSpinner(true);
    fetch("https://toco-backend.vercel.app/toppings")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        // showSpinner(false)
        setTopping(data.data);
      });
  }, []);

  useEffect(() => {
    const btnPre = document.querySelector(".btn-pre");
    const btnNext = document.querySelector(".btn-next");
    const inputQuantity = document.getElementById("detail-quantity");
    const btnBuy = document.getElementById("btn-buy");
    btnPre.addEventListener("click", () => {
      if (Number(inputQuantity.value) === 1) {
        return;
      }
      inputQuantity.value = Number(inputQuantity.value) - 1;
    });
    btnNext.addEventListener("click", () => {
      inputQuantity.value = Number(inputQuantity.value) + 1;
    });

    btnBuy.addEventListener("click", () => {
      if (!localUserService.get().account) {
        showMesssage(false, "Vui lòng đăng nhập!");
        return;
      }
      let listTopping = [];
      const inputTopping = document.querySelectorAll('input[name="topping"]');
      for (let item of inputTopping) {
        if (item.checked) {
          listTopping.push(item.value);
        }
      }
      const newData = {
        account: localUserService.get().account,
        id_product: product._id,
        quantity: Number(inputQuantity.value),
        id_topping: listTopping,
      };
      cartService
        .addToCart(newData)
        .then((res) => {
          router.navigate("/cart");
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  return /*html*/ ` 
    ${Header()}
    <div id="product-detail-page">
        <main class="container">
            <div class="product-detail">
                <div class="img-product-detail">
                    <img src="${product.images?.[0]}" alt="">
                </div>
                <div class="info-product">
                    <div class="name-product">
                        <h1>${product.productName}</h1>
                    </div>
                    <div class="price-product">
                        <p>${convertVND(product.sale_price)}</p>
                    </div>
                    
                    <div>
                        <p class="title-option">Thêm Topping:</p>
                        <div class="add-topping">
                            ${topping
                              .map((topping) => {
                                return ItemTopping(topping);
                              })
                              .join("")}
                        </div>
                    </div>
                    <div>
                        <div class="quantity">
                            <span class="title-option">Số lượng :</span>
                            <button class="btn-pre"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" value="1" id="detail-quantity">
                            <button class="btn-next"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="buy-now">
                        <button id="btn-buy">Mua ngay</button>
                    </div>
                </div>
            </div>
            <div class="product-detail-bottom">
                <div class="box-left-bot">
                    <div class="description">
                        <h3>Mo ta</h3>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div>
                        ${Comments(product._id)}
                    </div>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>
                <div class="box-right-bot">
                    <div class="best-sale">
                        <h2>Sản phẩm bán chạy</h2>
                        <ul class="list-product-sale">
                        ${BestSelling()}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
    ${Footer()}
    ${Spinner()}
    `;
};
export default ProductDetail;
