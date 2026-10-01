import Order from "../../model/Order.js";

const getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.userId
        })
            .populate("productId")
            .sort({ createdAt: -1 })
            

        return res.status(200).json({
            status: 200,
            message: "Recent orders fetched successfully",
            orders
        });

    } catch (error) {
        console.error("Get recent orders error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default getRecentOrders;