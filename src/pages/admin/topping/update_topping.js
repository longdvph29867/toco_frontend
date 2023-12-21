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
const UpdateTopping = (id) => {
  const [topping, setTopping] = useState({});
  useEffect(() => {
    showSpinner(true);
    adminService
      .getTopingDetail(id)
      .then((response) => {
        setTopping(response.data.data);
        showSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    $("#form-topping").validate({
      rules: {
        toppingName: { required: true },
        toppingPrice: { required: true, min: 1 },
      },
      messages: {
        toppingName: "Vui lòng nhập Tên topping",
        toppingPrice: {
          required: "Vui lòng nhập Giá topping",
          min: "Giá topping phải lớn hơn 0",
        },
      },
      submitHandler: function (form) {
        // Hành động khi form hợp lệ
        const toppingName = $("#toppingName").val();
        const toppingPrice = $("#toppingPrice").val();
        showSpinner(true);
        adminService
          .updateTopping(id, { toppingName, toppingPrice })
          .then((response) => {
            showSpinner(false);
            showMesssage(true, response.data.message);
            router.navigate("/admin/toppings");
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
          <li class="breadcrumb-item">Danh sách Toppings</li>
          <li class="breadcrumb-item"><span>Cập nhật Topping</span></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Cập nhật Topping</h3>
            <div class="tile-body">
              <form class="form_cate" id="form-topping">
                <div class="from-item">
                  <label class="control-label">Tên Topping</label>
                  <input id="toppingName" name="toppingName" value="${
                    topping.toppingName || ""
                  }"  class="form-control" type="text" >
                </div>
                <div class="from-item">
                  <label class="control-label">Giá</label>
                  <input id="toppingPrice" name="toppingPrice" value="${
                    topping.toppingPrice || ""
                  }" class="form-control" type="number">
                </div>
                <div class="btn_form">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>`;
};

export default UpdateTopping;
