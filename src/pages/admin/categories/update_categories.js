import $ from "jquery";
import "jquery-validation";

import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../../utilities/lib";
const UpdateCategories = (id) => {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    showSpinner(true);
    adminService
      .getCategoriesDetail(id)
      .then((reponse) => {
        setCategories(reponse.data.data);
        showSpinner(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    $("#form-cate").validate({
      rules: {
        categoryName: { required: true },
      },
      messages: {
        categoryName: "Vui lòng nhập Tên danh mục",
      },
      submitHandler: function (form) {
        // Hành động khi form hợp lệ
        const categoryName = $("#categoryName").val();
        showSpinner(true);
        adminService
          .updateCategories(id, { categoryName })
          .then((response) => {
            showSpinner(false);
            showMesssage(true, response.data.message);
            router.navigate("/admin/categories");
          })
          .catch((error) => {
            showMesssage(false, error.message);
          });
      },
    });
  });
  return `
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
        <li class="breadcrumb-item"><a href="/admin/categories">Danh sách danh mục</a></li>
        <li class="breadcrumb-item"><span>Cập nhật danh mục</span></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Cập nhật danh mục</h3>
            <div class="tile-body">
              <form class="form_cate" id="form-cate">
                <div class="from-item">
                  <label class="control-label">Mã danh phẩm</label>
                  <input  class="form-control" type="text" placeholder="Tự động" readonly>
                </div>
                <div class="from-item">
                  <label class="control-label">Tên Danh mục</label>
                  <input name="categoryName" id="categoryName" value="${
                    categories.categoryName || ""
                  }" class="form-control" type="text">
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
export default UpdateCategories;
