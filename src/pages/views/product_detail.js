import "../../../style/product-detail.css"
import {useState, useEffect, showSpinner} from '../../utilities/lib'
import BestSelling from "../../components/detail/best_selling";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Spinner from "../../components/spinner";

const ProductDetail = (slug) => {
    const [book,setBook]=useState({})
    const [topping,setTopping]=useState([])
    useEffect(function() {
        showSpinner(true)
        fetch('https://toco-backend.vercel.app/products/'+slug)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            showSpinner(false)
            setBook(data.data)
        })

        showSpinner(true)
        fetch('https://toco-backend.vercel.app/toppings')
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            showSpinner(false)
            setTopping(data.data)
        })
    }, [])

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
    ${Spinner()}
    `
}
export default ProductDetail