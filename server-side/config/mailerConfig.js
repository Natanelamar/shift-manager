const nodemailer = require("nodemailer");

// Configure Nodemailer with Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST, // Ensure this is sandbox.smtp.mailtrap.io
  port: process.env.MAILTRAP_PORT, // Use port 2525 (or 465/587 if needed)
  auth: {
    user: process.env.MAILTRAP_USER, // Your Mailtrap username
    pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
  },
  secure: false, // Set to true if using port 465 (for SSL/TLS)
  tls: {
    rejectUnauthorized: false, // Optional: allows unauthorized certs for testing
  },
});

module.exports = transporter;
