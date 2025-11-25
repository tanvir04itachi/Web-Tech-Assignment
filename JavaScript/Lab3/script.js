// Define the two CSS themes inside JavaScript as objects
const themes = {
    light: {
        body: { backgroundColor: 'white', color: 'black' },
        header: { borderColor: '#ccc' },
        main: { borderColor: '#ccc' },
        footer: { borderColor: '#ccc' }
    },
    dark: {
        body: { backgroundColor: '#333', color: 'white' },
        header: { borderColor: '#666' },
        main: { borderColor: '#666' },
        footer: { borderColor: '#666' }
    }
};

// Variable to store the current mode (starts as 'light')
let currentTheme = 'light';

// Get references to the elements
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// Add event listener to the toggle button
toggleButton.addEventListener('click', () => {
    // Switch the current theme
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Get the current theme object
    const theme = themes[currentTheme];
    
    // Apply the theme styles using DOM .style changes
    Object.assign(body.style, theme.body);
    Object.assign(header.style, theme.header);
    Object.assign(main.style, theme.main);
    Object.assign(footer.style, theme.footer);
    
    // Update the button text based on the current mode
    toggleButton.textContent = currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});