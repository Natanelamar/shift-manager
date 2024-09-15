const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { registerValidation } = require("./validation"); // ייבוא של פונקציות ה-validation

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

const User = require("./model");

// async function checkUserCredentials(username, password) {
//     const user = await User.findOne({ username });
//     if (!user) {
//         return { success: false, error: 'Invalid username or password' };
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return { success: false, error: 'Invalid username or password' };
//     }

//     return { success: true, user };
// }

// app.post('/register', registerValidation, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//         // בדיקה אם המשתמש כבר קיים
//         const { success, error } = await checkUserCredentials(username, password);
//         if (success) {
//             return res.status(400).json({ error: 'User already registered' });
//         }

//         // יצירת סיסמה מוצפנת
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // יצירת משתמש חדש ורישום למסד הנתונים
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/login', );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
