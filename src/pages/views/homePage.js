import Footer from "../components/footer"
import Header from "../components/header"
import {useState, useEffect} from '../../utilities/lib'
import OutstandingPro from "../components/outstanding_pro"
import Slider from "../components/Slider"
import Franchise from "../components/franchise"
import Story from "../components/story"
import News from "../components/news"

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
 // slider
let isToggle = false;
function update() {
  window.requestAnimationFrame(update);
  let carousel_inner = document.querySelector(".carousel-inner");
  let height_slide = document.querySelectorAll(".slide")[1].offsetHeight;
  carousel_inner.style.height = height_slide + "px";
}

update();
// Slide tiếp theo
function slideNext() {
  let lists = document.querySelectorAll(".slide");
  document.getElementById("carousel-inner").appendChild(lists[0]);
}
// SLide trước đó
function slidePrev() {
  let lists = document.querySelectorAll(".slide");
  document.getElementById("carousel-inner").prepend(lists[lists.length - 1]);
}
// Slide tự động chạy
let autoShow = setInterval(slideNext, 3500);
// Button slide
document.getElementById("btn-next").addEventListener("click", () => {
  slideNext();
  // Reset Interval - Nếu mở slide tự động chạy ở trên thì phải bỏ comment của 2 dòng dưới
  clearInterval(autoShow);
  autoShow = setInterval(slideNext, 3500);
});
// Button slide
document.getElementById("btn-prev").addEventListener("click", () => {
  slidePrev();
  // Reset Interval - Nếu mở slide tự động chạy ở trên thì phải bỏ comment của 2 dòng dưới
  clearInterval(autoShow);
  autoShow = setInterval(slideNext, 3500);
});



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