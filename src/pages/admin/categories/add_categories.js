import $ from "jquery";
import "jquery-validation";
import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
} from "../../../utilities/lib";
const AddCategories = () => {
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
          .postCategories({ categoryName })
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
                  <input name="categoryName" id="categoryName" class="form-control" type="text">
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
