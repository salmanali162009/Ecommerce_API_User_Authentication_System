import Product from "../../model/Product.js";

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Product fetched successfully",
            product
        });

    } catch (error) {
        console.error("Get single product error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default getSingleProduct;