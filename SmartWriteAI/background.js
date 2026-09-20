chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "send-to-smartwrite",
        title: "Send to SmartWrite AI",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "send-to-smartwrite") {
        const selectedText = info.selectionText;
        chrome.storage.local.set({ selectedText: selectedText }, () => {
            // Once saved, the user can open the popup to see the text.
        });
    }
});
