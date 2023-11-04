import { adminService } from "../../../service/adminService";
import { useEffect, useState } from "../../../utilities/lib";

const Toppings = () => {
  const [toppings, setToppings] = useState([]);
  useEffect(() => {
    adminService
      .getToppings()
      .then((response) => {
        setToppings(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return `
    <main class="app-content">
    <div class="app-title">
      <ul class="app-breadcrumb breadcrumb side">
        <li class="breadcrumb-item active"><a href="#"><b>Danh sách nhân viên</b></a></li>
      </ul>
      <div id="clock"></div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <div class="tile-body">

            <div class="row element-button">
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" href="/admin/toppings/add" title="Thêm"><i class="fas fa-plus"></i>
                  Tạo mới nhân viên</a>
              </div>
            </div>
    <table class="table table-hover table-bordered js-copytextarea" cellpadding="0" cellspacing="0" border="0"
        id="sampleTable">
        <thead>
            <tr>
                <th >Tên Topping</th>
                <th >Giá tiền</th>
                <th >Thao tác</th>
            </tr>
        </thead>
        <tbody>
            ${toppings
              .map((topping) => {
                return `
                <tr>
                    <td>${topping.toppingName}</td>
                    <td>${topping.toppingPrice}</td>
                    <td class="table-td-center"><button class="btn btn-primary btn-sm trash btn_delete" type="button" title="Xóa"
                        data-id="${topping._id}"><i class="fas fa-trash-alt"></i>
                    </button>
                    <a class="btn btn-primary btn-sm btn_edit" title="Sửa" id="show-emp"
                      href="/admin/toppings/update/${topping._id}"  ><i class="fas fa-edit"></i>
                    </a>
                    </td>
                </tr>
                `;
              })
              .join("")}
        </tbody>
    </table>
    </div>
        </div>
      </div>
    </div>
  </main>
    `;
};
export default Toppings;
