import { https } from "./config";

export const adminService = {
  getCategories: () => {
    return https.get("/categories");
  },
  getCategoriesDetail: (id) => {
    return https.get(`/categories/${id}`);
  },
  postCategories: (data) => {
    return https.post("/categories", data);
  },
  updateCategories: (id, data) => {
    return https.put(`/categories/${id}`, data);
  },
  deleteCategories: (id) => {
    return https.delete(`/categories/${id}`);
  },
  // products
  getProducts: () => {
    return https.get("/products");
  },
  postProducts: (data) => {
    return https.post("/products", data);
  },
  getProductDetail: (slug) => {
    return https.get(`/products/${slug}`);
  },
  updateProduct: (id, data) => {
    return https.put(`/products/${id}`, data);
  },
  deleteProductDetail: (id) => {
    return https.delete(`/products/${id}`);
  },
  // users
  getUsers: () => {
    return https.get("users");
  },
  getUserDetail: (id) => {
    return https.get(`users/${id}`);
  },
  postUsers: (data) => {
    return https.post("users", data);
  },
  updateUsers: (id, data) => {
    return https.put(`users/${id}`, data);
  },
  deleteUsers: (id) => {
    return https.delete(`users/${id}`);
  },
  // Toppings
  getToppings: () => {
    return https.get("/toppings");
  },
  postToppings: (data) => {
    return https.post("/toppings", data);
  },
  getTopingDetail: (id) => {
    return https.get(`toppings/${id}`);
  },
  updateTopping: (id, data) => {
    return https.put(`toppings/${id}`, data);
  },
  deleteTopping: (id) => {
    return https.delete(`toppings/${id}`);
  },
};
