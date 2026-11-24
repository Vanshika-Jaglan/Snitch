import express from "express";
import multer from "multer";
import { createProductValidator, listProductValidator, unlistProductValidator } from "../validators/product.validator.js";
import { authenticate, authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, listAllProducts, listAllProductsToSeller, listProduct, unlistProduct } from "../controllers/product.controller.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        files:5,
        fileSize: 1*1024*1024
    }
})

const router = express();

//Create and save the data of product into DB, images will be stored on imagekit
//access to seller
router.post("/", authenticate, authenticateSeller,
    upload.array("images"), 
    (req,res,next)=>{
        req.body?.price && (req.body.price = JSON.parse(req.body.price));
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
        next()
    },
    createProductValidator,
    createProduct
)

//Read all the published products from DB
//access to user
router.get("/", authenticate, listAllProducts)

//Read all the products from DB
router.patch("/", authenticate, authenticateSeller, listAllProductsToSeller)

//Unlist a product by its id
router.patch("/unlist/:id", authenticate, authenticateSeller, unlistProductValidator, unlistProduct)

//list a product
router.patch("/unlist/:id", authenticate, authenticateSeller, listProductValidator, listProduct)

export default router;