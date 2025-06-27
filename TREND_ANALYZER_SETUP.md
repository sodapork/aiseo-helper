# AI Trend Analyzer - Data Streams Setup Guide

This guide explains how to integrate various data streams into the AI Trend Analyzer tool to provide comprehensive trend analysis.

## Overview

The AI Trend Analyzer pulls data from multiple sources to provide insights into trending topics:

1. **Google Trends** - Search interest and related queries
2. **Social Media APIs** - Twitter, Reddit, LinkedIn trends
3. **News APIs** - Recent news coverage and mentions
4. **AI Conversation Analysis** - OpenAI-powered analysis of AI discussion patterns

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# OpenAI API (for AI analysis)
OPENAI_API_KEY=your_openai_api_key_here

# News API (for news trend analysis)
NEWS_API_KEY=your_news_api_key_here

# Twitter API (optional - for social media trends)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here

# Reddit API (optional - for Reddit trends)
REDDIT_CLIENT_ID=your_reddit_client_id_here
REDDIT_CLIENT_SECRET=your_reddit_client_secret_here

# LinkedIn API (optional - for LinkedIn trends)
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
```

## Data Stream Implementations

### 1. Google Trends Integration

**Current Implementation**: Mock data with fallback
**Recommended**: Use Google Trends API via a proxy service

```typescript
// Enhanced Google Trends integration
async function fetchGoogleTrends(topic: string, timeframe: string) {
  try {
    // Option 1: Use a Google Trends proxy service
    const response = await fetch(`https://your-proxy-service.com/trends?q=${encodeURIComponent(topic)}&time=${timeframe}`);
    
    // Option 2: Use Google Trends unofficial API
    const trendsResponse = await fetch(`https://trends.google.com/trends/api/widgetdata/multiline?hl=en-US&tz=-120&req={"time":"${timeframe}","keywordGroups":[{"name":"${topic}","keywords":"${topic}","geo":"","time":"${timeframe}"}]}&token=APP6_UEAAAAAY${Date.now()}`);
    
    const data = await response.json();
    return {
      interestOverTime: data.interestOverTime || 0,
      relatedQueries: data.relatedQueries || [],
      relatedTopics: data.relatedTopics || [],
      geographicData: data.geographicData || []
    };
  } catch (error) {
    console.error('Google Trends error:', error);
    return { interestOverTime: 0, relatedQueries: [], relatedTopics: [] };
  }
}
```

### 2. Social Media APIs

#### Twitter API Integration

```typescript
async function fetchTwitterTrends(topic: string) {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    return { tweetVolume: 0, trendingHashtags: [], sentiment: 'neutral' };
  }

  try {
    // Search for tweets containing the topic
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(topic)}&max_results=100`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();
    
    return {
      tweetVolume: data.meta?.total_tweet_count || 0,
      trendingHashtags: extractHashtags(data.data || []),
      sentiment: analyzeSentiment(data.data || [])
    };
  } catch (error) {
    console.error('Twitter API error:', error);
    return { tweetVolume: 0, trendingHashtags: [], sentiment: 'neutral' };
  }
}
```

#### Reddit API Integration

