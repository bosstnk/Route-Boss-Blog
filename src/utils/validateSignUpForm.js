export function validateSignUpForm(form) {
    const {name, username, email, password} = form
    const errors = {}
     
    if(!name) {
        errors.name = "Please enter your full name";
    }

    if(!username) {
        errors.username = "Please enter a username";
    }

    if (!email.trim()) {
        errors.email = "Please enter your email address";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!password) {
        errors.password = "Please enter a password";
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

    return errors
}