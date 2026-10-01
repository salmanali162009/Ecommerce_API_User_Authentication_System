import express from 'express'
import createProduct from '../controller/product/createproduct.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import upload from "../middleware/upload.middleware.js";
import getMyProducts from "../controller/product/getMyProducts.controller.js";
import getRecentOrders from "../controller/product/getRecentOrders.controller.js";
import createOrder from "../controller/product/createOrder.controller.js";
import getSellerOrders from "../controller/product/getSellerOrders.controller.js";
import getAllProducts from "../controller/product/getAllProduct.controller.js";
import getSingleProduct from "../controller/product/getSingleProduct.controller.js";
import updateOrderStatus from "../controller/product/updateOrderStatus.controller.js";
import cancelOrder from "../controller/product/cancelOrder.controller.js";
import deleteOrder from "../controller/product/deleteOrder.controller.js";
import updateProduct from "../controller/product/updateProduct.controller.js";
import deleteProduct from "../controller/product/deleteProduct.controller.js";
import searchProducts from "../controller/searchProduct/searchProducts.controller.js";

const router =  express.Router()


router.use('/create-product',authMiddleware,upload.single("image"),createProduct)
router.get(
    "/my-products",
    authMiddleware,
    getMyProducts
);

router.get(
    "/recent-orders",
    authMiddleware,
    getRecentOrders
);

router.post(
    "/create-order",
    authMiddleware,
    createOrder
);

router.get(
    "/seller-orders",
    authMiddleware,
    getSellerOrders
);
router.get(
    "/all-products",
    getAllProducts
);
router.get(
    "/products/:id",
    getSingleProduct
);
router.put(
    "/:id/status",
    authMiddleware,
    updateOrderStatus
);

router.put(
    "/:id/cancel",
    authMiddleware,
    cancelOrder
);

router.delete(
    "/order/:id",
    authMiddleware,
    deleteOrder
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateProduct
);
router.delete(
    "/my-products/:id",
    authMiddleware,
    deleteProduct
);

router.get("/search", searchProducts);
export default router