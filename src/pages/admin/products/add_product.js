import $ from "jquery";
import "jquery-validation";
import {
  router,
  showMesssage,
  showSpinner,
  useEffect,
  useState,
} from "../../../utilities/lib";
import axios from "axios";
import { adminService } from "../../../service/adminService";
import { assert } from "joi";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const upload_img = async (files) => {
    const API_Upload = `https://api.cloudinary.com/v1_1/dnfoy8jtl/image/upload`;
    const PRESET_NAME = "img_toco";
    const urls = [];
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    for (const file of files) {
      formData.append("file", file);
      const reponse = await axios.post(API_Upload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      urls.push(reponse.data.url);
    }
    return urls;
  };
  useEffect(() => {
    adminService
      .getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    $.validator.addMethod(
      "filesize",
      function (value, element, param) {
        return this.optional(element) || element.files[0].size <= param;
      },
      "Dung lượng tệp quá lớn."
    );
    $.validator.addMethod("extension", function (value, element, param) {
      const allowedExtensions = param.split(","); // ["png", "jpg", "jpeg"]
      for (const file of element.files) {
        const extension = file.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
          return false;
        }
        return true;
      }
    });
    $.validator.addMethod(
      "maxfiles",
      function (value, element, param) {
        return this.optional(element) || element.files.length <= param;
      },
      "Số lượng tệp vượt quá giới hạn cho phép."
    );
    $("#form-add").validate({
      rules: {
        nameProduct: { required: true, minLength: 3 },
        price: { required: true, min: 1 },
        images: {
          required: true,
          filesize: 1024 * 1024,
          maxfiles: 5,
          extension: "png,jpg,jpeg",
        },
        id_category: { required: true },
        description: { required: true },
      },
      messages: {
        nameProduct: {
          require: "* Vui lòng nhập tên sản phẩm",
          minLength: "* Tên sản phẩm phải có ít nhất 3 kí tự",
        },
        price: {
          required: "* Vui lòng nhập giá tiền",
          min: "* Giá phải lớn hơn 0",
        },
        images: {
          required: "* Vui lòng chọn file ảnh",
          extension: "* Chỉ nhận file ảnh có định dạng là png,jpg,jpeg",
          filesize: "* Dung lượng file phải dưới 1MB",
          maxfiles: "* Chọn tối đa 5 hình ảnh",
        },
        id_category: "* Vui lòng chọn danh mục",
        description: "* Vui lòng nhập mô tả",
      },
      submitHandler: async (form, e) => {
        // Hành động khi form hợp lệ
        e.preventDefault();
        const imageFiles = $("#images").prop("files");
        const productName = $("#nameProduct").val();
        const price = $("#price").val();
        const sale_price = $("#salePrice").val();
        const id_category = [];
        const description = $("#description").val();
        $('input[type="checkbox"]:checked').each(function () {
          id_category.push($(this).val());
        });
        const images = await upload_img(imageFiles);
        const data = {
          productName,
          price,
          images,
          sale_price,
          id_category,
          description,
        };
        showSpinner(true);
        adminService
          .postProducts(data)
          .then((response) => {
            showSpinner(false);
            showMesssage(true, response.data.message);
            router.navigate("/admin/products");
          })
          .catch((error) => {
            showMesssage(false, error.response.data.message);
          });
      },
    });
  });

  return `
    <main class="app-content">
      <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><a href="/admin/products">Danh sách sản phẩm</a></li>
          <li class="breadcrumb-item"><a href="/admin/products/add">Thêm sản phẩm</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Tạo mới sản phẩm</h3>
            <div class="tile-body">
              <form class="row" action="" id="form-add" method="POST" enctype="multipart/form-data">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên sản phẩm</label>
                  <input id="nameProduct" name="nameProduct" class="form-control" type="text">
                </div>
  
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá gốc</label>
                  <input id="price" name="price"  class="form-control" type="number">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá khuyến mãi</label>
                  <input id="salePrice" name="salePrice" class="form-control" value="0" type="number">
                </div>
                
                <div class="form-group col-md-12">
                  <label class="control-label">Ảnh sản phẩm</label>
                  <div id="myfileupload">
                    <input type="file" id="images" name="images" multiple/>
                  </div>

                </div>
                <div class="form-group col-md-12">
                  <label for="exampleSelect1" class="control-label">Danh mục</label>
                  <input id="id_category" name="id_category" class="checkbox_categories-hidden" visibility="hidden" type="checkbox">
                  <div class="row">
                  ${categories
                    .map((categorie) => {
                      return `
                      <div class="col-md-3 box-categories">
                      <input id="id_category" name="id_category" class="checkbox_categories" type="checkbox" value="${categorie._id}">
                      <label class="control-label">
                         ${categorie.categoryName}
                      </label>
                      </div>
                    `;
                    })
                    .join("")}
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label class="control-label">Mô tả sản phẩm</label>
                  <textarea class="form-control" id="description" name="description" id="mota"></textarea>
                </div>
                <div class="form-group col-md-12">
                  <button class="btn btn-save">Lưu lại</button>
                  <a class="btn btn-cancel" href="/admin/products">Hủy bỏ</a>
                </div>
              </form>
            </div>
          </div>
    </main>
    `;
};
export default AddProduct;
