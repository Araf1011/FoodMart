import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import SSLCommerzPayment from 'sslcommerz-lts';

// global variables
const currency = 'BDT'
const deliveryCharge = 40

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using SSLCommerz Method
const placeOrderSSL = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "SSLCommerz",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const trans_id = newOrder._id.toString();

        const data = {
            total_amount: amount,
            currency: currency,
            tran_id: trans_id,
            success_url: `${process.env.BACKEND_URL}/api/order/verifySSL/${trans_id}`,
            fail_url: `${process.env.BACKEND_URL}/api/order/failSSL/${trans_id}`,
            cancel_url: `${process.env.BACKEND_URL}/api/order/cancelSSL/${trans_id}`,
            ipn_url: `${process.env.BACKEND_URL}/api/order/ipn`,
            shipping_method: 'Courier',
            product_name: 'Food Items',
            product_category: 'Food',
            product_profile: 'general',
            cus_name: address.firstName,
            cus_email: address.email,
            cus_add1: address.street,
            cus_city: address.city,
            cus_postcode: address.zipcode,
            cus_country: 'Bangladesh',
            cus_phone: address.phone,
            ship_name: address.firstName,
            ship_add1: address.street,
            ship_city: address.city,
            ship_state: address.state,
            ship_postcode: address.zipcode,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(process.env.SSLCOMMERZ_STORE_ID, process.env.SSLCOMMERZ_STORE_PASSWORD, process.env.SSLCOMMERZ_IS_LIVE === 'true' ? true : false)

        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.json({ success: true, GatewayPageURL })
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify SSLCommerz Payment
const verifySSL = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderInfo = await orderModel.findById(orderId);

        if (orderInfo) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(orderInfo.userId, { cartData: {} });
            res.redirect(`${process.env.FRONTEND_URL}/myorders`);
        } else {
            res.redirect(`${process.env.FRONTEND_URL}/cart`);
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Order Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderSSL, allOrders, userOrders, updateStatus, verifySSL }
