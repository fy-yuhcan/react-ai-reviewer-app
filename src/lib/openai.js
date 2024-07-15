import axios from 'axios';

class OpenaiClient {
    constructor() {
        this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (!this.apiKey) {
            throw new Error("API key is not defined");
        }
    }

    async completion(messages) {
        const requestData = {
            model: "gpt-3.5-turbo-16k",
            messages,
        };

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions",
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    }
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching completion:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

const openai = new OpenaiClient();
export default openai;
