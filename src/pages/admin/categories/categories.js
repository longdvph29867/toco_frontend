import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../../utilities/lib";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const fetchData = () => {
    showSpinner(true);
    adminService
      .getCategories()
      .then((response) => {
        setCategories(response.data.data);
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
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const cf = confirm("Bạn chắc chắn muốn xóa danh mục này?");
        if (cf) {
          adminService
            .deleteCategories(id)
            .then((response) => {
              showMesssage(true, response.data.message);
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
        <li class="breadcrumb-item active"><a href="/admin/categories"><b>Danh sách danh mục</b></a></li>
      </ul>
      <div id="clock"></div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="tile">
          <div class="tile-body">

            <div class="row element-button">
              <div class="col-sm-2">
                <a class="btn btn-add btn-sm" href="/admin/categories/add" title="Thêm"><i class="fas fa-plus"></i>
                  Thêm danh mục mới</a>
              </div>
            </div>
        <table class="table table-hover table-bordered js-copytextarea" cellpadding="0" cellspacing="0" border="0"
            id="sampleTable">
            <thead>
            <tr>
                <th >Tên loại</th>
                <th >Số sản phẩm</th>
                <th >Thao tác</th>
            </tr>
            </thead>
            <tbody>
            ${categories
              .map((category) => {
                return `
                <tr>
                    <td>${category.categoryName}</td>
                    <td>${category.productCount}</td>
                    <td class="table-td-center"><button class="btn btn-primary btn-sm trash btn_delete" type="button" title="Xóa"
                        data-id="${category._id}"><i class="fas fa-trash-alt"></i>
                    </button>
                    <a class="btn btn-primary btn-sm btn_edit" title="Sửa" id="show-emp"
                      href="/admin/categories/update/${category._id}"  ><i class="fas fa-edit"></i>
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
export default Categories;