```typescript
async function fetchRedditTrends(topic: string) {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return { postCount: 0, subreddits: [], upvoteRatio: 0 };
  }

  try {
    // Get OAuth token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const tokenData = await tokenResponse.json();
    
    // Search Reddit for the topic
    const searchResponse = await fetch(
      `https://oauth.reddit.com/search?q=${encodeURIComponent(topic)}&sort=hot&t=week&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'User-Agent': 'AI-SEO-Helper/1.0'
        }
      }
    );

    const searchData = await searchResponse.json();
    
    return {
      postCount: searchData.data?.children?.length || 0,
      subreddits: extractSubreddits(searchData.data?.children || []),
      upvoteRatio: calculateAverageUpvoteRatio(searchData.data?.children || [])
    };
  } catch (error) {
    console.error('Reddit API error:', error);
    return { postCount: 0, subreddits: [], upvoteRatio: 0 };
  }
}
```

### 3. News API Integration

```typescript
async function fetchNewsTrends(topic: string, industry: string) {
  const apiKey = process.env.NEWS_API_KEY;
  
  if (!apiKey) {
    throw new Error('News API key not configured');
  }

  try {
    // Get recent news articles
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&apiKey=${apiKey}&pageSize=20&from=${getDateDaysAgo(7)}`
    );
    
    const data = await response.json();
    
    // Analyze sentiment and extract insights
    const sentimentAnalysis = await analyzeNewsSentiment(data.articles || []);
    
    return {
      articleCount: data.totalResults || 0,
      recentArticles: data.articles?.slice(0, 5) || [],
      sentiment: sentimentAnalysis.overallSentiment,
      topSources: extractTopSources(data.articles || []),
      trendingKeywords: extractTrendingKeywords(data.articles || [])
    };
  } catch (error) {
    console.error('News API error:', error);
    return {
      articleCount: 0,
      recentArticles: [],
      sentiment: 'neutral',
      topSources: [],
      trendingKeywords: []
    };
  }
}
```

### 4. AI Conversation Analysis

```typescript
async function analyzeAIConversations(topic: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert in analyzing AI conversation patterns and trends. Analyze the topic "${topic}" for:
            1. How often AI assistants discuss this topic
            2. Common questions users ask about this topic
            3. Related topics that frequently appear together
            4. The complexity level of discussions
            5. Whether the topic is gaining or losing interest in AI conversations`
          },
          {
            role: 'user',
            content: `Provide a comprehensive analysis of "${topic}" in AI conversations. Consider:
            - Mention frequency in AI assistant responses
            - User query patterns
            - Topic complexity and accessibility
            - Related concepts and technologies
            - Trend direction (increasing, stable, decreasing)
            
            Return a JSON object with:
            {
              "aiMentionFrequency": number (0-100),
              "commonQuestions": string[],
              "relatedTopics": string[],
              "complexityLevel": "beginner|intermediate|advanced",
              "conversationTrend": "increasing|stable|decreasing",
              "userInterestLevel": number (0-100),
              "aiExpertiseRequired": number (0-100)
            }`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    return JSON.parse(content);
  } catch (error) {
    console.error('AI conversation analysis error:', error);
    return {
      aiMentionFrequency: 0,
      commonQuestions: [],
      relatedTopics: [],
      complexityLevel: 'beginner',
      conversationTrend: 'stable',
      userInterestLevel: 0,
      aiExpertiseRequired: 0
    };
  }
}
```

## Alternative Data Sources

### 1. Google Search Console API

```typescript
async function fetchSearchConsoleData(topic: string) {
  // Requires Google Search Console API setup
  // Provides search performance data for your domain
}
```

### 2. Bing Webmaster Tools API

```typescript
async function fetchBingWebmasterData(topic: string) {
  // Provides search performance data from Bing
}
```

### 3. SEMrush API

```typescript
async function fetchSEMrushData(topic: string) {
  // Provides keyword research and competitive data
}
```

### 4. Ahrefs API

```typescript
async function fetchAhrefsData(topic: string) {
  // Provides backlink and keyword data
}
```

## Rate Limiting and Caching

Implement caching to avoid hitting API limits:

```typescript
import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 15, // 15 minutes
});

async function fetchWithCache(key: string, fetchFunction: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  
  const data = await fetchFunction();
  cache.set(key, data);
  return data;
}
```

## Error Handling and Fallbacks

```typescript
async function robustDataFetch(fetchFunction: () => Promise<any>, fallback: any) {
  try {
    return await fetchFunction();
  } catch (error) {
    console.error('Data fetch error:', error);
    return fallback;
  }
}
```

## Testing the Implementation

1. **Set up environment variables** with your API keys
2. **Test individual data streams** to ensure they work
3. **Monitor API usage** to stay within limits
4. **Implement caching** to improve performance
5. **Add error handling** for robust operation

## Deployment Considerations

1. **API Key Security**: Store keys securely in environment variables
2. **Rate Limiting**: Implement proper rate limiting for all APIs
3. **Caching Strategy**: Use Redis or similar for production caching
4. **Monitoring**: Set up alerts for API failures
5. **Cost Management**: Monitor API usage costs

## Next Steps

1. **Get API keys** for the services you want to use
2. **Update the environment variables** in your `.env.local`
3. **Test the implementation** with a simple topic
4. **Monitor performance** and adjust caching as needed
5. **Add more data sources** as needed for your use case

The AI Trend Analyzer is now ready to provide comprehensive trend analysis by pulling data from multiple sources and combining them with AI-powered insights! 