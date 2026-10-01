import Order from "../../model/Order.js";

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Find order
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }

        // Check seller ownership
        if (order.sellerId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                status: 401,
                message: "You are not authorized to delete this order",
            });
        }

        // Delete order permanently from database
        await Order.findByIdAndDelete(id);

        return res.status(200).json({
            status: 200,
            message: "Order deleted successfully",
        });

    } catch (error) {
        console.error("Delete order error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default deleteOrder;