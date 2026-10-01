import Product from "../../model/Product.js";
import Joi from "joi";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

const ProductSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(300).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
});

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate product data
        const { error } = ProductSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
            });
        }

        // Find product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        // Check seller ownership
        if (product.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                status: 401,
                message: "You are not authorized to update this product",
            });
        }

        // Cloudinary configuration
        cloudinary.config({ 
        cloud_name: 'newsvwek', 
        api_key: '894636931195182', 
        api_secret:  process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });

        let imageUrl = product.imageUrl;

        // If new image is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Authentication_app",
            });

            imageUrl = result.secure_url;

            // Delete temporary image
            await fs.unlink(req.file.path);

            // Delete old Cloudinary image
            if (product.imageUrl) {
                const imageUrlParts = product.imageUrl.split("/");

                const fileName = imageUrlParts.pop();
                const folderName = imageUrlParts.pop();

                const publicId = `${folderName}/${fileName.split(".")[0]}`;

                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Update product
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;
        product.category = req.body.category;
        product.imageUrl = imageUrl;

        await product.save();

        return res.status(200).json({
            status: 200,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error("Update product error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default updateProduct;