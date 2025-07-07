// API to manage Clerk users
//endpoint http;//localhost:4000/api/user/webhooks
import { Webhook } from "svix";
import User from "../models/user.model.js";
import razorpay from "razorpay";
import Transaction from "../models/transaction.model.js";

const clerkWebhooks = async (req, res) => {
  try {
    // create svix instance with clerk secret key
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        try {
          await User.create(userData);
        } catch (err) {
          console.log("User creation error:", err.message);
        }

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid plan selected" });
    }
  } catch (error) {
    console.log("Error in webhooks", error.message);
    res.json({ message: error.message });
  }
};

// get user credit

const userCredits = async (req, res) => {
  try {
    const clerkId = req.clerkId;

    const userData = await User.findOne({ clerkId });

    if (!userData) {
      console.log("User with clerkId not found:");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log("Error in user credits", error.message);
    res.json({ message: error.message });
  }
};

// gateway for payment instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Api to make payment
const paymentRazorpay = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { planId } = req.body;

    const userData = await User.findOne({ clerkId });

    if (!userData || !planId) {
      console.log("User with clerkId not found:");
      return res.json({ success: false, message: "User not found" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;

        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        break;
    }
    date = Date.now();

    // creating transaction
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await Transaction.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.json({ success: false, message: error });
      }

      res.json({
        success: true,
        order,
      });
    });
  } catch (error) {
    console.log("Error in paymentRazorpay", error.message, error);
    res.json({ success: false, message: error.message });
  }
};

// verify razorpay payment

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({
          success: false,
          message: "Payment already verified",
        });
      }
      // update user credit balance
      const userData = await User.findOne({ clerkId: transactionData.clerkId });
      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, {
        creditBalance,
      });

      // update transaction
      await Transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Credits added successfully" });
    }
  } catch (error) {
    console.log("Error in paymentRazorpay", error.message, error);
    res.json({ success: false, message: error.message });
  }
};
export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };
