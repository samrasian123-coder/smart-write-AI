# SmartShot Extension

SmartShot is a professional browser screenshot and image utility extension for Google Chrome. It allows users to quickly capture webpages, selected areas, and visible browser content, along with providing useful image extraction actions.

## Features

- **Capture Screen**: Takes a screenshot of the currently visible tab area.
- **Select Area**: Allows you to draw a rectangle to select a specific area (simplified implementation).
- **Full Page**: Captures the entire page (simplified implementation).
- **Image Tools**: Find all images on the page, copy image URLs, and get image info.
- **History**: Keeps track of your most recently taken screenshots locally, allowing you to re-download them.
- **Settings**: Toggle dark mode, choose image formats, and control auto-save settings.
- **Privacy**: All processing happens locally in your browser. No data is sent to external servers.

## Project Structure

```text
smartshot-extension/
├── manifest.json       # Chrome extension manifest (V3)
├── popup.html          # Extension popup UI
├── popup.css           # Popup styling
├── popup.js            # Popup logic and event listeners
├── background.js       # Service worker for background tasks
├── content.js          # Content script injected into pages
├── screenshot.js       # API for handling screenshots
├── image-tools.js      # API for image tools
├── storage.js          # API for Chrome local storage
├── settings.html       # Settings page UI
├── settings.js         # Settings logic
├── settings.css        # Settings styling
├── icons/              # Extension icons (16, 48, 128px)
└── README.md           # This documentation
```

## How to Install in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** in the top right corner.
3. Click the **Load unpacked** button.
4. Select the `smartshot-extension` folder.
5. Pin SmartShot to the Chrome toolbar for quick access.

## How to Test

1. Navigate to a standard webpage (e.g., https://example.com).
2. Click the SmartShot extension icon.
3. Try capturing the visible screen. The image will automatically download and appear in the "Recent Screenshots" section.
4. Try the "Find Images" tool to see how many images are on the page.
5. Open Settings (via the footer link) to toggle Dark Mode.
6. Note: SmartShot will show an error message if you try to use it on restricted pages like `chrome://` or the Chrome Web Store.

## Technical Limitations & Notes

- **Full Page Capture**: A true full-page capture requires scrolling the page, taking multiple screenshots, and stitching them together on an HTML canvas. This extension provides a simplified placeholder for this functionality.
- **Area Selection**: The area selection visually works by drawing a box, but cropping the actual screenshot based on device pixel ratio and coordinates requires an additional canvas cropping step which is simplified here.
- **Clipboard Access**: Writing images directly to the clipboard (`navigator.clipboard.write`) might require additional user gestures or permissions depending on the browser version.

## Packaging for Chrome Web Store

1. Ensure all development and testing is complete.
2. In `chrome://extensions`, you can click **Pack extension**.
3. Select the `smartshot-extension` directory.
4. Chrome will generate a `.crx` file and a `.pem` private key. 
5. To publish to the Web Store, compress the `smartshot-extension` folder into a `.zip` file.
6. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/), create a new item, upload the `.zip` file, fill out the store listing, and submit for review.
