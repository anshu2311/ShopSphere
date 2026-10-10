const express = require("express");
const router = express.Router();
const subsriber = require("../models/Subscriber");

// @route POST /api/subscribers
// @desc add a new subscriber
// @access Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
   // check if the email is already subscribed
   let subscriber = await subsriber.findOne({ email });
   if (subscriber) {
    return res.status(400).json({ message: "Email is already subscribed" });
   }

   // Create a new subscriber
   subscriber = new subsriber({ email });
   await subscriber.save();
   res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;