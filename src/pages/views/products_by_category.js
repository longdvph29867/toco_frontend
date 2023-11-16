import "../../../style/product.css";
import "../../../style/trangchu.css";
import { useState, useEffect, showSpinner } from "../../utilities/lib";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import OutstandingPro from "../../components/outstanding_pro";

const ProductByCate = (queryString) => {
  console.log(queryString);
  const [, query] = queryString.split("=");
  console.log(query);
  let [books, setBook] = useState([]);
  let [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://toco-backend.vercel.app/categories")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setCategories(data.data);
      });
    fetch(`https://toco-backend.vercel.app/products?category=${query}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setBook(data.data);
      });
  }, []);
  console.log(books);
  console.log(categories);

  return /*html*/ ` 
    ${Header()}
    <main class="container">
    <div style="display:flex; gap:20px;padding-top: 100px;">
        <div class="box-left-cate">
            <div class="title-cate">
                <h2>Danh mục</h2>
            </div>
            <ul class="list-cate">
                <li class="item-cate">
                    <a  href="">Món nổi bật <span>20</span></a>
                </li>
                ${categories
                  .map(function (item) {
                    return /*html*/ `   <li class="item-cate">
                   <a  href="">${item.categoryName}<span>${item.productCount}</span></a>
               </li>`;
                  })
                  .join("")}
            </ul>
        </div>
        <div class="cardList">
        ${books
          .slice(0, 8)
          .map(function (book) {
            return OutstandingPro(book);
          })
          .join("")}
      </div>
    </div>
</main>
    ${Footer()}
    ${Spinner()}
    `;
};
export default ProductByCate;
