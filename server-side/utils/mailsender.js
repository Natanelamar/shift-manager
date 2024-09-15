const transporter = require("../config/mailerConfig");

/**
 * Sends an email using the configured transporter
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email text content
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Shift Manager" <noreply@shiftmanager.com>',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
