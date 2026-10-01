import Product from "../../model/Product.js";

const getAllProducts = async (req, res) => {
    try {
        // Page number
        const page = parseInt(req.query.page) || 1;

        // Har page par 30 products
        const limit = 30;

        // Skip calculate
        const skip = (page - 1) * limit;

        // Products fetch
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Total products
        const totalProducts = await Product.countDocuments();

        // Total pages
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            status: 200,
            message: "Products fetched successfully",
            currentPage: page,
            productsPerPage: limit,
            totalProducts,
            totalPages,
            products
        });

    } catch (error) {
        console.error("Get all products error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default getAllProducts;