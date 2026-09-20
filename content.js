// Content script for SmartShot

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ping') {
        sendResponse({ status: 'ok' });
    } else if (request.action === 'getImages') {
        const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src);
        sendResponse({ images: images });
    } else if (request.action === 'startAreaSelection') {
        // Basic implementation of area selection
        startAreaSelection();
        sendResponse({ status: 'started' });
    }
});

function startAreaSelection() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
    overlay.style.zIndex = '999999';
    overlay.style.cursor = 'crosshair';
    
    let startX, startY;
    let selectionBox = null;

    overlay.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        selectionBox = document.createElement('div');
        selectionBox.style.position = 'fixed';
        selectionBox.style.border = '2px solid #4f46e5';
        selectionBox.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        overlay.appendChild(selectionBox);
    });

    overlay.addEventListener('mousemove', (e) => {
        if (!selectionBox) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
        selectionBox.style.left = Math.min(startX, currentX) + 'px';
        selectionBox.style.top = Math.min(startY, currentY) + 'px';
    });

    overlay.addEventListener('mouseup', (e) => {
        if (!selectionBox) return;
        const rect = selectionBox.getBoundingClientRect();
        document.body.removeChild(overlay);
        
        // Send rect back to background to crop (simplified)
        alert('Area selected. In a full implementation, this would crop the screenshot.');
    });

    document.body.appendChild(overlay);
}
