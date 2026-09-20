document.addEventListener('DOMContentLoaded', async () => {
    // Check if on supported page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0]?.url || "";
        if (url.startsWith('chrome://') || url.startsWith('https://chrome.google.com/webstore')) {
            document.getElementById('unsupported-message').classList.remove('hidden');
            document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
        }
    });

    // Theme initialization
    const settings = await window.StorageAPI.getSettings();
    if (settings.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Capture Buttons
    document.getElementById('btn-capture-visible').addEventListener('click', () => {
        window.ScreenshotAPI.captureVisible();
    });

    document.getElementById('btn-capture-area').addEventListener('click', () => {
        window.ScreenshotAPI.captureArea();
    });

    document.getElementById('btn-capture-full').addEventListener('click', () => {
        window.ScreenshotAPI.captureFullPage();
    });

    // Image Tools
    document.getElementById('btn-find-images').addEventListener('click', () => {
        window.ImageToolsAPI.findImages();
    });

    document.getElementById('btn-copy-url').addEventListener('click', () => {
        window.ImageToolsAPI.copyImageUrl();
    });

    document.getElementById('btn-image-info').addEventListener('click', () => {
        window.ImageToolsAPI.showImageInfo();
    });

    // Footer Links
    document.getElementById('btn-settings').addEventListener('click', () => {
        chrome.tabs.create({ url: 'settings.html' });
    });

    document.getElementById('btn-privacy').addEventListener('click', () => {
        chrome.tabs.create({ url: 'settings.html#privacy' });
    });

    document.getElementById('btn-about').addEventListener('click', () => {
        chrome.tabs.create({ url: 'settings.html#about' });
    });

    // History
    document.getElementById('btn-clear-history').addEventListener('click', async () => {
        await window.StorageAPI.clearHistory();
        renderHistory();
    });

    renderHistory();
});

async function renderHistory() {
    const history = await window.StorageAPI.getHistory();
    const grid = document.getElementById('history-grid');
    grid.innerHTML = '';

    if (history.length === 0) {
        grid.innerHTML = '<div style="grid-column: span 2; text-align: center; font-size: 12px; color: var(--text-muted); padding: 20px 0;">No recent screenshots</div>';
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <img src="${item.dataUrl}" alt="Screenshot">
            <div class="history-item-overlay">${new Date(item.timestamp).toLocaleTimeString()}</div>
        `;
        div.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = item.dataUrl;
            a.download = `screenshot-${item.timestamp}.png`;
            a.click();
        });
        grid.appendChild(div);
    });
}

// Global error handling
window.showError = function(msg) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 5000);
}

