import Order from "../../model/Order.js";

const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            sellerId: req.userId
        })
            .populate("productId")
            .populate("userId", "name email phone")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: 200,
            message: "Seller orders fetched successfully",
            orders
        });

    } catch (error) {
        console.error("Get seller orders error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default getSellerOrders;