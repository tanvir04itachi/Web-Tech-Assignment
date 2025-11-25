// Function to change background color (cycles through a few colors)
function changeBackgroundColor() {
    const textElement = document.getElementById('sampleText');
    const colors = ['white', 'lightblue', 'lightgreen', 'lightyellow', 'lightcoral'];
    let currentColor = textElement.style.backgroundColor || 'white';
    let nextIndex = (colors.indexOf(currentColor) + 1) % colors.length;
    textElement.style.backgroundColor = colors[nextIndex];
}

// Function to increase font size step by step
function increaseFontSize() {
    const textElement = document.getElementById('sampleText');
    let currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
    textElement.style.fontSize = (currentSize + 2) + 'px'; // Increase by 2px each click
}

// Function to center the text
function centerText() {
    const textElement = document.getElementById('sampleText');
    textElement.style.textAlign = 'center';
}

// Function to reset styles to default
function resetStyle() {
    const textElement = document.getElementById('sampleText');
    textElement.style.backgroundColor = 'white';
    textElement.style.fontSize = '16px';
    textElement.style.textAlign = 'left';
}