import axios from 'axios';

interface OpenAIResponse {
    choices: Array<{ text: string }>;
}

const fetchOpenAIResponse = async (query: string): Promise<string> => {
    try {
        const result = await axios.post<OpenAIResponse>(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: query,
                max_tokens: 10,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + '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',
                },
            }
        );

        return result.data.choices[0].text;
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        throw new Error('An error occurred while fetching the response.');
    }
};

export default fetchOpenAIResponse;
