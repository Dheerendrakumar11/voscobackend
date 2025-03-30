require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ensure required environment variables exist
const { AUTH0_DOMAIN, EMAIL_USER, EMAIL_PASS } = process.env;
if (!AUTH0_DOMAIN || !EMAIL_USER || !EMAIL_PASS) {
  console.error("Missing required environment variables!");
  process.exit(1);
}

// Email sender function
const sendEmail = async (email, token) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Your Authentication Token",
      text: `Your authentication token is: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

// Auth callback endpoint
app.post("/auth/callback", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Validate token with Auth0
    const response = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userEmail = response.data?.email;
    if (!userEmail) {
      return res.status(400).json({ error: "User email not found" });
    }

    // Send authentication token via email
    await sendEmail(userEmail, token);

    res.json({ message: "Token validated and email sent!" });
  } catch (error) {
    console.error("Auth callback error:", error.response?.data || error.message);
    res.status(400).json({ error: "Invalid token or Auth0 issue" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
