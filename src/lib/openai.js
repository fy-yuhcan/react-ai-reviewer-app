const { default: axios } = require("axios");

class OpenaiClient {
    constructor(){
        this.apiKey = process.env.OPENAI_API_KEY;
    }

    async completion(messages){
        const requestData = {
            "model": "gpt-4o",
            messages,
        }
        const response =await axios.post("https://api.openai.com/v1/chat/completions",
            requestData,
            { headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            }}
        )
        return response.data.choices[0].message.content;
    }   

}

const openai = new OpenaiClient()
export default openai