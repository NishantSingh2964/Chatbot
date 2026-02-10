const fs = require('fs');
const path = require('path');

async function listModels() {
    // Read .env.local manually since dotenv is not installed
    const envPath = path.join(__dirname, '.env.local');
    let apiKey = '';

    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
        }
    } catch (e) {
        console.error("Could not read .env.local");
        return;
    }

    if (!apiKey) {
        console.error("API Key not found in .env.local");
        return;
    }

    console.log("Using API Key:", apiKey.substring(0, 5) + "...");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            console.error(`Error fetching models: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(model => {
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${model.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
