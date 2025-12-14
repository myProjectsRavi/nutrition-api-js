/**
 * Nutrition Tracker API - JavaScript SDK
 * 
 * A simple wrapper for the Nutrition Tracker API on RapidAPI.
 * Get 25+ nutrients from natural language food queries.
 * 
 * Usage:
 *   const NutritionAPI = require('./nutritionApi');
 *   const api = new NutritionAPI('YOUR_RAPIDAPI_KEY');
 *   const result = await api.calculate('100g chicken breast');
 */

const fetch = require('node-fetch');

class NutritionAPIError extends Error {
    constructor(message, statusCode = null) {
        super(message);
        this.name = 'NutritionAPIError';
        this.statusCode = statusCode;
    }
}

class NutritionAPI {
    /**
     * Nutrition Tracker API Client
     * 
     * Get 25+ nutrients from natural language food queries.
     * 
     * @param {string} apiKey - Your RapidAPI key (get it from rapidapi.com)
     */
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('API key is required. Get yours at: https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api');
        }

        this.apiKey = apiKey;
        this.baseUrl = 'https://nutrition-tracker-api.p.rapidapi.com';
        this.headers = {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'nutrition-tracker-api.p.rapidapi.com'
        };
    }

    /**
     * Calculate nutrition for a food query.
     * 
     * @param {string} text - Natural language food description
     *                        Examples: "100g chicken breast"
     *                                  "2 eggs and 1 cup rice"
     * @returns {Promise<Object>} Dictionary of nutrients with values and units
     * @throws {NutritionAPIError} If the API returns an error
     */
    async calculate(text) {
        if (!text || !text.trim()) {
            throw new Error('Food description text is required');
        }

        const url = `${this.baseUrl}/v1/calculate/natural`;
        const payload = { text: text.trim() };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(payload),
                timeout: 30000
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || 'Unknown error occurred';
                throw new NutritionAPIError(errorMessage, response.status);
            }

            if (!data.success) {
                const errorMessage = data.error || 'Request failed';
                throw new NutritionAPIError(errorMessage);
            }

            // Return just the nutrients for easy access
            return data.data?.totalNutrients || {};

        } catch (error) {
            if (error instanceof NutritionAPIError) {
                throw error;
            }
            if (error.name === 'AbortError') {
                throw new NutritionAPIError('Request timed out', 408);
            }
            throw new NutritionAPIError(`Request failed: ${error.message}`);
        }
    }

    /**
     * Calculate nutrition and return full API response.
     * 
     * @param {string} text - Natural language food description
     * @returns {Promise<Object>} Full API response including query, nutrients, and metadata
     */
    async calculateFull(text) {
        if (!text || !text.trim()) {
            throw new Error('Food description text is required');
        }

        const url = `${this.baseUrl}/v1/calculate/natural`;
        const payload = { text: text.trim() };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(payload),
                timeout: 30000
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || 'Unknown error occurred';
                throw new NutritionAPIError(errorMessage, response.status);
            }

            if (!data.success) {
                const errorMessage = data.error || 'Request failed';
                throw new NutritionAPIError(errorMessage);
            }

            return data;

        } catch (error) {
            if (error instanceof NutritionAPIError) {
                throw error;
            }
            throw new NutritionAPIError(`Request failed: ${error.message}`);
        }
    }
}

/**
 * Quick function to calculate nutrition without creating a client instance.
 * 
 * @param {string} apiKey - Your RapidAPI key
 * @param {string} text - Natural language food description
 * @returns {Promise<Object>} Dictionary of nutrients
 */
async function calculateNutrition(apiKey, text) {
    const client = new NutritionAPI(apiKey);
    return client.calculate(text);
}

module.exports = NutritionAPI;
module.exports.NutritionAPIError = NutritionAPIError;
module.exports.calculateNutrition = calculateNutrition;
