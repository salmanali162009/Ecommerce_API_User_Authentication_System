import Product from "../../model/Product.js";
import { v2 as cloudinary } from "cloudinary";

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

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
                message: "You are not authorized to delete this product",
            });
        }

        // Cloudinary configuration
           cloudinary.config({ 
                cloud_name: 'newsvwek', 
                api_key: '894636931195182', 
                api_secret:  process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
            });

        // Delete image from Cloudinary
        if (product.imageUrl) {
            const imageUrlParts = product.imageUrl.split("/");

            const fileName = imageUrlParts.pop();
            const folderName = imageUrlParts.pop();

            const publicId = `${folderName}/${fileName.split(".")[0]}`;

            await cloudinary.uploader.destroy(publicId);
        }

        // Delete product from MongoDB
        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            status: 200,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error("Delete product error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default deleteProduct;