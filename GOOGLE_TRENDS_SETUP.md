# Google Trends API Setup Guide

This guide will help you set up third-party Google Trends data integration for your AI SEO Helper application.

## Available API Options

### 1. SerpApi (Recommended)
- **Pros**: Most reliable, comprehensive data, good documentation
- **Cons**: Paid service (starts at $50/month for 5,000 searches)
- **Website**: https://serpapi.com/
- **API Documentation**: https://serpapi.com/docs/google-trends-api

### 2. RapidAPI Google Trends
- **Pros**: Pay-per-use, multiple API providers
- **Cons**: Less reliable, limited data
- **Website**: https://rapidapi.com/hub/google-trends
- **API Documentation**: Available on RapidAPI marketplace

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install axios
```

### Step 2: Get API Keys

#### Option A: SerpApi (Recommended)
1. Go to https://serpapi.com/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to your `.env.local` file:
```
SERP_API_KEY=your_serp_api_key_here
```

#### Option B: RapidAPI
1. Go to https://rapidapi.com/hub/google-trends
2. Sign up for a RapidAPI account
3. Subscribe to a Google Trends API (e.g., "Google Trends API")
4. Get your API key from the dashboard
5. Add to your `.env.local` file:
```
RAPID_API_KEY=your_rapid_api_key_here
```

### Step 3: Environment Variables
Create or update your `.env.local` file in the root directory:

```env
# Google Trends APIs
SERP_API_KEY=your_serp_api_key_here
RAPID_API_KEY=your_rapid_api_key_here

# Other existing variables...
```

### Step 4: Test the Integration
1. Start your development server: `npm run dev`
2. Go to http://localhost:3001/tools/trend-analyzer
3. Enter a topic and click "Analyze Trends"
4. Check the browser console and server logs for any errors

## API Features

The new Google Trends integration provides:

- **Interest Over Time**: Historical trend data for the specified timeframe
- **Related Queries**: Popular search terms related to your topic
- **Related Topics**: Trending topics associated with your keyword
- **Geographic Data**: Regional interest breakdown
- **Trend Direction**: Whether the topic is rising, falling, or stable
- **Time Series Data**: Detailed daily/weekly data points

## Fallback System

The system includes a robust fallback mechanism:

1. **Primary**: SerpApi Google Trends
2. **Secondary**: RapidAPI Google Trends
3. **Fallback**: Enhanced mock data with realistic patterns

## Cost Considerations

### SerpApi Pricing
- **Free Tier**: 100 searches/month
- **Starter**: $50/month for 5,000 searches
- **Business**: $100/month for 15,000 searches

### RapidAPI Pricing
- **Pay-per-use**: ~$0.01-0.05 per request
- **Monthly plans**: Varies by provider

## Troubleshooting

### Common Issues

1. **"SERP_API_KEY not configured"**
   - Make sure you've added the API key to `.env.local`
   - Restart your development server after adding environment variables

2. **"SerpApi request failed"**
   - Check your API key is valid
   - Verify you have sufficient credits/quota
   - Check the SerpApi dashboard for error details

3. **"RapidAPI request failed"**
   - Verify your RapidAPI key
   - Check your subscription status
   - Ensure you're subscribed to the correct API

### Debug Mode
To see detailed API responses, check your browser's Network tab and server console logs.

## API Response Format

```json
{
  "success": true,
  "data": {
    "interest_over_time": 75,
    "related_queries": ["topic tutorial", "topic examples"],
    "related_topics": ["Machine Learning", "AI"],
    "geographic_data": [
      {"region": "United States", "value": 85},
      {"region": "United Kingdom", "value": 72}
    ],
    "trend_direction": "rising",
    "time_series_data": [...]
  },
  "message": "Real Google Trends data from SerpApi"
}
```

## Next Steps

1. Choose your preferred API provider
2. Set up your API key
3. Test the integration
4. Monitor usage and costs
5. Consider implementing caching for frequently searched terms

For support or questions, refer to the respective API provider's documentation or contact their support teams. 