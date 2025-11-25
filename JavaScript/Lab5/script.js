document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsDiv = document.getElementById('results');

    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.trim(); // Trim leading/trailing spaces

        if (text === '') {
            resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
            resultsDiv.style.display = 'block';
            return;
        }

        // Character count
        const charCount = text.length;

        // Word count: Split by whitespace, filter out empty strings (handles multiple spaces)
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // Reversed text
        const reversedText = text.split('').reverse().join('');

        // Display results
        resultsDiv.innerHTML = `
            <p>Total Characters: ${charCount}</p>
            <p>Total Words: ${wordCount}</p>
            <p>Reversed Text:</p>
            <div class="reversed">${reversedText}</div>
        `;
        resultsDiv.style.display = 'block';
    });
});