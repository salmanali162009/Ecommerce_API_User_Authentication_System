import Order from "../../model/Order.js";
import Joi from "joi";

const StatusSchema = Joi.object({
    status: Joi.string()
        .valid("pending", "confirmed", "shipped", "delivered", "cancelled")
        .required(),
});

const updateOrderStatus = async (req, res) => {
    try {
        const { error } = StatusSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
            });
        }

        const { id } = req.params;
        const { status } = req.body;

        // Find order
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }

        // Only the seller of this order can update its status
        if (order.sellerId.toString() !== req.userId.toString()) {
            return res.status(401).json({
                status: 401,
                message: "You are not authorized to update this order",
            });
        }

        // Update status
        order.status = status;

        await order.save();

        return res.status(200).json({
            status: 200,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error("Update order status error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default updateOrderStatus;