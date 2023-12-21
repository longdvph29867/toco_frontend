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

const UpdateUser = (id) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    showSpinner(true);
    adminService
      .getUserDetail(id)
      .then((res) => {
        setUser(res.data.data);
        showSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    $("#form-update").validate({
      rules: {
        account: { required: true },
        fullName: { required: true },
        phoneNumber: { required: true },
        role: { required: true },
      },
      messages: {
        account: "Vui lòng nhập Tên tài khoản",
        fullName: "Vui lòng nhập Tên người dùng",
        phoneNumber: "Vui lòng nhập Số điện thoại",
        role: "Vui lòng chọn Chức vụ",
      },
      submitHandler: function (form) {
        // Hành động khi form hợp lệ
        const account = $("#account").val();
        const fullName = $("#fullName").val();
        const phoneNumber = $("#phoneNumber").val();
        const role = $("#role").val();
        const password = user.password;
        const formData = { account, fullName, phoneNumber, role, password };
        showSpinner(true);
        adminService
          .updateUsers(id, formData)
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
        <li class="breadcrumb-item"><span>"Cập nhậtThêm mới tài khoản</span></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Cập nhật tài khoản</h3>
            <div class="tile-body">
              <form class="row" id="form-update">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên tài khoản</label>
                  <input value="${
                    user.account || ""
                  }" id="account" name="account" class="form-control" type="text">
                </div>
                <div class="form-group col-md-3">
                  <label class="control-label">Tên người dùng</label>
                  <input value="${
                    user.fullName || ""
                  }" id="fullName" name="fullName" class="form-control" type="text">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Số điện thoại</label>
                  <input value="${
                    user.phoneNumber || ""
                  }" id="phoneNumber" name="phoneNumber"  class="form-control" type="number">
                </div>
                <div class="form-group col-md-3">
                  <label for="exampleSelect1" class="control-label">Chức vụ</label>
                  <select id="role" name="role" class="form-control" id="exampleSelect1">
                    <option value="" class="hiden_option">-- Chọn chức vụ --</option>
                    <option ${
                      user.role == "member" ? "selected" : ""
                    } value="member">Người dùng</option>
                    <option ${
                      user.role == "admin" ? "selected" : ""
                    } value="admin">Admin</option>
                  </select>
                </div>
                <div class="form-group col-md-12">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="/admin/users">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>
    `;
};
export default UpdateUser;
