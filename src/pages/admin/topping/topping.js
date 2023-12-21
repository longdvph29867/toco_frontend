import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../../utilities/lib";

const Toppings = () => {
  const [toppings, setToppings] = useState([]);
  const fetchData = () => {
    showSpinner(true);
    adminService
      .getToppings()
      .then((response) => {
        setToppings(response.data.data);
        showSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const btn_delete = document.querySelectorAll(".btn_delete");
    btn_delete.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cf = confirm(`Bạn chắc chắn muốn xóa topping này?`);
        if (cf) {
          const id = btn.dataset.id;
          showSpinner(true);
          adminService
            .deleteTopping(id)
            .then((response) => {
              showSpinner(false);
              showMesssage(true, response.data.messgae);
              fetchData();
            })
            .catch((error) => {
              showMesssage(false, error.message);
            });
        }
      });
    });
  });
  return `
    <main class="app-content">
    <div class="app-title">
      <ul class="app-breadcrumb breadcrumb side">
        <li class="breadcrumb-item active"><a href="/admin/toppings"><b>Danh sách Toppings</b></a></li>
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
                  Thêm Toppings</a>
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
                      href="/admin/toppings/update/${topping._id}"><i class="fas fa-edit"></i>
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
