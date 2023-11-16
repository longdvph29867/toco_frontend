import * as Joi from "joi";
import {
  router,
  showMesssage,
  useEffect,
  useState,
} from "../../../utilities/lib";
import axios from "axios";
import { adminService } from "../../../service/adminService";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

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
  const schema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required().min(1),
    sale_price: Joi.number().required().min(0),
    description: Joi.string().required(),
  });

  const upload_img = async (files) => {
    const API_Upload = `https://api.cloudinary.com/v1_1/dnfoy8jtl/image/upload`;
    const PRESET_NAME = "img-toco";
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
    const formAdd = document.querySelector("#form-add");
    formAdd.onsubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(formAdd);
      const productName = formData.get("nameProduct");
      const price = formData.get("price");
      const sale_price = formData.get("salePrice");
      const checkbox_categories = document.querySelectorAll(
        ".checkbox_categories"
      );
      const description = formData.get("description");
      const files = document.querySelector("#uploadfile").files;
      console.log(files);
      const arr_categories = [];
      let id_category = [];
      checkbox_categories.forEach((checkbox_cate) => {
        if (checkbox_cate.checked) {
          id_category.push(checkbox_cate.value);
        }
      });
      if (id_category.length == 0) {
        console.log("phai chon it nhat 1 danh muc");
        return false;
      }

      if (files.length == 0) {
        console.log("phai chon it nhat 1 anh");
        return false;
      } else if (files.length > 5) {
        console.log("upload toi da duoc 5 anh");
        return false;
      } else {
        for (const img of files) {
          if (img.type !== "image/jpeg" && img.type !== "image/png") {
            console.log("Chỉ chấp nhận tệp tin ảnh JPEG hoặc PNG.");
            return false;
          } else if (img.size > 2 * 1024 * 1024) {
            console.log("Tệp quá lớn. Vui lòng chọn tệp dưới 2MB.");
            return false;
          }
        }
      }

      const dataShema = {
        productName,
        price,
        sale_price,
        description,
      };

      const { error } = schema.validate(dataShema);

      if (!error) {
        const images = await upload_img(files);
        const data = {
          productName,
          price,
          sale_price,
          description,
          images,
          id_category,
        };
        adminService
          .postProducts(data)
          .then((response) => {
            showMesssage(true, response.data.message);
            router.navigate("/admin/products");
          })
          .catch((error) => {
            showMesssage(false, error.response.data.message);
          });
      }
    };
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
              <form class="row" id="form-add">
                <div class="form-group col-md-3">
                  <label class="control-label">Tên sản phẩm</label>
                  <input name="nameProduct" class="form-control" type="text">
                </div>
  
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá gốc</label>
                  <input name="price"  class="form-control" type="number">
                </div>
                <div class="form-group  col-md-3">
                  <label class="control-label">Giá khuyến mãi</label>
                  <input name="salePrice" class="form-control" type="number">
                </div>
                
                <div class="form-group col-md-12">
                  <label class="control-label">Ảnh sản phẩm</label>
                  <div id="myfileupload">
                    <input type="file" id="uploadfile" name="ImageUpload" multiple/>
                  </div>

                </div>
                <div class="form-group col-md-12">
                  <label for="exampleSelect1" class="control-label">Danh mục</label>
                  <div class="row">
                  ${categories
                    .map((categorie) => {
                      return `
                    <label class="control-label col-md-3">
                       <input class="checkbox_categories" type="checkbox" value="${categorie._id}">
                       ${categorie.categoryName}
                    </label>
                    `;
                    })
                    .join("")}
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label class="control-label">Mô tả sản phẩm</label>
                  <textarea class="form-control" name="description" id="mota"></textarea>
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
