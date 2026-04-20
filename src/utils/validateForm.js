export function validateSignUpForm(form) {
  const { name, username, email, password } = form
  const errors = {}

  if (!name.trim()) {
    errors.name = "Please enter your full name";
  }

  if (!username.trim()) {
    errors.username = "Please enter a username";
  }

  if (!email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please enter a password";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors
}

export function validateLoginForm(form) {
  const { email, password } = form
  const errors = {}

  if (!email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please enter a password";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors
}

export function validateUpdateProfileForm(form) {
  const errors = {};

  // 🔤 name
  if (form.name !== undefined) {
    const name = form.name.trim();

    if (name.length === 0) {
      errors.name = "Name is required";
    } else if (name.length > 100) {
      errors.name = "Name must be less than 100 characters";
    }
  }

  // 🧑 username
  if (form.username !== undefined) {
    const username = form.username.trim();

    if (username.length === 0) {
      errors.username = "Username is required";
    } else if (username.length > 50) {
      errors.username = "Username must be less than 50 characters";
    }
  }

  // 📝 bio
  if (form.bio !== undefined) {
    const bio = form.bio.trim();

    if (bio.length > 120) {
      errors.bio = "Bio must be less than 120 characters";
    }
  }

  return errors;
}

export function validateResetPasswordForm(form) {
  const errors = {};

  const currentPassword = form.currentPassword?.trim() || "";
  const newPassword = form.newPassword?.trim() || "";
  const confirmPassword = form.confirmPassword?.trim() || "";

  // 🔐 current password
  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  // 🔐 new password
  if (!newPassword) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }

  // 🔁 confirm password
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (newPassword && confirmPassword !== newPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}