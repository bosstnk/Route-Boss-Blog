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