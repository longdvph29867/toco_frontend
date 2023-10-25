
export default function LoginPage() {
  return /*html*/`
  <div>
    <div class="background">
      <div class="coating">
        <div class="form-sign-up">
          <div class="form-logo">
            <img src="https://tocotocotea.com.vn/wp-content/themes/tocotocotea/assets/images/logo.png" alt="">
          </div>
          <form action="" class="form">
            <div>
              <label for="">
                <input type="text" placeholder="Nhập số điện thoại của bạn">
              </label>
            </div>
            <div>
              <label for="">
                <input type="text" placeholder="Nhập mật khẩu của bạn">
              </label>
            </div>
            <div>
              <label for="">
                <input type="text" placeholder="Nhập lại mật khẩu của bạn">
              </label>
            </div>
            <div class="btn-sign-up">
              <button>Đăng nhập</button>
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
  `
}
