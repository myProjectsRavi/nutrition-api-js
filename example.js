/**
 * Example usage of the Nutrition Tracker API JavaScript SDK.
 * 
 * Before running:
 * 1. npm install node-fetch
 * 2. Get your free API key from: https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api
 * 3. Replace YOUR_RAPIDAPI_KEY below with your actual key
 * 4. Run: node example.js
 */

const NutritionAPI = require('./nutritionApi');

// Replace with your RapidAPI key
const API_KEY = 'YOUR_RAPIDAPI_KEY';

async function main() {
    // Initialize the client
    const api = new NutritionAPI(API_KEY);

    console.log('='.repeat(60));
    console.log('Nutrition Tracker API - JavaScript SDK Example');
    console.log('='.repeat(60));

    // Example 1: Single food item
    console.log('\n📍 Example 1: Single Food Item');
    console.log('-'.repeat(40));

    try {
        const result = await api.calculate('100g grilled chicken breast');

        console.log('Query: 100g grilled chicken breast\n');
        console.log('Key Nutrients:');
        console.log(`  • Energy:  ${result.Energy?.value || 'N/A'} ${result.Energy?.unit || ''}`);
        console.log(`  • Protein: ${result.Protein?.value || 'N/A'} ${result.Protein?.unit || ''}`);
        console.log(`  • Fat:     ${result.Fat?.value || 'N/A'} ${result.Fat?.unit || ''}`);

        // Show fat breakdown if available
        if (result.Fat?.breakdown) {
            console.log('\n  Fat Breakdown:');
            for (const [fatType, data] of Object.entries(result.Fat.breakdown)) {
                console.log(`    - ${fatType}: ${data.value || 'N/A'} ${data.unit || ''}`);
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

    // Example 2: Multi-item meal
    console.log('\n\n📍 Example 2: Multi-Item Meal');
    console.log('-'.repeat(40));

    try {
        const result = await api.calculate('2 eggs, 100g oatmeal, and 1 banana');

        console.log('Query: 2 eggs, 100g oatmeal, and 1 banana\n');
        console.log('Combined Nutrients:');
        console.log(`  • Energy:       ${result.Energy?.value || 'N/A'} ${result.Energy?.unit || ''}`);
        console.log(`  • Protein:      ${result.Protein?.value || 'N/A'} ${result.Protein?.unit || ''}`);
        console.log(`  • Carbohydrates:${result.Carbohydrates?.value || 'N/A'} ${result.Carbohydrates?.unit || ''}`);
        console.log(`  • Fiber:        ${result.Fiber?.value || 'N/A'} ${result.Fiber?.unit || ''}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

    // Example 3: Full response with all nutrients
    console.log('\n\n📍 Example 3: All 25+ Nutrients');
    console.log('-'.repeat(40));

    try {
        const result = await api.calculate('1 apple');

        console.log('Query: 1 apple\n');
        console.log('All Nutrients:');
        for (const [nutrient, data] of Object.entries(result)) {
            if (data && typeof data === 'object' && 'value' in data) {
                console.log(`  • ${nutrient}: ${data.value} ${data.unit || ''}`);
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('Get your API key: https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api');
    console.log('='.repeat(60));
}

main().catch(console.error);
