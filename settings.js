document.addEventListener('DOMContentLoaded', async () => {
    const themeToggle = document.getElementById('theme-toggle');
    const formatSelect = document.getElementById('format-select');
    const autosaveToggle = document.getElementById('autosave-toggle');
    const btnSave = document.getElementById('btn-save');
    const saveMsg = document.getElementById('save-msg');

    // Load settings
    const settings = await window.StorageAPI.getSettings();
    themeToggle.checked = settings.darkMode;
    formatSelect.value = settings.format;
    autosaveToggle.checked = settings.autoSave;

    if (settings.darkMode) {
        document.body.classList.add('dark-theme');
    }

    btnSave.addEventListener('click', async () => {
        const newSettings = {
            darkMode: themeToggle.checked,
            format: formatSelect.value,
            autoSave: autosaveToggle.checked,
            maxHistory: settings.maxHistory
        };

        await window.StorageAPI.saveSettings(newSettings);
        
        if (newSettings.darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        saveMsg.classList.remove('hidden');
        setTimeout(() => saveMsg.classList.add('hidden'), 2000);
    });
});
