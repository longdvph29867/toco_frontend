import { adminService } from "../../../service/adminService";
import {
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../../utilities/lib";

const User = () => {
  const [users, setUsers] = useState([]);
  const fetchData = () => {
    showSpinner(true);
    adminService
      .getUsers()
      .then((res) => {
        setUsers(res.data.data);
        showSpinner(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const btn_delete = document.querySelectorAll(".delete");
    btn_delete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const cf = confirm("Chắc chắn muốn xóa tài khoản này");
        if (cf) {
          adminService
            .deleteUsers(id)
            .then((res) => {
              showMesssage(true, "Xóa thành công");
              fetchData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
  });
  return `
    <main class="app-content">
    <div class="app-title">
      <ul class="app-breadcrumb breadcrumb side">
        <li class="breadcrumb-item active"><a href="/admin/users"><b>Danh sách tài khoản</b></a></li>
      </ul>
      <div id="clock"></div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <div class="tile-body">

            <div class="row element-button">
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" href="/admin/users/add" title="Thêm"><i class="fas fa-plus"></i>
                  Tạo mới tài khoản</a>
              </div>
            </div>
            <table class="table table-hover table-bordered js-copytextarea" cellpadding="0" cellspacing="0" border="0"
              id="sampleTable">
              <thead>
                <tr>
                  <th>Tên tài khoản</th>
                  <th>Tên người dùng</th>
                  <th>Số điện thoại</th>
                  <th>Chức vụ</th>
                  <th width="100">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${users
                  .map((user) => {
                    return `
                    <tr>
                        <td>${user.account}</td>
                        <td>${user.fullName}</td>
                        <td>${user.phoneNumber}</td>
                        <td>${user.role}</td>
                        <td class="table-td-center">
                            <button class="btn btn-primary btn-sm trash delete" 
                            type="button" data-id="${user._id}" title="Xóa"><i class="fas fa-trash-alt"></i>
                            </button>
                            <a href="/admin/users/update/${user._id}" class="btn btn-primary btn-sm edit" title="Sửa" id="show-emp"
                            data-toggle="modal" data-target="#ModalUP"><i class="fas fa-edit"></i>
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

export default User;
