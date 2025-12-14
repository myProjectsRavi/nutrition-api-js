# Nutrition Tracker API - JavaScript SDK

[![npm](https://img.shields.io/badge/npm-nutrition--api-red.svg)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/node-14+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![RapidAPI](https://img.shields.io/badge/RapidAPI-Nutrition%20Tracker-blue)](https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api)

Simple JavaScript/Node.js wrapper for the **Nutrition Tracker API** - Get 25+ nutrients from natural language food queries.

## Features

- ✅ **25+ nutrients** in every response (including free tier)
- ✅ **Natural language input** - "100g chicken breast and 1 cup rice"
- ✅ **Hierarchical fat breakdown** - saturated, mono, poly, trans, other
- ✅ **USDA data source** - laboratory-analyzed, peer-reviewed
- ✅ **<100ms response time** - edge-cached for speed
- ✅ **Async/await support** - modern JavaScript patterns
- ✅ **Works in Node.js and browsers** (with fetch polyfill)

## Installation

```bash
npm install node-fetch
```

Then copy `nutritionApi.js` to your project, or clone this repo:

```bash
git clone https://github.com/myProjectsRavi/nutrition-api-js.git
```

## Quick Start

### 1. Get Your API Key

Get your free API key from [RapidAPI](https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api)

### 2. Use the SDK

```javascript
const NutritionAPI = require('./nutritionApi');

// Initialize with your RapidAPI key
const api = new NutritionAPI('YOUR_RAPIDAPI_KEY');

// Calculate nutrition for any food
async function main() {
    const result = await api.calculate('100g grilled chicken breast');
    
    console.log(`Calories: ${result.Energy.value} ${result.Energy.unit}`);
    console.log(`Protein: ${result.Protein.value} ${result.Protein.unit}`);
    console.log(`Fat: ${result.Fat.value} ${result.Fat.unit}`);
}

main();
```

### 3. Multi-Item Meals

```javascript
// Calculate nutrition for entire meals
const result = await api.calculate('2 eggs, 100g oatmeal, and 1 banana');

// All nutrients are aggregated automatically
for (const [nutrient, data] of Object.entries(result)) {
    console.log(`${nutrient}: ${data.value} ${data.unit}`);
}
```

### 4. ES Modules

```javascript
import NutritionAPI from './nutritionApi.mjs';

const api = new NutritionAPI('YOUR_RAPIDAPI_KEY');
const result = await api.calculate('1 apple');
```

## API Response

The API returns 25+ nutrients:

```javascript
{
    "Energy": { "value": 156, "unit": "kcal" },
    "Protein": { "value": 31.02, "unit": "g" },
    "Fat": {
        "value": 3.57,
        "unit": "g",
        "breakdown": {
            "saturated": { "value": 1.01, "unit": "g" },
            "monounsaturated": { "value": 1.24, "unit": "g" },
            "polyunsaturated": { "value": 0.77, "unit": "g" },
            "other": { "value": 0.55, "unit": "g" }
        }
    },
    "Vitamin B-6": { "value": 0.6, "unit": "mg" },
    "Vitamin B-12": { "value": 0.34, "unit": "µg" },
    "Iron, Fe": { "value": 1.04, "unit": "mg" },
    // ... 20+ more nutrients
}
```

## Error Handling

```javascript
const NutritionAPI = require('./nutritionApi');

const api = new NutritionAPI('YOUR_RAPIDAPI_KEY');

try {
    const result = await api.calculate('100g chicken');
} catch (error) {
    console.error(`API Error: ${error.message}`);
    console.error(`Status Code: ${error.statusCode}`);
}
```

## Pricing

| Tier | Price | API Calls/Month | Items/Request |
|------|-------|-----------------|---------------|
| Free | $0 | 1,000 | 2 |
| Starter | $30 | 50,000 | 5 |
| Business | $50 | 100,000 | 10 |

**All tiers include the same 25+ nutrients!**

## Links

- 📖 [Full Documentation](https://myprojectsravi.github.io/nutrition-api-web/)
- 🚀 [Get API Key](https://rapidapi.com/anonymous617461746174/api/nutrition-tracker-api)
- 🐛 [Report Issues](https://github.com/myProjectsRavi/nutrition-api-js/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
