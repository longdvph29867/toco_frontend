import { useState, useEffect } from '../../utilities/lib';

const BestSelling = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch('https://toco-backend.vercel.app/products/')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      });
  }, []);

  return /*html*/ `
    ${products.slice(0,4).map((product) => {
      return /*html*/ `
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
};

export default BestSelling;