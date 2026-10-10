import mongoose from "mongoose";
import Product from "../../model/Product.js";

const getMySingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Your product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Get my single product error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getMySingleProduct;