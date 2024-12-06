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

## Getting NASA APOD API Key

To use this application, you'll need an API key from NASA. Here's how to get one:

1. Visit the NASA API portal: [https://api.nasa.gov](https://api.nasa.gov)
2. Scroll down to the "Generate API Key" section
3. Fill out the form with:
   - Your First Name
   - Last Name
   - Email address
   - Intended use of the API (optional)
4. Click "Signup" to get your API key
5. You'll receive your API key immediately on the website and in your email

### Using the API Key

1. Once you have your API key, replace the `DEMO_KEY` in `script.js` with your actual API key:
```javascript
const myAPIKey = "YOUR_API_KEY_HERE";
```

### API Limits
- With `DEMO_KEY`: 
  - Hourly Limit: 30 requests per IP address per hour
  - Daily Limit: 50 requests per IP address per day

- With Generated API Key:
  - Hourly Limit: 1,000 requests per hour
  - Daily Limit: No daily limit

### API Parameters
The APOD API accepts several parameters:
- `date`: The date of the APOD image to retrieve (YYYY-MM-DD format)
- `api_key`: Your API key
- `hd`: Boolean indicating whether to return HD images (optional)

Example API URL:
```
https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY&date=2023-11-15
```

### Security Note
- Never commit your API key to version control
- Consider using environment variables for production
- The `DEMO_KEY` is fine for testing but has limited requests

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
