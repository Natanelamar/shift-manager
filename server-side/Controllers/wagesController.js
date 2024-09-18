const UserShifts = require('../models/shiftModel'); 

exports.calculateWages = async (req, res) => {
  try {
    const { username, startDate, endDate } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      const { startOfMonth, today } = getCurrentMonthRange();
      start = startOfMonth;
      end = today;
    }

    const userShifts = await UserShifts.findOne({
      username,
      "workplaces.shifts.date": { $gte: start, $lte: end }
    });

    if (!userShifts) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalWages = 0;

    userShifts.workplaces.forEach(workplace => {
      workplace.shifts.forEach(shift => {
        const shiftDate = new Date(shift.date);
        if (shiftDate >= start && shiftDate <= end) {
          totalWages += workplace.hourlyRate * shift.hoursWorked;
        }
      });
    });

    res.status(200).json({ message: "Wages calculated successfully", totalWages });
  } catch (error) {
    console.error("Error calculating wages:", error);
    res.status(500).json({ message: "Error calculating wages", error });
  }
};

// פונקציה להחזרת טווח החודש הנוכחי
const getCurrentMonthRange = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return { startOfMonth, today };
};
