import Product from "../../model/Product.js";

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.query;

        // Check keyword
        if (!keyword || keyword.trim() === "") {
            return res.status(400).json({
                status: 400,
                message: "Search keyword is required",
            });
        }

        // Search products
        const products = await Product.find({
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    category: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ],
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            status: 200,
            message: "Search results fetched successfully",
            keyword,
            totalProducts: products.length,
            products,
        });

    } catch (error) {
        console.error("Search products error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default searchProducts;