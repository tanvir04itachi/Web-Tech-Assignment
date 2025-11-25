function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12 for midnight
    
    // Pad minutes and seconds with leading zero if needed
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Format as HH:MM:SS AM/PM
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Update the clock div
    document.getElementById('clock').innerHTML = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();