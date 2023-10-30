import Footer from "../../components/footer"
import Header from "../../components/header"
import {useState, useEffect} from '../../utilities/lib'
import OutstandingPro from "../../components/outstanding_pro"
import Slider from "../../components/Slider"
import Franchise from "../../components/franchise"
import Story from "../../components/story"
import News from "../../components/news"

const HomePage = () => {
  let [books,setBook]=useState([])

  useEffect(function(){
    fetch('https://toco-backend.vercel.app/products')
    .then(function(res){
      return res.json();
    }).then(function(data){
      setBook(data.data)
    }) 
  },[])
  useEffect(function() {
 


var modal = document.getElementById("modal");
var navbar = document.getElementById("header__navbar-modal");
var check = true;

modal.addEventListener("click", function (event) {
  if (check) {
    ul.classList.add("navbar-block");
    check = false;
  } else {
    ul.classList.remove("navbar-block");
    check = true;
  }
  // console.log(check);
});

})
  return /*html*/` ${Header()}
  ${Slider()}
 

  <section id="products">
  <h3 class="title">ToCoToCo Menu</h3>
  <h1 class="title">SẢN PHẨM NỔI BẬT</h1>
  <div class="products-title-img">
      <img src="../../public/images/views/card_title.webp" class="img-title" alt="" />
  </div>
  <div class="cardList">
      
  ${books.slice(0,8).map(function (book) {
    
    return OutstandingPro(book)
  }).join('')}
  </div>
  <a href="./Order.html"><button class="btn-show-more">XEM TẤT
          CẢ</button></a>
</section> 
  ${Story()}
  ${Franchise()}
  ${News()}
  ${Footer()}
    `
}

export default HomePage