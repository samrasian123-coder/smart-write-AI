window.StorageAPI = {
    defaultSettings: {
        darkMode: false,
        format: 'png',
        autoSave: true,
        maxHistory: 6
    },

    async getSettings() {
        return new Promise(resolve => {
            chrome.storage.local.get(['settings'], (result) => {
                resolve({ ...this.defaultSettings, ...result.settings });
            });
        });
    },

    async saveSettings(settings) {
        return new Promise(resolve => {
            chrome.storage.local.set({ settings }, resolve);
        });
    },

    async getHistory() {
        return new Promise(resolve => {
            chrome.storage.local.get(['history'], (result) => {
                resolve(result.history || []);
            });
        });
    },

    async addToHistory(dataUrl) {
        const settings = await this.getSettings();
        const history = await this.getHistory();
        
        const newItem = {
            id: Date.now().toString(),
            dataUrl: dataUrl,
            timestamp: Date.now()
        };

        history.unshift(newItem);
        
        // Keep only max items
        if (history.length > settings.maxHistory) {
            history.length = settings.maxHistory;
        }

        return new Promise(resolve => {
            chrome.storage.local.set({ history }, resolve);
        });
    },

    async clearHistory() {
        return new Promise(resolve => {
            chrome.storage.local.remove(['history'], resolve);
        });
    }
};
