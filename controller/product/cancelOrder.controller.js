import Order from "../../model/Order.js";
import Product from "../../model/Product.js";

const cancelOrder = async (req, res) => {
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

        // Check order ownership
        if (order.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                status: 401,
                message: "You are not authorized to cancel this order",
            });
        }

        // Only pending orders can be cancelled
        if (order.status !== "pending") {
            return res.status(400).json({
                status: 400,
                message: `Order cannot be cancelled because its status is "${order.status}"`,
            });
        }

        // Find product
        const product = await Product.findById(order.productId);

        // Return quantity to stock
        if (product) {
            product.stock += order.quantity;
            await product.save();
        }

        // Update order status
        order.status = "cancelled";
        await order.save();

        return res.status(200).json({
            status: 200,
            message: "Order cancelled successfully",
            order,
        });

    } catch (error) {
        console.error("Cancel order error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default cancelOrder;