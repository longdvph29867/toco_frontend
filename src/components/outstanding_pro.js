const OutstandingPro = ({
  _id,
  productName,
  price,
  slug,
  sale_price,
  description,
  images,
}) => {
  return /*html*/ `
  <!-- products section starts -->
  <div class="cardItem">
    <div class="cardItem-new">new</div>
    <div class="cardItem-img">
    <a href="/product/${slug}"> <img src="${images?.[0]}" alt="" /></a>
    </div>
    <div class="cardItem-discount">${Math.round(
      ((price - sale_price) / price) * 100
    )}%</div>
    <div class="cardItem-info">
    <a href="/product/${slug}">  <h3>${productName}</h3></a>
      <p>${sale_price}đ<span>${price}đ</span></p>
      <div class="btn-order">ĐẶT HÀNG</div>
    </div>
  </div>
  `;
};
export default OutstandingPro;
