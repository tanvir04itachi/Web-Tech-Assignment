// Get references to elements
const nameInput = document.getElementById('name');
const rollInput = document.getElementById('roll');
const departmentInput = document.getElementById('department');
const addButton = document.getElementById('add-student');
const tableBody = document.querySelector('#student-table tbody');

// Function to validate inputs
function validateInputs(name, roll, department) {
    // Check if any field is empty
    if (!name || !roll || !department) {
        alert('Please fill in all fields before adding a student.');
        return false;
    }
    
    // Validate Name: Only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        alert('Name must contain only letters and spaces.');
        return false;
    }
    
    // Validate Roll: Must be a number
    if (isNaN(roll) || roll.trim() === '') {
        alert('Roll must be a valid number.');
        return false;
    }
    
    // Validate Department: Only letters and spaces
    const deptRegex = /^[a-zA-Z\s]+$/;
    if (!deptRegex.test(department)) {
        alert('Department must contain only letters and spaces.');
        return false;
    }
    
    return true;
}

// Add event listener to the "Add Student" button
addButton.addEventListener('click', () => {
    // Get input values
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const department = departmentInput.value.trim();
    
    // Validate inputs
    if (!validateInputs(name, roll, department)) {
        return; // Stop if validation fails
    }
    
    // Create a new table row
    const newRow = document.createElement('tr');
    
    // Create cells for Name, Roll, Department
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    
    const rollCell = document.createElement('td');
    rollCell.textContent = roll;
    
    const departmentCell = document.createElement('td');
    departmentCell.textContent = department;
    
    // Create Action cell with Delete button
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    
    // Add event listener to Delete button
    deleteButton.addEventListener('click', () => {
        // Remove the row from the table
        tableBody.removeChild(newRow);
    });
    
    actionCell.appendChild(deleteButton);
    
    // Append cells to the row
    newRow.appendChild(nameCell);
    newRow.appendChild(rollCell);
    newRow.appendChild(departmentCell);
    newRow.appendChild(actionCell);
    
    // Append the row to the table body
    tableBody.appendChild(newRow);
    
    // Clear input fields after adding
    nameInput.value = '';
    rollInput.value = '';
    departmentInput.value = '';
});