const bcrypt = require("bcrypt");
const { validationResult } = require("../middlewares/validation");
const User = require("../models/usersModel"); // ייבוא המודל של המשתמש
const transporter = require("../config/mailerConfig"); // הגדרות אימייל
// const transporter = require("../config/mailerConfig");

const checkUserCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return { success: false, error: "Invalid username or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, error: "Invalid username or password" };
  }

  return { success: true, user };
};

// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const { success, error } = await checkUserCredentials(username, password);
//     if (!success) {
//       return res.status(400).json({ error });
//     }

//     res.json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const verificationMail = async (req, res) => {
//   // Generate a random 6-digit confirmation code
//   const confirmationCode = Math.floor(100000 + Math.random() * 900000);

//   const mailOptions = {
//     from: '"Shift Manager" <noreply@shiftmanager.com>',
//     to: email,
//     subject: "Confirm your registration",
//     text: `Your confirmation code is: ${confirmationCode}`,
//   };

//   try {
//     // Send the confirmation email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({
//       message:
//         "Registration successful. Check your email for the confirmation code.",
//     });
//   } catch (error) {
//     console.error("Error sending email", error);
//     res.status(500).json({ message: "Error sending email. Please try again." });
//   }
// };

// exports.register = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, firstName, lastName, username, password } = req.body;

//   try {
//     // בדיקה אם המשתמש כבר קיים
//     const { success, error } = await checkUserCredentials(username, password);
//     if (success) {
//       return res.status(400).json({ error: "User already registered" });
//     }

//     verificationMail(email);

//     // יצירת סיסמה מוצפנת
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // יצירת משתמש חדש ורישום למסד הנתונים
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// אובייקט שמירה זמנית לקוד האימות
let verificationCodes = {};

const register = async (req, res) => {
  // שלב 1: אימות קלט
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    // שלב 2: בדיקת אם המשתמש כבר קיים
    const { success, error } = await checkUserCredentials(username, password);
    if (success) {
      return res.status(400).json({ error: "User already registered" });
    }

    // שלב 3: יצירת ושליחת קוד האימות
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    verificationCodes[username] = { confirmationCode, password }; // שמירת קוד האימות והסיסמה הלא מוצפנת בזיכרון

    const mailOptions = {
      from: '"Shift Manager" <noreply@shiftmanager.com>',
      to: email,
      subject: "Confirm your registration",
      text: `Your confirmation code is: ${confirmationCode}`,
    };

    await transporter.sendMail(mailOptions);

    // שלב 4: החזרת טופס אימות לקוד
    return res.send(`
            <html>
                <body>
                    <h2>Email Verification</h2>
                    <form action="/verify" method="POST">
                        <input type="hidden" name="username" value="${username}" />
                        <label for="code">Enter Verification Code:</label>
                        <input type="text" id="code" name="code" required />
                        <button type="submit">Verify</button>
                    </form>
                </body>
            </html>
        `);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// פונקציה חדשה לאימות קוד האימות
const verifyCode = async (req, res) => {
  const { username, code } = req.body;

  // שלב 5: אימות הקוד שהמשתמש הזין
  if (
    verificationCodes[username] &&
    verificationCodes[username].confirmationCode == code
  ) {
    // שלב 6: הצפנת הסיסמה והכנסת המשתמש למסד הנתונים
    try {
      const passwordToHash = verificationCodes[username].password; // קבלת הסיסמה המקורית מהאובייקט הזמני
      const hashedPassword = await bcrypt.hash(passwordToHash, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // ניקוי הקוד מהזיכרון
      delete verificationCodes[username];

      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid verification code" });
  }
};

module.exports = { register, verifyCode };
