import React from "react";
import image1 from "";

function FormCard() {
  return (
    <div id="form-card">
      <h3>Register or Log In</h3>
      <form method="POST" action="/your-action-url">
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="email" name="email" placeholder="Email" required />

        {/* Buttons for Register and Log In */}
        <button
          type="submit"
          name="action"
          value="register"
          class="btn-primary"
        >
          Register
        </button>
        <button type="submit" name="action" value="login" class="btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
}

export default FormCard;
