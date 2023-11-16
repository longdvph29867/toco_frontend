import { authService } from "../../service/viewsService";
import { useEffect, showMesssage, router } from "../../utilities/lib";
import {
  required,
  validCheckRePassword,
  validLength,
  validPhoneNunber,
} from "../../validations/viewsValidation";
export default function RegisterPage() {
  useEffect(() => {
    const formRegister = document.getElementById("register-form");
    formRegister.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(formRegister);
      const account = formData.get("account");
      const phoneNumber = formData.get("phoneNumber");
      const fullName = formData.get("fullName");
      const password = formData.get("password");
      const rePassword = formData.get("rePassword");

      const newUser = {
        account,
        phoneNumber,
        fullName,
        password,
      };
      let isValid =
        required(account, "error-account") &&
        validLength(account, "error-account", 6, 25);
      isValid &=
        required(phoneNumber, "error-phoneNumber") &&
        validPhoneNunber(phoneNumber, "error-phoneNumber");
      isValid &= required(fullName, "error-fullName");
      isValid &=
        required(password, "error-password") &&
        validLength(password, "error-password", 6, 25);
      isValid &=
        required(rePassword, "error-rePassword") &&
        validCheckRePassword(password, rePassword, "error-rePassword");
      if (isValid) {
        authService
          .postRegister(newUser)
          .then((res) => {
            // console.log(res.data);
            showMesssage(true, res.data.message);
            router.navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            showMesssage(false, err.response.data.message);
          });
      }
    });
  }, []);

  return /*html*/ `
  <div>
    <div class="background">
      <div class="coating">
        <div class="form-sign-up">
          <div class="form-logo">
            <img src="https://tocotocotea.com.vn/wp-content/themes/tocotocotea/assets/images/logo.png" alt="">
          </div>
          <form action="" class="form" id="register-form">
            <div>
              <input type="text" name="account" id="account" placeholder="Nhập tài khoản">
              <span id="error-account" class=error-el></span>
            </div>
            <div>
              <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Nhập số điện thoại">
              <span id="error-phoneNumber" class=error-el></span>
            </div>
            <div>
              <input type="text" name="fullName" id="fullName" placeholder="Nhập họ tên">
              <span id="error-fullName" class=error-el></span>
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder="Nhập mật khẩu">
              <span id="error-password" class=error-el></span>
            </div>
            <div>
              <input type="password" name="rePassword" id="rePassword" placeholder="Nhập lại mật khẩu">
              <span id="error-rePassword" class=error-el></span>
            </div>
            <div class="btn-sign-up">
              <button>Đăng ký</button>
            </div>
          </form>
          <div class="link-login">
            <span>Đã có tài khoản ?</span>
            <a href="/login">Đăng nhập</a>
          </div>
          <div class="back-home">
            <a href="">Quay lại màn hình chính</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
