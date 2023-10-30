import "../../../style/product-detail.css"
import {useState, useEffect} from '../../utilities/lib'
import BestSelling from "../components/detail/best_selling";
import Footer from "../components/footer";
import Header from "../components/header";

const ProductDetail = (slug) => {
    const [book,setBook]=useState({})
    const [topping,setTopping]=useState([])
    useEffect(function() {
       
        fetch('https://toco-backend.vercel.app/products/'+slug)
        .then(function(res){
          return res.json()
        })
        .then(function(data){
          setBook(data.data)
        })
        fetch('https://toco-backend.vercel.app/toppings')
        .then(function(res){
          return res.json()
        })
        .then(function(data){
            setTopping(data.data)
        })
        
        
    }, [])
    console.log(book);
    console.log(topping);
   
    return /*html*/` 
    ${Header()}
        <main class="container">
            <div class="product-detail">
                <div class="img-product-detail">
                    <img src="${book.images?.[0]}" alt="">
                </div>
                <div class="info-product">
                    <div class="name-product">
                        <h1>${book.productName}</h1>
                    </div>
                    <div class="price-product">
                        <p>${book.price}đ</p>
                    </div>
                    <div class="option-inline">
                        <div class="option-item">
                            <p class="title-option">Chọn loại</p>
                            <label>
                                <input name="ice" type="radio">
                                Không lạnh
                            </label>
                            <label>
                                <input name="ice" type="radio">
                                Có lạnh
                            </label>
                        </div>
                        <div class="option-item">
                            <p class="title-option">Chọn size</p>
                            <label>
                                <input name="size" type="radio">
                                M
                            </label>
                            <label>
                                <input name="size" type="radio">
                                L
                            </label>
                        </div>
                    </div>
                    <div>
                        <p class="title-option">Thêm Topping</p>
                        <div class="add-topping">
                        ${topping.map((topping) => {
                            return /*html*/`
                            <div class="item-topping">
                                <label>
                                    <input name="topping" type="checkbox">
                                    ${topping.toppingName} (+${topping.toppingPrice}đ)

                                    </label>
                                    </div>
                                    `
                        }).join('')
                    }
                            
                        </div>
                    </div>
                    <div>
                        <div class="quantity">
                            <span class="title-option">Số lượng :</span>
                            <button><i class="fa-solid fa-minus"></i></button>
                            <input type="text" value="1">
                            <button><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="buy-now">
                        <button>Mua ngay</button>
                    </div>
                </div>
            </div>
            <div class="product-detail-bottom">
                <div class="box-left-bot">
                    <div class="description">
                        <h3>Mo ta</h3>
                        <p>
                           ${book.description}
                        </p>
                    </div>
                    <div class="comment">
    
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
        ${Footer()}
   `
}
export default ProductDetail