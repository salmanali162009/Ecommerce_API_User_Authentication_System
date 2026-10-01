import Order from "../../model/Order.js";
import Product from "../../model/Product.js";
import Joi from "joi";

const OrderSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),

    userPhone: Joi.string().required(),
    userAddress: Joi.string().required(),
    userCity: Joi.string().required(),
    userState: Joi.string().required(),

    userPaymentMethod: Joi.string()
        .valid("cod", "online")
        .required(),
});

const createOrder = async (req, res) => {
    try {
        // Validate request body
        const { error } = OrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
            });
        }

        const {
            productId,
            quantity,
            userPhone,
            userAddress,
            userCity,
            userState,
            userPaymentMethod,
        } = req.body;

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                status: 400,
                message: "Not enough stock available",
            });
        }

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Create order
        const order = await Order.create({
            userId: req.userId,

            CustomerData: {
                userPhone,
                userAddress,
                userCity,
                userState,
                userPaymentMethod,
            },

            sellerId: product.userId,
            productId: product._id,
            quantity,
            totalPrice,
        });

        // Reduce product stock
        product.stock -= quantity;
        await product.save();

        return res.status(201).json({
            status: 201,
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default createOrder;