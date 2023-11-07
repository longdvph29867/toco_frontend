import { adminService } from "../../../service/adminService";
import { router, showMesssage, useEffect } from "../../../utilities/lib";
import * as Joi from "joi";

const AddUser = () => {
  const schemaUsers = Joi.object({
    account: Joi.string().required().min(6).messages({
      "any.required": "Vui lòng nhập tên tài khoản",
      "string.min": "Tài khoản phải có ít nhất 6 ký tự!",
    }),
    fullName: Joi.string().required().messages({
      "any.required": "Vui lòng nhập tên tài khoản",
      "string.empty": "Vui lòng nhập tên tài khoản",
    }),
    phoneNumber: Joi.number().required().min(10).messages({
      "any.required": "Vui lòng nhập tên tài khoản",
      "string.min": "Không đúng định dạng số điện thoại",
    }),
    password: Joi.string().required().min(6).max(32).messages({
      "any.required": "Vui lòng nhập mật khẩu",
      "string.min": "Mật khẩu ít nhất 6 ký tự!",
    }),
    confim_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Xác nhận mật khẩu phải giống với mật khẩu.",
      }),
    role: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn vai trò",
    }),
  });

  useEffect(() => {
    const formAdd = document.querySelector("#form_add");
    formAdd.onsubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(formAdd);
      const account = formData.get("account");
      const fullName = formData.get("fullName");
      const phoneNumber = formData.get("phoneNumber");
      const role = formData.get("role");
      const password = formData.get("password");
      const confim_password = formData.get("confim_password");
      const { value, error } = schemaUsers.validate({
        account,
        fullName,
        phoneNumber,
        role,
        password,
        confim_password,
      });
      console.log(error);
      if (!error) {
        const data = { account, fullName, phoneNumber, role, password };
        adminService
          .postUsers(data)
          .then((res) => {
            showMesssage(true, res.data.message);
            router.navigate("/admin/users");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
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
              <form class="row" id="form_add" >
                <div class="form-group col-md-3">
                  <label class="control-label">Tên tài khoản</label>
                  <input name="account" class="form-control" type="text">
                </div>
                <div class="form-group col-md-3">
                  <label class="control-label">Tên người dùng</label>
                  <input name="fullName" class="form-control" type="text">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Số điện thoại</label>
                  <input name="phoneNumber"  class="form-control" type="number">
                </div>
                <div class="form-group col-md-3">
                  <label for="exampleSelect1" class="control-label">Chức vụ</label>
                  <select name="role" class="form-control" id="exampleSelect1">
                    <option value="" class="hiden_option">-- Chọn chức vụ --</option>
                    <option value="người dùng">Người dùng</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div class="form-group  col-md-3">
                  <label class="control-label">Mật khẩu</label>
                  <input name="password"  class="form-control" type="password">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Xác nhận mật khẩu</label>
                  <input name="confim_password" class="form-control" type="password">
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
