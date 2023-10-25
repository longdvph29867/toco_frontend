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
}