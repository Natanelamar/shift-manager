// controllers/shiftController.js
const UserShifts = require('../models/shiftModel');  // נייבא את המודל

// פונקציה להוספת מקום עבודה

exports.addWorkplace = async (req, res) => {
  try {
    const { username, workplaces } = req.body;

    if (!username || !Array.isArray(workplaces) || workplaces.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // חפש את המשתמש הקיים
    let userShifts = await UserShifts.findOne({ username });

    if (!userShifts) {
      // צור משתמש חדש אם לא קיים
      userShifts = new UserShifts({
        username,
        workplaces
      });
    } else {
      // הוסף מקומות עבודה קיימים
      userShifts.workplaces.push(...workplaces);
    }

    // שמור את המסמך
    await userShifts.save();
    res.status(201).json({ message: "Workplace added successfully", data: userShifts });
  } catch (error) {
    console.error("Error adding workplace:", error);  // הוסף את זה כדי לראות את פרטי השגיאה בקונסול
    res.status(500).json({ message: "Error adding workplace", error });
  }
};

// פונקציה להוספת משמרת חדשה
exports.addShift = async (req, res) => {
  try {
    const { username, workplaceId, date, hoursWorked } = req.body;

    // בדוק אם כל השדות הנדרשים קיימים
    if (!username || !workplaceId || !date || !hoursWorked) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // מצא את המשתמש עם המשמרות
    const userShifts = await UserShifts.findOne({ username });

    if (!userShifts) {
      return res.status(404).json({ message: "User not found" });
    }

    // מצא את מקום העבודה לפי ה-id
    const workplace = userShifts.workplaces.find(wp => wp._id == workplaceId);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    // הוסף משמרת חדשה
    workplace.shifts.push({
      date: new Date(date),  // תאריך המשמרת
      hoursWorked           // שעות עבודה
    });

    // שמור את העדכונים במסד הנתונים
    await userShifts.save();

    res.status(201).json({ message: "Shift added successfully", data: userShifts });
  } catch (error) {
    console.error("Error adding shift:", error);
    res.status(500).json({ message: "Error adding shift", error });
  }
};

// פונקציה לעדכון משמרת לפי id או תאריך
exports.updateShift = async (req, res) => {
  try {
    const { username, shiftId, date, newHoursWorked } = req.body;

    if (!username || !newHoursWorked || (!shiftId && !date)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // מצא את המשתמש עם המשמרות
    const userShifts = await UserShifts.findOne({ username });

    if (!userShifts) {
      return res.status(404).json({ message: "User not found" });
    }

    let shiftToUpdate;

    // חפש את המשמרת לפי id אם קיים
    if (shiftId) {
      shiftToUpdate = userShifts.workplaces.flatMap(workplace => workplace.shifts)
        .find(shift => shift._id == shiftId);
    }

    // אם לא נמצא shiftId, חפש לפי תאריך
    if (!shiftToUpdate && date) {
      const shiftDate = new Date(date);
      shiftToUpdate = userShifts.workplaces.flatMap(workplace => workplace.shifts)
        .find(shift => new Date(shift.date).toISOString() === shiftDate.toISOString());
    }

    if (!shiftToUpdate) {
      return res.status(404).json({ message: "Shift not found" });
    }

    // עדכן את שעות העבודה
    shiftToUpdate.hoursWorked = newHoursWorked;

    // שמור את העדכון במסד הנתונים
    await userShifts.save();

    res.status(200).json({ message: "Shift updated successfully" });
  } catch (error) {
    console.error("Error updating shift:", error);
    res.status(500).json({ message: "Error updating shift", error });
  }
};

// פונקציה למחיקת משמרת לפי id או תאריך
exports.deleteShift = async (req, res) => {
  try {
    const { username, shiftId, date } = req.body;

    if (!username || (!shiftId && !date)) {
      return res.status(400).json({ message: "Username and either shiftId or date are required" });
    }

    // מצא את המשתמש עם המשמרות
    const userShifts = await UserShifts.findOne({ username });

    if (!userShifts) {
      return res.status(404).json({ message: "User not found" });
    }

    let shiftDeleted = false;

    // מחיקה לפי id
    if (shiftId) {
      userShifts.workplaces.forEach(workplace => {
        const shiftIndex = workplace.shifts.findIndex(shift => shift._id == shiftId);
        if (shiftIndex !== -1) {
          workplace.shifts.splice(shiftIndex, 1);
          shiftDeleted = true;
        }
      });
    }

    // מחיקה לפי תאריך
    if (date) {
      const shiftDate = new Date(date);
      userShifts.workplaces.forEach(workplace => {
        const shiftIndex = workplace.shifts.findIndex(shift => new Date(shift.date).toISOString() === shiftDate.toISOString());
        if (shiftIndex !== -1) {
          workplace.shifts.splice(shiftIndex, 1);
          shiftDeleted = true;
        }
      });
    }

    if (!shiftDeleted) {
      return res.status(404).json({ message: "Shift not found" });
    }

    // שמור את השינויים במסד הנתונים
    await userShifts.save();

    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (error) {
    console.error("Error deleting shift:", error);
    res.status(500).json({ message: "Error deleting shift", error });
  }
};


