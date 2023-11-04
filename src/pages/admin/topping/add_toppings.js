import { adminService } from "../../../service/adminService";
import { router, showMesssage, useEffect } from "../../../utilities/lib";
import * as Joi from "joi";
const AddTopping = () => {
  const scehma = Joi.object({
    toppingName: Joi.string().required().min(3).messages({
      "string.empty": "Vui lòng nhập tên danh mục",
      "string.min": "Tên danh mục phải có ít nhất 3 ký tự",
    }),
    toppingPrice: Joi.number().required().messages({
      "string.empty": "Vui lòng nhập tên danh mục",
    }),
  });
  useEffect(() => {
    const form = document.querySelector("#form-topping");
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const toppingName = formData.get("toppingName");
      const toppingPrice = formData.get("toppingPrice");
      const data = { toppingName, toppingPrice };
      const { value, error } = scehma.validate(data);
      if (!error) {
        adminService
          .postToppings({ toppingName, toppingPrice })
          .then((response) => {
            showMesssage(true, response.data.message);
            router.navigate("/admin/toppings");
          })
          .catch((error) => {
            showMesssage(false, error.message);
          });
      }
    };
  });
  return `
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item">Danh sách sản phẩm</li>
          <li class="breadcrumb-item"><a href="#">Thêm sản phẩm</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới sản phẩm</h3>
            <div class="tile-body">
              <form class="form_cate" id="form-topping">
                <div class="from-item">
                  <label class="control-label">Mã sản phẩm</label>
                  <input name="toppingName"  class="form-control" type="text" >
                </div>
                <div class="from-item">
                  <label class="control-label">Tên Danh mục</label>
                  <input  name="toppingPrice" class="form-control" type="text">
                </div>
                <div class="btn_form">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>`;
};

export default AddTopping;
