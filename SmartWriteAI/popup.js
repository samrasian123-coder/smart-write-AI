document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    const inputCounter = document.getElementById('input-counter');
    const outputCounter = document.getElementById('output-counter');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const loading = document.getElementById('loading');
    const toneSelect = document.getElementById('tone');

    // Retrieve selected text from background storage if any
    chrome.storage.local.get(['selectedText'], function(result) {
        if (result.selectedText) {
            textInput.value = result.selectedText;
            updateCounter(textInput, inputCounter);
            // Clear it so it doesn't persist forever
            chrome.storage.local.remove(['selectedText']);
        }
    });

    // Word/Char Counters
    const updateCounter = (textarea, counterElem) => {
        const text = textarea.value;
        const chars = text.length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        counterElem.textContent = `${chars} chars | ${words} words`;
    };

    textInput.addEventListener('input', () => updateCounter(textInput, inputCounter));
    
    // Theme Toggler
    let isDark = false;
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });

    // Clear Button
    document.getElementById('clear-btn').addEventListener('click', () => {
        textInput.value = '';
        textOutput.value = '';
        updateCounter(textInput, inputCounter);
        updateCounter(textOutput, outputCounter);
    });

    // Copy Button
    document.getElementById('copy-btn').addEventListener('click', () => {
        if (!textOutput.value) return;
        navigator.clipboard.writeText(textOutput.value).then(() => {
            const originalText = document.getElementById('copy-btn').innerHTML;
            document.getElementById('copy-btn').innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                document.getElementById('copy-btn').innerHTML = originalText;
            }, 2000);
        });
    });

    // AI Mock Functions
    const processText = (action) => {
        const text = textInput.value.trim();
        if (!text) return;
        
        loading.classList.remove('hidden');
        textOutput.value = '';
        
        // Mock API Call Delay
        setTimeout(() => {
            let result = '';
            const tone = toneSelect.value;
            
            switch(action) {
                case 'summarize':
                    result = `[Mock Summary] Here is a summary of your text:\n\n${text.substring(0, Math.min(100, text.length))}...`;
                    break;
                case 'rewrite':
                    result = `[Mock Rewrite] Rewritten in a ${tone} tone:\n\n${text}`;
                    break;
                case 'grammar':
                    result = `[Mock Grammar] Grammar corrected:\n\n${text}`;
                    break;
                case 'simple':
                    result = `[Mock Simple] Simplified version:\n\n${text}`;
                    break;
                case 'generate':
                    result = `[Mock Generate] Generated text based on "${text}" in a ${tone} tone.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`;
                    break;
            }
            
            textOutput.value = result;
            updateCounter(textOutput, outputCounter);
            loading.classList.add('hidden');
        }, 1500);
    };

    document.getElementById('btn-summarize').addEventListener('click', () => processText('summarize'));
    document.getElementById('btn-rewrite').addEventListener('click', () => processText('rewrite'));
    document.getElementById('btn-grammar').addEventListener('click', () => processText('grammar'));
    document.getElementById('btn-simple').addEventListener('click', () => processText('simple'));
    document.getElementById('btn-generate').addEventListener('click', () => processText('generate'));
});
