import {Router} from 'express'
import multer from 'multer'
// USER
import {CreateUserController} from "./controllers/user/CreateUserController"
import {AuthUserController} from "./controllers/user/AuthUserController"
import {DetailUserController} from "./controllers/user/DetailUserController"

// CATEGORY 
import {CreateCategoryController} from "./controllers/category/CreateCategoryController"
import {ListCategoryController} from "./controllers/category/ListCategoryController"

//PRODUCT
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController'

//ORDER
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { CloseOrderController } from './controllers/order/CloseOrderController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrderController } from './controllers/order/ListOrderController'
//ITEM
import { AddItemController } from './controllers/item/AddItemController'
import { RemoveItemController } from './controllers/item/RemoveItemController'

// MIDDLEWARES
import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

// ROUTER CONFIG
const router = Router();

// MULTER CONFIG: local where updates will be saveds
// CALLING FUNCTION CREATED IN multer.ts
const upload = multer(uploadConfig.upload("./tmp"))


//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

 
//-- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListProductByCategoryController().handle)


//-- ROTAS ORDER
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new CloseOrderController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

//-- ROTAS ITEM
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

export { router }; 