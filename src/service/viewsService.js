import { https } from "./config"

export const viewsService = {
  getCatagories: () => {
    return https.get('/categories')
  },
  getCatagories: () => {
    return https.get('/categories')
  }
}

export const authService = {
  postRegister: (data) => {
    return https.post('/auth/signup', data)
  },
  postLogin: (data) => {
    return https.post('/auth/signin', data)
  },
}

export const cartService = {
  getCartByAccount: (account) => {
    return https.get(`/carts/${account}`)
  },
  putCart: (id ,data) => {
    return https.put(`/carts/${id}`, data)
  },
  deleteCart: (id) => {
    return https.delete(`/carts/${id}`)
  },
  addToCart: (data) => {
    return https.post(`/carts`, data)
  },


}

export const commentService = {
  getCommentByProduct: (id) => {
    return https.get(`/comments?productId=${id}`)
  },


}