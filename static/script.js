// Word and character counter
document.getElementById('input-text').addEventListener('input', function(e) {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    
    document.getElementById('word-count').textContent = `${words} word${words !== 1 ? 's' : ''}`;
    document.getElementById('char-count').textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
});

async function checkGrammar() {
    const text = document.getElementById('input-text').value.trim();
    
    if (!text) {
        showError('Please enter some text to check.');
        return;
    }
    
    // Show loading, hide previous results
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    // Disable inputs while checking
    document.getElementById('input-text').disabled = true;
    document.getElementById('check-btn').disabled = true;
    
    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        document.getElementById('loading').classList.add('hidden');
        
        if (response.ok) {
            displayResults(data);
        } else {
            showError(data.error || 'An error occurred while checking grammar.');
        }
    } catch (error) {
        document.getElementById('loading').classList.add('hidden');
        showError('Network error. Please try again.');
    } finally {
        // Re-enable inputs
        document.getElementById('input-text').disabled = false;
        document.getElementById('check-btn').disabled = false;
        document.getElementById('input-text').focus();
    }
}

function displayResults(data) {
    console.log("Received data:", data); // For debugging
    
    // Handle error responses
    if (data.error) {
        showError(data.error);
        return;
    }
    
    // Display corrected text with highlighting if there are changes
    const correctedDiv = document.getElementById('corrected-content');
    const originalText = document.getElementById('input-text').value.trim();
    const correctedText = data.corrected_text || originalText;
    
    if (correctedText !== originalText && data.errors && data.errors.length > 0) {
        // Show diff highlighting (simplified)
        correctedDiv.innerHTML = `<span class="has-changes">${correctedText}</span>`;
    } else {
        correctedDiv.textContent = correctedText;
    }
    
    // Display errors
    const errorsContent = document.getElementById('errors-content');
    errorsContent.innerHTML = '';
    
    if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error, index) => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-item';
            errorDiv.innerHTML = `
                <div class="error-header">
                    <span class="error-number">#${index + 1}</span>
                </div>
                <div class="error-details">
                    <div class="error-original">
                        <span class="label">Original:</span> <span>${error.original || 'Unknown'}</span>
                    </div>
                    <div class="error-correction">
                        <span class="label">Correction:</span> <span>${error.correction || 'No correction'}</span>
                    </div>
                    <div class="error-explanation">
                        <span class="label">Why:</span> ${error.explanation || 'No explanation'}
                    </div>
                </div>
            `;
            errorsContent.appendChild(errorDiv);
        });
    } else {
        errorsContent.innerHTML = '<div class="no-errors">✨ No grammar errors found! Your text looks great!</div>';
    }
    
    // Display summary
    const summaryContent = document.getElementById('summary-content');
    if (data.summary && data.summary !== 'No summary available.') {
        summaryContent.textContent = data.summary;
    } else if (data.errors && data.errors.length > 0) {
        summaryContent.textContent = `Made ${data.errors.length} correction(s).`;
    } else {
        summaryContent.textContent = 'No corrections needed. Your text is grammatically correct!';
    }
    
    // Show results
    document.getElementById('results').classList.remove('hidden');
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function clearText() {
    const input = document.getElementById('input-text');
    input.value = '';
    input.focus();
    
    document.getElementById('word-count').textContent = '0 words';
    document.getElementById('char-count').textContent = '0 characters';
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

// Add enter key support
document.getElementById('input-text').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        checkGrammar();
    }
});