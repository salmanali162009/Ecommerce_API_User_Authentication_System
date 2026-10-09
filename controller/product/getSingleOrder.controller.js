import mongoose from "mongoose";
import Order from "../../model/order.js";

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid order ID",
      });
    }

   
    const order = await Order.findOne({
      _id: id,
      userId: req.userId,
    })
      .populate("productId")
      .populate("userId", "name email phone");

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get single order error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getSingleOrder;