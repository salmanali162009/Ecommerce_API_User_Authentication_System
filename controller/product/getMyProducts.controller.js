import Product from "../../model/Product.js";

const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({
            userId: req.userId
        });

        return res.status(200).json({
            status: 200,
            message: "Your products fetched successfully",
            products
        });

    } catch (error) {
        console.error("Get my products error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default getMyProducts;