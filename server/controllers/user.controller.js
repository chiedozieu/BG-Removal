// API to manage Clerk users
//endpoint http;//localhost:4000/api/user/webhooks
import { Webhook } from "svix";
import User from "../models/user.model.js";

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
        break;
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

export { clerkWebhooks, userCredits };

