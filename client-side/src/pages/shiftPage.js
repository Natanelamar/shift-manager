import React, { useEffect, useState } from 'react';
import { getShifts } from '../API/api'; // ודא שהפונקציה הזו קיימת ב-API
import '../styles/shiftsPage.css';  // ייבוא קובץ ה-CSS

const ShiftsPage = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await getShifts();  // הנחה שזו פונקציה מה-API
        setShifts(data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div className="shifts-page">
      <h2>Shifts</h2>
      <ul>
        {shifts.map((shift, index) => (
          <li key={index}>
            {shift.date} - {shift.hours} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftsPage;
