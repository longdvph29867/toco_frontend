import $ from "jquery";
import "jquery-validation";
import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
} from "../../../utilities/lib";

const AddUser = () => {
  useEffect(() => {
    $("#form_add").validate({
      rules: {
        account: { required: true },
        fullName: { required: true },
        phoneNumber: { required: true },
        role: { required: true },
        password: { required: true, minlength: 6 },
        confim_password: { required: true, equalTo: "#password" },
      },
      messages: {
        account: "Vui lòng nhập Tên tài khoản",
        fullName: "Vui lòng nhập Tên người dùng",
        phoneNumber: "Vui lòng nhập Số điện thoại",
        role: "Vui lòng chọn Chức vụ",
        password: {
          minlength: "Mật khảu ít nhất 6 kí tự",
          required: "Vui lòng nhập Mật khẩu",
        },
        confim_password: {
          required: "Vui lòng nhập password",
          equalTo: "Xác nhân mật khẩu không đúng",
        },
      },
      submitHandler: function (form) {
        // Hành động khi form hợp lệ
        const account = $("#account").val();
        const fullName = $("#fullName").val();
        const phoneNumber = $("#phoneNumber").val();
        const role = $("#role").val();
        const password = $("#password").val();

        const formData = { account, fullName, phoneNumber, role, password };
        showSpinner(true);
        adminService
          .postUsers(formData)
          .then((res) => {
            showSpinner(false);
            showMesssage(true, res.data.message);
            router.navigate("/admin/users");
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
          <li class="breadcrumb-item"><a href="/admin/users">Danh sách tài khoản</a></li>
          <li class="breadcrumb-item"><a href="/admin/users/add">Thêm mới tài khoản</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới tài khoản</h3>
            <div class="tile-body">
              <form class="row" id="form_add" method="POST">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên tài khoản</label>
                  <input id="account" name="account" class="form-control" type="text">
                </div>
                <div class="form-group col-md-3">
                  <label class="control-label">Tên người dùng</label>
                  <input id="fullName" name="fullName" class="form-control" type="text">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Số điện thoại</label>
                  <input id="phoneNumber" name="phoneNumber"  class="form-control" type="number">
                </div>
                <div class="form-group col-md-3">
                  <label for="" class="control-label">Chức vụ</label>
                  <select id="role" name="role" class="form-control">
                    <option value="" class="hiden_option">-- Chọn chức vụ --</option>
                    <option value="member">Người dùng</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div class="form-group  col-md-3">
                  <label class="control-label">Mật khẩu</label>
                  <input id="password" name="password"  class="form-control" type="password">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Xác nhận mật khẩu</label>
                  <input id="confim_password" name="confim_password" class="form-control" type="password">
                </div>
                
                <div class="form-group col-md-12">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="/admin/users/add">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>
    `;
};
export default AddUser;
