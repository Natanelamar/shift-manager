const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: { type: Date, required: true },  // תאריך המשמרת
    hoursWorked: { type: Number, required: true }  // כמות השעות במשמרת
});

const workplaceSchema = new mongoose.Schema({
    workplaceName: { type: String, required: true },  // שם מקום העבודה
    hourlyRate: { type: Number, required: true },  // תעריף לשעה
    shifts: [shiftSchema]  // אוסף משמרות לכל מקום עבודה
});

const userShiftsSchema = new mongoose.Schema({
    username: { type: String, required: true },  // שם המשתמש של העובד
    workplaces: [workplaceSchema]  // אוסף של מקומות עבודה
});

const UserShifts = mongoose.model('UserShifts', userShiftsSchema);
module.exports = UserShifts;
