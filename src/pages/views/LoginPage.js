import { localUserService } from "../../service/localService";
import { authService } from "../../service/viewsService";
import { router, showMesssage, useEffect } from "../../utilities/lib";
import { required } from "../../validations/viewsValidation";
export default function LoginPage() {
  useEffect(() => {
    const formLogin = document.getElementById("login-form");
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(formLogin);
      const account = formData.get("account");
      const password = formData.get("password");

      const data = {
        account,
        password,
      };
      let isValid = required(account, "error-account");
      isValid &= required(password, "error-password");
      if (isValid) {
        authService
          .postLogin(data)
          .then((res) => {
            // console.log(res.data);
            const userInfo = {
              ...res.data.data,
              accessToken: res.data.accessToken,
            };
            localUserService.set(userInfo);
            showMesssage(true, res.data.message);
            router.navigate("/");
            // router.navigate('/login')
          })
          .catch((err) => {
            console.log(err);
            // showMesssage(false, err.response.data.message)
            showMesssage(false, "Tài khoản hoặc mật khẩu không đúng!");
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
          <form action="" class="form" id="login-form">
            <div>
              <label for="">
              </label>
              <input class="form-input" type="text" name="account" id="account" placeholder="Nhập tài khoản">
              <span id="error-account" class=error-el></span>
            </div>
            <div>
              <label for="">
              </label>
              <input class="form-input" type="password" name="password" id="password" placeholder="Nhập mật khẩu">
              <span id="error-password" class=error-el></span>
            </div>
            <div class="btn-sign-up">
              <button>Đăng Nhập</button>
            </div>
          </form>
          <div class="link-login">
            <span>Chưa có tài khoản ?</span>
            <a href="/register">Đăng ký</a>
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
