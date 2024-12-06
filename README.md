# Astronomy Picture of the Day (APOD) Project

## Overview
This project creates a web application that displays NASA's Astronomy Picture of the Day using the NASA APOD API. Users can select different dates to view historical astronomical images and their descriptions.

## Features
- Display astronomical images and their descriptions
- Date selection functionality
- Future date validation
- Responsive design for all screen sizes
- Clean and modern UI

## Implementation Details

### HTML Structure
- Header with project title
- Date input field
- Container for APOD content (image, title, and description)

### CSS Styling
- Responsive layout using media queries
- Modern design with card-like container
- Image responsiveness with max-width
- Typography optimization for readability
- Shadow effects for depth
- Color scheme using blue and warm yellow tones

### JavaScript Functionality

#### 1. Date Validation
```javascript
function isEnterDateTrue(now, pictureDate) {
    const selectedDate = new Date(pictureDate);
    // Set time to midnight for accurate date comparison
    selectedDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    return selectedDate <= now;
}
```
This function:
- Converts input date to Date object
- Sets time to midnight for accurate comparison
- Returns false if selected date is in the future

#### 2. API Integration
```javascript
function getInformation() {
    const pictureDate = document.querySelector('#pictureDate').value;
    const now = new Date();
    
    // Validate date before API call
    if (!isEnterDateTrue(now, pictureDate)) {
        alert("Please select a date that is not in the future!");
        return;
    }

    // Fetch APOD data
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${pictureDate}`)
        .then(response => response.json())
        .then(data => showData(data))
}
```

#### 3. Content Display
```javascript
function showData(obj) {
    if(obj.media_type === "image") {
        apodContainer.innerHTML = "";
        // Create and append image
        const image = document.createElement('img');
        image.src = obj.url;
        image.alt = obj.title;
        
        // Create and append title
        const title = document.createElement('h3');
        title.textContent = obj.title;
        
        // Create and append description
        const explanation = document.createElement('p');
        explanation.textContent = obj.explanation;
        
        // Add all elements to container
        apodContainer.append(image, title, explanation);
    }
}
```

## Key Features Explained

### Date Validation
- Prevents selection of future dates
- Ensures accurate date comparison by:
  - Converting string dates to Date objects
  - Setting time to midnight
  - Using proper comparison operators

### Dynamic Content Loading
- Clears previous content before loading new data
- Creates DOM elements dynamically
- Handles different types of media (currently images)
- Displays title and detailed explanation

### Responsive Design
- Images scale properly on all devices
- Typography adjusts for different screen sizes
- Maintains readability on mobile devices

## Usage
1. Open the application in a web browser
2. Select a date using the date picker
3. View the astronomical image and its description
4. Try selecting different dates to explore more images

## Error Handling
- Validates dates to prevent future selections
- Shows alert messages for invalid dates
- Prevents API calls for invalid dates

## Future Improvements
- Add loading indicators
- Implement error handling for API failures
- Add support for video content
- Include image download functionality
- Add sharing capabilities
