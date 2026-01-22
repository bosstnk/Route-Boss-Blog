export function validateSignUpForm(form) {
    const {name, username, email, password} = form
    const errors = {}
     
    if(!name) {
        errors.name = "Enter full name"
    }

    if(!username) {
        errors.username = "Enter username"
    }

    if(!email) {
        errors.email = "Enter a email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Email must be a valid email"
    }

    if(!password) {
        errors.password = "Enter a password"
    } else if (password.length < 8) {
        errors.password = "Use 8 characters or more for your password"
    }

    return errors
}