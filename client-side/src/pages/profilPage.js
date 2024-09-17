import React from 'react';
import '../styles/profilePage.css';  // ייבוא קובץ ה-CSS

const ProfilePage = () => {
  // כאן תוכל למשוך מידע מהשרת או מ-state מקומי
  const userEmail = "user@example.com";  // דוגמה בלבד

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Email: {userEmail}</p>
      {/* הוסף פרטים נוספים לפי הצורך */}
    </div>
  );
};

export default ProfilePage;
