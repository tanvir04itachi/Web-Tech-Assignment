document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const userTypeSelect = document.getElementById('userType');
    const rollNumberGroup = document.getElementById('rollNumberGroup');
    const departmentGroup = document.getElementById('departmentGroup');
    const rollNumberInput = document.getElementById('rollNumber');
    const departmentInput = document.getElementById('department');
    const rollNumberError = document.getElementById('rollNumberError');
    const departmentError = document.getElementById('departmentError');
    const registrationForm = document.getElementById('registrationForm');

    // Function to validate numbers only (for roll number)
    function validateNumbersOnly(input) {
        // Regular expression to allow only numbers
        const numbersRegex = /^\d+$/;
        return numbersRegex.test(input);
    }

    // Function to validate text only (for department)
    function validateTextOnly(input) {
        // Regular expression to allow only letters, spaces, hyphens, and apostrophes
        const textRegex = /^[A-Za-z\s\-']+$/;
        return textRegex.test(input);
    }

    // Function to show/hide fields based on user type
    function toggleFields() {
        const userType = userTypeSelect.value;
        
        // Hide both fields initially
        rollNumberGroup.style.display = 'none';
        departmentGroup.style.display = 'none';
        
        // Remove required attributes and clear errors
        rollNumberInput.removeAttribute('required');
        departmentInput.removeAttribute('required');
        
        // Clear errors and reset styles
        rollNumberError.style.display = 'none';
        departmentError.style.display = 'none';
        rollNumberInput.classList.remove('input-error', 'input-success');
        departmentInput.classList.remove('input-error', 'input-success');
        rollNumberInput.style.borderColor = '#e1e5e9';
        departmentInput.style.borderColor = '#e1e5e9';
        
        // Show relevant fields based on selection
        if (userType === 'student') {
            rollNumberGroup.style.display = 'block';
            rollNumberInput.setAttribute('required', 'true');
            rollNumberGroup.classList.add('show');
        } else if (userType === 'teacher') {
            departmentGroup.style.display = 'block';
            departmentInput.setAttribute('required', 'true');
            departmentGroup.classList.add('show');
        }
    }

    // Event listener for roll number input validation (numbers only)
    rollNumberInput.addEventListener('input', function() {
        const rollNumberValue = rollNumberInput.value;
        
        if (rollNumberValue === '') {
            rollNumberError.style.display = 'none';
            rollNumberInput.classList.remove('input-error', 'input-success');
            return;
        }
        
        if (!validateNumbersOnly(rollNumberValue)) {
            rollNumberError.textContent = 'Roll number can only contain numbers (0-9)';
            rollNumberError.style.display = 'block';
            rollNumberInput.classList.add('input-error');
            rollNumberInput.classList.remove('input-success');
        } else {
            rollNumberError.style.display = 'none';
            rollNumberInput.classList.remove('input-error');
            rollNumberInput.classList.add('input-success');
        }
    });

    // Event listener for department input validation (text only)
    departmentInput.addEventListener('input', function() {
        const departmentValue = departmentInput.value;
        
        if (departmentValue === '') {
            departmentError.style.display = 'none';
            departmentInput.classList.remove('input-error', 'input-success');
            return;
        }
        
        if (!validateTextOnly(departmentValue)) {
            departmentError.textContent = 'Department name cannot contain numbers or special characters (except hyphens and apostrophes)';
            departmentError.style.display = 'block';
            departmentInput.classList.add('input-error');
            departmentInput.classList.remove('input-success');
        } else {
            departmentError.style.display = 'none';
            departmentInput.classList.remove('input-error');
            departmentInput.classList.add('input-success');
        }
    });

    // Event listeners for blur validation
    rollNumberInput.addEventListener('blur', function() {
        const rollNumberValue = rollNumberInput.value;
        
        if (rollNumberValue && !validateNumbersOnly(rollNumberValue)) {
            rollNumberError.textContent = 'Please enter a valid roll number with numbers only';
            rollNumberError.style.display = 'block';
            rollNumberInput.classList.add('input-error');
        }
    });

    departmentInput.addEventListener('blur', function() {
        const departmentValue = departmentInput.value;
        
        if (departmentValue && !validateTextOnly(departmentValue)) {
            departmentError.textContent = 'Please enter a valid department name without numbers';
            departmentError.style.display = 'block';
            departmentInput.classList.add('input-error');
        }
    });

    // Event listener for user type selection
    userTypeSelect.addEventListener('change', toggleFields);

    // Form submission handler
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const userType = userTypeSelect.value;
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        
        if (!userType) {
            alert('Please select a user type');
            return;
        }
        
        if (userType === 'student') {
            const rollNumber = rollNumberInput.value;
            if (!rollNumber) {
                alert('Please enter your roll number');
                return;
            }
            
            // Final validation for roll number
            if (!validateNumbersOnly(rollNumber)) {
                rollNumberError.textContent = 'Roll number can only contain numbers';
                rollNumberError.style.display = 'block';
                rollNumberInput.classList.add('input-error');
                rollNumberInput.focus();
                return;
            }
            
            alert(`Student Registration Successful!\n\nName: ${fullName}\nEmail: ${email}\nRoll Number: ${rollNumber}`);
        } else if (userType === 'teacher') {
            const department = departmentInput.value;
            if (!department) {
                alert('Please enter your department');
                return;
            }
            
            // Final validation for department
            if (!validateTextOnly(department)) {
                departmentError.textContent = 'Department name cannot contain numbers or special characters';
                departmentError.style.display = 'block';
                departmentInput.classList.add('input-error');
                departmentInput.focus();
                return;
            }
            
            alert(`Teacher Registration Successful!\n\nName: ${fullName}\nEmail: ${email}\nDepartment: ${department}`);
        }
        
        // Reset form
        registrationForm.reset();
        toggleFields(); // Reset field visibility
    });

    // Initialize form state
    toggleFields();
});