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

const UpdateProduct = (slug) => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    showSpinner(true);
    adminService
      .getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    adminService
      .getProductDetail(slug)
      .then((res) => {
        setProduct(res.data.data);
        showSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    $.validator.addMethod(
      "filesize",
      function (value, element, param) {
        return this.optional(element) || element.files[0].size <= param;
      },
      "Dung lượng tệp quá lớn."
    );
    $.validator.addMethod("extension", function (value, element, param) {
      const allowedExtensions = param.split(","); // ["png", "jpg", "jpeg"]
      if (element.files.length > 0) {
        for (const file of element.files) {
          const extension = file.name?.split(".").pop().toLowerCase();
          if (!allowedExtensions.includes(extension)) {
            return false;
          }
          return true;
        }
      } else {
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
    $.validator.addMethod(
      "checkCheckbox",
      function (value, element) {
        return $('input[type="checkbox"]:checked').length > 0;
      },
      "Vui lòng chọn ít nhất một checkbox."
    );
    $("#form-add").validate({
      rules: {
        nameProduct: { required: true, minLength: 3 },
        price: { required: true, min: 1 },
        images: {
          filesize: 1024 * 1024,
          maxfiles: 5,
          extension: "png,jpg,jpeg",
        },
        id_category: { checkCheckbox: true },
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
        let data = {};
        if (imageFiles.length == 0) {
          data = {
            productName,
            price: parseInt(price),
            images: product.images,
            sale_price: parseInt(sale_price),
            id_category,
            description,
          };
        } else {
          const images = await upload_img(imageFiles);
          data = {
            productName,
            price: parseInt(price),
            images,
            sale_price: parseInt(sale_price),
            id_category,
            description,
          };
        }
        showSpinner(true);
        adminService
          .updateProduct(product._id, data)
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
        <li class="breadcrumb-item"><span>Cập nhật phẩm</span></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Cập nhật sản phẩm</h3>
            <div class="tile-body">
              <form class="row" id="form-add" method="POST" enctype="multipart/form-data">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên sản phẩm</label>
                  <input value="${
                    product.productName || ""
                  }" name="nameProduct" id="nameProduct" class="form-control" type="text">
                </div>
  
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá gốc</label>
                  <input value="${
                    product.price || ""
                  }" name="price" id="price" class="form-control" type="number">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá khuyến mãi</label>
                  <input value="${
                    product.sale_price || ""
                  }" name="salePrice" id="salePrice" class="form-control" type="number">
                </div>
                
                <div class="form-group col-md-12">
                  <label class="control-label">Ảnh sản phẩm</label>
                  <div id="myfileupload">
                    <input type="file" id="images" name="images" multiple/>
                    
                  </div>
                  <div id="img-box" class="mt-3 grid column-gap-3">
                  ${product.images
                    ?.map((img) => {
                      return `
                        <img class="productDetail_img g-col-3" width="50" height="50" src="${img}" alt="">
                    `;
                    })
                    .join("")}
                    </div>

                </div>
                <div class="form-group col-md-12">
                  <label for="exampleSelect1" class="control-label">Danh mục</label>
                  <input id="id_category" name="id_category" class="checkbox_categories-hidden" visibility="hidden" type="checkbox">
                  <div class="row">
                  ${categories
                    .map((category) => {
                      let isMatch = product.id_category?.find((item) => {
                        if (item._id == category._id) {
                          return true;
                        }
                      });
                      const checked = isMatch ? "checked" : "";
                      return `
                      <div class="col-md-3 box-categories">
                      <input id="id_category" ${checked} value="${category._id}" name="id_category" class="checkbox_categories" type="checkbox" >
                      <label class="control-label">
                      ${category.categoryName}
                      </label>
                      </div>
                    `;
                    })
                    .join("")}
                  </div>
                </div>
                
                <div class="form-group col-md-12">
                  <label class="control-label">Mô tả sản phẩm</label>
                  <textarea class="form-control" id="description" name="description" id="mota">${
                    product.description || ""
                  }</textarea>
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
export default UpdateProduct;
