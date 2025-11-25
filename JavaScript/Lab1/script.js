document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneNumberInput = document.getElementById('phoneNumber');
    
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const successMessage = document.getElementById('successMessage');
    
    // Hide all error messages initially
    function hideAllErrors() {
        fullNameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        phoneNumberError.style.display = 'none';
        successMessage.style.display = 'none';
    }
    
    // Validate full name
    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        if (fullName === '') {
            fullNameError.innerText = 'Full name is required';
            fullNameError.style.display = 'block';
            return false;
        }
        
        // Check if full name contains only letters and spaces
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(fullName)) {
            fullNameError.innerText = 'Full name can only contain letters and spaces';
            fullNameError.style.display = 'block';
            return false;
        }
        
        fullNameError.style.display = 'none';
        return true;
    }
    
    // Validate email
    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            emailError.innerText = 'Email is required';
            emailError.style.display = 'block';
            return false;
        }
        
        // Check if email contains @ and .
        if (!email.includes('@') || !email.includes('.')) {
            emailError.innerText = 'Email must contain "@" and "."';
            emailError.style.display = 'block';
            return false;
        }
        
        // More comprehensive email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.innerText = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        }
        
        emailError.style.display = 'none';
        return true;
    }
    
    // Validate password
    function validatePassword() {
        const password = passwordInput.value;
        if (password === '') {
            passwordError.innerText = 'Password is required';
            passwordError.style.display = 'block';
            return false;
        }
        
        if (password.length < 6) {
            passwordError.innerText = 'Password must be at least 6 characters';
            passwordError.style.display = 'block';
            return false;
        }
        
        passwordError.style.display = 'none';
        return true;
    }
    
    // Validate confirm password
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            confirmPasswordError.innerText = 'Please confirm your password';
            confirmPasswordError.style.display = 'block';
            return false;
        }
        
        if (password !== confirmPassword) {
            confirmPasswordError.innerText = 'Passwords do not match';
            confirmPasswordError.style.display = 'block';
            return false;
        }
        
        confirmPasswordError.style.display = 'none';
        return true;
    }
    
    // Validate phone number
    function validatePhoneNumber() {
        const phoneNumber = phoneNumberInput.value.trim();
        if (phoneNumber === '') {
            phoneNumberError.innerText = 'Phone number is required';
            phoneNumberError.style.display = 'block';
            return false;
        }
        
        // Check if phone number contains only digits
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phoneNumber)) {
            phoneNumberError.innerText = 'Phone number must contain only digits';
            phoneNumberError.style.display = 'block';
            return false;
        }
        
        // Check if phone number has a reasonable length
        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            phoneNumberError.innerText = 'Phone number must be between 10 and 15 digits';
            phoneNumberError.style.display = 'block';
            return false;
        }
        
        phoneNumberError.style.display = 'none';
        return true;
    }
    
    // Real-time validation as user types
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    phoneNumberInput.addEventListener('blur', validatePhoneNumber);
    
    // Real-time validation for confirm password when password changes
    passwordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Hide all errors before validation
        hideAllErrors();
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneNumberValid = validatePhoneNumber();
        
        // If all validations pass
        if (isFullNameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isPhoneNumberValid) {
            successMessage.style.display = 'block';
            
            // Reset form after successful registration
            setTimeout(function() {
                form.reset();
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
});