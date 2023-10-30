import { products } from '../../../../db.json' assert {type: 'json'}

const BestSelling = () => {
  return /*html*/`
    ${products.map((product) => {
      return /*html*/`
      <li class="item-product-sale">
                  <img src="${product.images?.[0]}" alt="">
                  <a href="" class="product-sale">
                      <h3>${product.productName}</h3>
                      <p>${product.price} đ</p>
                  </a>
              </li>
      
      `;
    }).join('')}
  `;
}

export default BestSelling;
