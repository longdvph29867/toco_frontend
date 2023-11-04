import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  useEffect,
  useState,
} from "../../../utilities/lib";
import * as Joi from "joi";

const UpdateUser = (id) => {
  console.log(id);
  const [user, setUser] = useState({});
  useEffect(() => {
    adminService
      .getUserDetail(id)
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    role: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn vai trò",
    }),
  });

  useEffect(() => {
    const formUpdate = document.querySelector("#form-update");
    formUpdate.onsubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(formUpdate);
      const account = formData.get("account");
      const fullName = formData.get("fullName");
      const phoneNumber = formData.get("phoneNumber");
      const role = formData.get("role");
      const { value, error } = schemaUsers.validate({
        account,
        fullName,
        phoneNumber,
        role,
      });
      console.log(error);
      if (!error) {
        const password = user.password;
        const data = { account, fullName, phoneNumber, role, password };
        adminService
          .updateUsers(id, data)
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
          <li class="breadcrumb-item">Danh sách sản phẩm</li>
          <li class="breadcrumb-item"><a href="#">Thêm sản phẩm</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới tài khoản</h3>
            <div class="tile-body">
              <form class="row" id="form-update">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên tài khoản</label>
                  <input value="${
                    user.account || ""
                  }" name="account" class="form-control" type="text">
                </div>
                <div class="form-group col-md-3">
                  <label class="control-label">Tên người dùng</label>
                  <input value="${
                    user.fullName || ""
                  }" name="fullName" class="form-control" type="text">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Số điện thoại</label>
                  <input value="${
                    user.phoneNumber || ""
                  }" name="phoneNumber"  class="form-control" type="number">
                </div>
                <div class="form-group col-md-3">
                  <label for="exampleSelect1" class="control-label">Chức vụ</label>
                  <select name="role" class="form-control" id="exampleSelect1">
                    <option value="" class="hiden_option">-- Chọn chức vụ --</option>
                    <option ${
                      user.role == "người dùng" ? "selected" : ""
                    } value="người dùng">Người dùng</option>
                    <option ${
                      user.role == "admin" ? "selected" : ""
                    } value="admin">Admin</option>
                  </select>
                </div>
                <div class="form-group col-md-12">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>
    `;
};
export default UpdateUser;
