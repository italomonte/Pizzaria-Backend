import {Router} from 'express'

// USER
import {CreateUserController} from "./controllers/user/CreateUserController"
import {AuthUserController} from "./controllers/user/AuthUserController"
import {DetailUserController} from "./controllers/user/DetailUserController"

// CATEGORY 
import {CreateCategoryController} from "./controllers/category/CreateCategoryController"
import {ListCategoryController} from "./controllers/category/ListCategoryController"

//PRODUCT
import { CreateProductController } from './controllers/product/CreateProductController'

// MIDDLEWARES
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

 
//-- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, new CreateProductController().handle)


export { router };