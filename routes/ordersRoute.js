const express = require("express");
const { message } = require("statuses");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not defined in environment variables');
    process.exit(1);
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Order = require('../models/orderModel');

router.post("/placeorder", async (req, res) => {
    console.log("Received request to place order");
    const { token, subtotal, currentUser, cartItems } = req.body;

    try {
        console.log("Creating Stripe customer");
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        console.log("Creating Stripe charge");
        const payment = await stripe.paymentIntents.create({
            amount: subtotal * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            automatic_payment_methods: {
                enabled: true,
            },
        }, {
            idempotencyKey: uuidv4()
        });

        if(payment) {
            console.log("Payment successful");
            const neworder = new Order({
                name : currentUser.name,
                email : currentUser.email,
                userid : currentUser._id,
                orderItems : cartItems,
                orderAmount : subtotal,
                shippingAddress : {
                    street : token.card.address_line1,
                    city : token.card.address_city,
                    country : token.card.address_country,
                    pincode : token.card.address_zip,
                },
                transactionId : payment.id
            });
            await neworder.save();
            res.status(200).send('Order placed successfully');
        } else {
            res.status(400).send('Payment failed');
        }
        
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(400).json({ message: 'Something went wrong', error });
    }
});

router.post("/getuserorders",async(req,res)=>{
    const {userid}= req.body
    try {
        const orders = await Order.find({userid : userid}).sort({_id : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message : 'something went wrong'});
    }
});

router.get("/getallorders", async (req, res) =>{
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message : 'something went wrong'});
    }
});

router.post("/deliverorder", async (req, res) => {
    const { orderid } = req.body;
    try {
      const order = await Order.findOne({ _id: orderid });
      order.isDelivered = true;
      await order.save(); // Save the updated order in the database
  
      res.send("Order Delivered Successfully");
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
  
module.exports = router