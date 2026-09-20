// Minimal content script to extract text if requested via messages.
// The context menu handles most of the text passing natively in background.js.
document.addEventListener('mouseup', function() {
    let selectedText = window.getSelection().toString();
    if(selectedText.length > 0) {
        // Can be used later if we want an inline floating widget
    }
});
