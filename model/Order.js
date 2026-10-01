import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        
        CustomerData: {
            userPhone: {
                type: String,
                required: true,
            },

            userAddress: {
                type: String,
                required: true,
            },

            userCity: {
                type: String,
                required: true,
            },

            userState: {
                type: String,
                required: true,
            },

            userPaymentMethod: {
                type: String,
                enum: ["cod", "online"],
                required: true,
            },
        },

        
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

       
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

       
        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;