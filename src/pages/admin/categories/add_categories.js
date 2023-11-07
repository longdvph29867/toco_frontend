import { adminService } from "../../../service/adminService";
import { router, showMesssage, useEffect } from "../../../utilities/lib";
import * as Joi from "joi";
const AddCategories = () => {
  const scehma = Joi.object({
    categoryName: Joi.string().required().min(3).messages({
      "string.empty": "Vui lòng nhập tên danh mục",
      "string.min": "Tên danh mục phải có ít nhất 3 ký tự",
    }),
  });
  useEffect(() => {
    const form_cate = document.querySelector("#form-cate");
    form_cate.addEventListener("submit", (e) => {
      e.preventDefault();
      const categoryName = document.querySelector("#categoryName").value;
      adminService
        .postCategories({ categoryName })
        .then((response) => {
          showMesssage(true, response.data.message);
          router.navigate("/admin/categories");
        })
        .catch((error) => {
          showMesssage(false, error.message);
        });
    });
  });
  return `
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><a href="/admin/categories">Danh sách danh mục</a></li>
          <li class="breadcrumb-item"><a href="/admin/categories/add">Thêm danh mục</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới danh mục</h3>
            <div class="tile-body">
              <form class="form_cate" id="form-cate">
                <div class="from-item">
                  <label class="control-label">Mã danh mục</label>
                  <input  class="form-control" type="text" placeholder="Tự động" readonly>
                </div>
                <div class="from-item">
                  <label class="control-label">Tên danh mục</label>
                  <input  id="categoryName" class="form-control" type="text">
                </div>
                <div class="btn_form">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="/admin/categories">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>`;
};

export default AddCategories;
