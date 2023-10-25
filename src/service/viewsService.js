import { https } from "./config"

export const viewsService = {
    getCatagories: () => {
        return https.get('/categories')
    }
}