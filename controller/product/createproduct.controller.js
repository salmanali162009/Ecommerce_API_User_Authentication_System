import Joi from "joi";
import Product from "../../model/Product.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const ProductSchema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().max(300).required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string().required()
});

const createProduct = async (req, res) => {
    try {
        const { error } = ProductSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            });
        }
        if (!req.file) {
    return res.status(400).json({
        status: 400,
        message: "Please upload an image"
    });
}

 cloudinary.config({ 
        cloud_name: 'newsvwek', 
        api_key: '894636931195182', 
        api_secret:  process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });

  const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Authentication_app', 
    });
    fs.unlinkSync(req.file.path);

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            imageUrl:result.secure_url,
            userId:req.userId
        });

        return res.status(201).json({
            status: 201,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default createProduct;