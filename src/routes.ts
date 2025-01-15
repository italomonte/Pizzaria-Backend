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
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController'

//ORDER
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { CloseOrderController } from './controllers/order/CloseOrderController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrderController } from './controllers/order/ListOrderController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

//ITEM
import { AddItemController } from './controllers/item/AddItemController'
import { RemoveItemController } from './controllers/item/RemoveItemController'

// MIDDLEWARES
import { isAuthenticated } from './middlewares/isAuthenticated'


// ROUTER CONFIG
const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

 
//-- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


//-- ROTAS PRODUCT


//usando express-upload
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListProductByCategoryController().handle)


//-- ROTAS ORDER
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new CloseOrderController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

//-- ROTAS ITEM
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

export { router }; 