import { adminService } from "../../../service/adminService";
import {
  router,
  showMesssage,
  useEffect,
  useState,
} from "../../../utilities/lib";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    adminService.getProducts().then((reponse) => {
      setProducts(reponse.data.data);
    });
  }, []);

  useEffect(() => {
    const btn_dellete = document.querySelectorAll(".trash");
    btn_dellete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const cf = confirm("Bạn có chắc chắn muốn xóa");
        if (cf) {
          const id = btn.dataset.id;
          adminService
            .deleteProductDetail(id)
            .then((response) => {
              showMesssage(true, "Xóa thành công");
              router.navigate("/admin/products");
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
                <a class="btn btn-add btn-sm" href="/admin/products/add" title="Thêm"><i class="fas fa-plus"></i>
                  Tạo mới nhân viên</a>
              </div>
            </div>
    <table class="table table-hover table-bordered js-copytextarea" cellpadding="0" cellspacing="0" border="0"
        id="sampleTable">
        <thead>
        <tr>
            <th width="300">Tên sản phẩm</th>
            <th width="20">Ảnh</th>
            <th width="100">Danh mục</th>
            <th>Giá gốc</th>
            <th>Giá khuyến mại</th>
            <th>Mô tả</th>
            <th>Thao tác</th>

        </tr>
        </thead>
        <tbody>
        ${products
          .map((product) => {
            return `
            <tr>
                <td>${product.productName}</td>
                <td><img class="img-card-person" src="${product.images?.[0]}" alt=""></td>
                <td>0</td>
                <td>${product.price}</td>
                <td>${product.sale_price}</td>
                <td>${product.description}</td>
                <td class="table-td-center"><button class="btn btn-primary btn-sm trash" type="button" title="Xóa"
                    data-id="${product._id}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <a class="btn btn-primary btn-sm edit" title="Sửa" id="show-emp"
                href="/admin/products/update/${product._id}"">
                    <i class="fas fa-edit"></i>
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

export default AdminProducts;
