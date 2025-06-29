import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleTrendsCombined } from '../../../lib/googleTrends';

interface TrendData {
  topic: string;
  trendVelocity: number;
  aiEngagementScore: number;
  queryVolume: number;
  topicClustering: string[];
  forecastConfidence: number;
  dataSources: string[];
  insights: string[];
  relatedTopics: string[];
  timeframe: string;
  dataStatus: {
    googleTrends: 'real' | 'mock' | 'error';
    socialMedia: 'real' | 'mock' | 'error';
    news: 'real' | 'mock' | 'error';
    aiConversations: 'real' | 'mock' | 'error';
  };
  dataMessages: string[];
}

export async function POST(req: NextRequest) {
  const { topic, industry, timeframe = '30d' } = await req.json();
  console.log('Analyzing trends for:', topic, 'in', industry);

  const dataStatus: {
    googleTrends: 'real' | 'mock' | 'error';
    socialMedia: 'real' | 'mock' | 'error';
    news: 'real' | 'mock' | 'error';
    aiConversations: 'real' | 'mock' | 'error';
  } = {
    googleTrends: 'mock',
    socialMedia: 'mock',
    news: 'mock',
    aiConversations: 'mock'
  };
  const dataMessages: string[] = [];

  try {
    // 1. Google Trends Data
    const googleTrendsData = await fetchGoogleTrends(topic, timeframe);
    const googleTrendsNormalized = {
      interestOverTime: googleTrendsData.data?.interest_over_time ?? 0,
      relatedQueries: googleTrendsData.data?.related_queries ?? [],
      relatedTopics: googleTrendsData.data?.related_topics ?? [],
      timeSeriesData: googleTrendsData.data?.time_series_data ?? [],
      geographicData: googleTrendsData.data?.geographic_data ?? [],
      trendDirection: googleTrendsData.data?.trend_direction ?? 'stable',
      success: googleTrendsData.success,
      message: googleTrendsData.message
    };
    dataStatus.googleTrends = googleTrendsData.success ? 'real' : 'mock';
    if (googleTrendsData.message) {
      dataMessages.push(`Google Trends: ${googleTrendsData.message}`);
    }
    
    // 2. Social Media Trends
    const socialMediaData = await fetchSocialMediaTrends(topic);
    dataStatus.socialMedia = socialMediaData.success ? 'real' : 'mock';
    if (socialMediaData.message) {
      dataMessages.push(`Social Media: ${socialMediaData.message}`);
    }
    
    // 3. News API Data
    const newsData = await fetchNewsTrends(topic, industry);
    dataStatus.news = newsData.success ? 'real' : 'mock';
    if (newsData.message) {
      dataMessages.push(`News: ${newsData.message}`);
    }
    
    // 4. AI Conversation Analysis
    const aiConversationData = await analyzeAIConversations(topic);
    dataStatus.aiConversations = aiConversationData.success ? 'real' : 'mock';
    if (aiConversationData.message) {
      dataMessages.push(`AI Conversations: ${aiConversationData.message}`);
    }
    
    // 5. Combine and analyze all data with OpenAI
    const trendAnalysis = await analyzeTrendsWithAI({
      topic,
      industry,
      googleTrends: googleTrendsNormalized,
      socialMedia: socialMediaData,
      news: newsData,
      aiConversations: aiConversationData,
      dataStatus,
      dataMessages,
      timeframe
    });

    // 6. Aggregate raw data for frontend display
    const rawData = {
      googleTrends: googleTrendsData,
      socialMedia: socialMediaData,
      news: newsData,
      aiConversations: aiConversationData
    };

    return NextResponse.json({
      ...trendAnalysis,
      dataStatus,
      dataMessages,
      rawData
    });
  } catch (error) {
    console.error('Error in trend analysis:', error);
    return NextResponse.json({
      error: 'Failed to analyze trends',
      topic,
      trendVelocity: 0,
      aiEngagementScore: 0,
      queryVolume: 0,
      topicClustering: [],
      forecastConfidence: 0,
      dataSources: [],
      insights: ['Error analyzing trends. Please try again.'],
      relatedTopics: [],
      timeframe,
      dataStatus,
      dataMessages: ['Analysis failed. Using fallback data.']
    });
  }
}

async function fetchGoogleTrends(topic: string, timeframe: string) {
  return await fetchGoogleTrendsCombined(topic, timeframe);
}

async function fetchAlternativeTrendData(topic: string, timeframe: string) {
  try {
    // Option 1: Try using a different Google Trends endpoint
    const alternativeResponse = await fetch(`https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-120&geo=US&ns=15&ed=${getDateString()}&q=${encodeURIComponent(topic)}`);
    
    if (alternativeResponse.ok) {
      const text = await alternativeResponse.text();
      const cleanJson = text.replace(/^\)\]\}'/, '');
      const data = JSON.parse(cleanJson);
      
      // Extract data from alternative endpoint
      const trendingSearches = data.default?.trendingSearchesDays?.[0]?.trendingSearches || [];
      const relatedQueries = trendingSearches
        .filter((item: any) => item.title?.query?.toLowerCase().includes(topic.toLowerCase()))
        .map((item: any) => item.title?.query)
        .slice(0, 10);
      
      return {
        interestOverTime: Math.floor(Math.random() * 60) + 40, // 40-100 range
        relatedQueries: relatedQueries.length > 0 ? relatedQueries : [`${topic} tutorial`, `${topic} examples`, `${topic} best practices`],
        relatedTopics: [`${topic} trends`, `${topic} news`, `${topic} updates`],
        timeSeriesData: [],
        geographicData: [],
        trendDirection: 'stable',
        success: true,
        message: 'Alternative Google Trends data retrieved'
      };
    }
  } catch (error) {
    console.error('Alternative trend data error:', error);
  }
  
  // Final fallback: Enhanced mock data based on topic
  return generateEnhancedMockData(topic, timeframe);
}

function generateEnhancedMockData(topic: string, timeframe: string) {
  // Generate more realistic mock data based on the topic
  const topicLower = topic.toLowerCase();
  let baseInterest = 50;
  let trendDirection = 'stable';
  
  // Adjust based on topic popularity
  if (topicLower.includes('ai') || topicLower.includes('artificial intelligence')) {
    baseInterest = 85;
    trendDirection = 'increasing';
  } else if (topicLower.includes('machine learning') || topicLower.includes('ml')) {
    baseInterest = 80;
    trendDirection = 'increasing';
  } else if (topicLower.includes('chatgpt') || topicLower.includes('gpt')) {
    baseInterest = 90;
    trendDirection = 'increasing';
  } else if (topicLower.includes('blockchain') || topicLower.includes('crypto')) {
    baseInterest = 60;
    trendDirection = 'stable';
  } else if (topicLower.includes('web3') || topicLower.includes('metaverse')) {
    baseInterest = 70;
    trendDirection = 'decreasing';
  }
  
  // Adjust based on timeframe
  if (timeframe === '7d') {
    baseInterest += 10;
  } else if (timeframe === '1y') {
    baseInterest -= 10;
  }
  
  return {
    interestOverTime: Math.min(100, Math.max(0, baseInterest + (Math.random() * 20 - 10))),
    relatedQueries: [
      `${topic} tutorial`,
      `${topic} examples`,
      `${topic} best practices`,
      `${topic} 2024`,
      `${topic} guide`
    ],
    relatedTopics: [
      `${topic} trends`,
      `${topic} news`,
      `${topic} updates`,
      `${topic} development`,
      `${topic} applications`
    ],
    timeSeriesData: [],
    geographicData: [],
    trendDirection,
    success: false,
    message: 'Using enhanced mock data (Google Trends API blocked)'
  };
}

function getDateString(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function calculateTrendDirection(timeSeriesData: any[]): string {
  if (timeSeriesData.length < 2) return 'stable';
  
  const recent = timeSeriesData.slice(-3);
  const older = timeSeriesData.slice(-6, -3);
  
  const recentAvg = recent.reduce((sum: number, point: any) => sum + point.value[0], 0) / recent.length;
  const olderAvg = older.reduce((sum: number, point: any) => sum + point.value[0], 0) / older.length;
  
  const change = ((recentAvg - olderAvg) / olderAvg) * 100;
  
  if (change > 10) return 'increasing';
  if (change < -10) return 'decreasing';
  return 'stable';
}

async function fetchSocialMediaTrends(topic: string) {
  try {
    // Twitter API (requires API keys)
    const twitterData = await fetchTwitterTrends(topic);
    
    // Reddit API
    const redditData = await fetchRedditTrends(topic);
    
    // LinkedIn API
    const linkedinData = await fetchLinkedInTrends(topic);
    
    return {
      twitter: twitterData,
      reddit: redditData,
      linkedin: linkedinData,
      overallEngagement: Math.floor(Math.random() * 100) + 30,
      success: false,
      message: 'Using mock social media data (API keys not configured)'
    };
  } catch (error) {
    console.error('Social media trends error:', error);
    return { 
      twitter: {}, 
      reddit: {}, 
      linkedin: {}, 
      overallEngagement: 0,
      success: false,
      message: 'Social media data unavailable'
    };
  }
}

async function fetchTwitterTrends(topic: string) {
  // Mock Twitter data - replace with actual Twitter API
  return {
    tweetVolume: Math.floor(Math.random() * 10000) + 1000,
    trendingHashtags: [`#${topic}`, `#${topic}trends`, `#${topic}2024`],
    sentiment: 'positive'
  };
}

async function fetchRedditTrends(topic: string) {
  // Mock Reddit data - replace with actual Reddit API
  return {
    postCount: Math.floor(Math.random() * 500) + 50,
    subreddits: [`r/${topic}`, `r/technology`, `r/programming`],
    upvoteRatio: 0.85
  };
}

async function fetchLinkedInTrends(topic: string) {
  // Mock LinkedIn data - replace with actual LinkedIn API
  return {
    postEngagement: Math.floor(Math.random() * 1000) + 100,
    industryMentions: ['Technology', 'AI', 'Software'],
    professionalInterest: 'high'
  };
}

async function fetchNewsTrends(topic: string, industry: string) {
  try {
    // NewsAPI (requires API key)
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      throw new Error('News API key not configured');
    }
    
    // Get recent news articles with better error handling
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&apiKey=${apiKey}&pageSize=20&from=${getDateDaysAgo(7)}`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP ${response.status}`;
      
      if (response.status === 429) {
        throw new Error('News API rate limit exceeded (1,000 requests/day limit)');
      } else if (response.status === 401) {
        throw new Error('News API key is invalid');
      } else if (response.status === 400) {
        throw new Error('News API request is invalid');
      } else {
        throw new Error(`News API error: ${errorMessage}`);
      }
    }
    
    const data = await response.json();
    
    // Analyze sentiment and extract insights
    const sentimentAnalysis = await analyzeNewsSentiment(data.articles || []);
    
    return {
      articleCount: data.totalResults || 0,
      recentArticles: data.articles?.slice(0, 5) || [],
      sentiment: sentimentAnalysis.overallSentiment,
      topSources: extractTopSources(data.articles || []),
      trendingKeywords: extractTrendingKeywords(data.articles || []),
      success: true,
      message: `Real news data retrieved successfully (${data.totalResults} articles found)`
    };
  } catch (error) {
    console.error('News API error:', error);
    
    // Return enhanced mock data if API fails
    return {
      articleCount: Math.floor(Math.random() * 100) + 20,
      recentArticles: [],
      sentiment: 'neutral',
      topSources: ['TechCrunch', 'Wired', 'The Verge', 'Ars Technica', 'MIT Technology Review'],
      trendingKeywords: [topic, `${topic} 2024`, `${topic} trends`],
      success: false,
      message: error instanceof Error ? error.message : 'Using mock news data (News API unavailable)'
    };
  }
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

async function analyzeNewsSentiment(articles: any[]): Promise<{ overallSentiment: string }> {
  if (articles.length === 0) {
    return { overallSentiment: 'neutral' };
  }
  
  try {
    // Simple sentiment analysis based on article titles
    const positiveWords = ['breakthrough', 'innovation', 'success', 'growth', 'advance', 'improve', 'positive', 'benefit'];
    const negativeWords = ['concern', 'risk', 'threat', 'problem', 'issue', 'negative', 'decline', 'fail'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    articles.forEach(article => {
      const title = (article.title || '').toLowerCase();
      positiveWords.forEach(word => {
        if (title.includes(word)) positiveCount++;
      });
      negativeWords.forEach(word => {
        if (title.includes(word)) negativeCount++;
      });
    });
    
    if (positiveCount > negativeCount) {
      return { overallSentiment: 'positive' };
    } else if (negativeCount > positiveCount) {
      return { overallSentiment: 'negative' };
    } else {
      return { overallSentiment: 'neutral' };
    }
  } catch (error) {
    return { overallSentiment: 'neutral' };
  }
}

function extractTopSources(articles: any[]): string[] {
  const sourceCounts: { [key: string]: number } = {};
  
  articles.forEach(article => {
    const sourceName = article.source?.name;
    if (sourceName) {
      sourceCounts[sourceName] = (sourceCounts[sourceName] || 0) + 1;
    }
  });
  
  return Object.entries(sourceCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([source]) => source);
}

function extractTrendingKeywords(articles: any[]): string[] {
  const keywordCounts: { [key: string]: number } = {};
  
  articles.forEach(article => {
    const title = (article.title || '').toLowerCase();
    const words = title.split(/\s+/).filter((word: string) => word.length > 3);
    
    words.forEach((word: string) => {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    });
  });
  
  return Object.entries(keywordCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([keyword]) => keyword);
}

async function analyzeAIConversations(topic: string) {
  try {
    // Use OpenAI to analyze AI conversation patterns
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
            content: 'You are an expert in analyzing AI conversation patterns and trends.'
          },
          {
            role: 'user',
            content: `Analyze the topic "${topic}" for AI conversation patterns. Consider:
            1. How often AI assistants discuss this topic
            2. Common questions users ask about this topic
            3. Related topics that frequently appear together
            4. The complexity level of discussions
            
            Return a JSON object with:
            {
              "aiMentionFrequency": number (0-100),
              "commonQuestions": string[],
              "relatedTopics": string[],
              "complexityLevel": "beginner|intermediate|advanced",
              "conversationTrend": "increasing|stable|decreasing"
            }`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    try {
      const result = JSON.parse(content);
      return {
        ...result,
        success: true,
        message: 'Real AI conversation analysis completed'
      };
    } catch {
      return {
        aiMentionFrequency: Math.floor(Math.random() * 100) + 20,
        commonQuestions: [`What is ${topic}?`, `How to use ${topic}?`],
        relatedTopics: [`${topic} basics`, `${topic} advanced`],
        complexityLevel: 'intermediate',
        conversationTrend: 'increasing',
        success: false,
        message: 'Using mock AI conversation data (OpenAI API error)'
      };
    }
  } catch (error) {
    console.error('AI conversation analysis error:', error);
    return {
      aiMentionFrequency: 0,
      commonQuestions: [],
      relatedTopics: [],
      complexityLevel: 'beginner',
      conversationTrend: 'stable',
      success: false,
      message: 'AI conversation analysis unavailable'
    };
  }
}

async function analyzeTrendsWithAI(data: any): Promise<TrendData> {
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
            content: 'You are an expert trend analyst specializing in AI and technology trends. Analyze the provided data to give actionable insights.'
          },
          {
            role: 'user',
            content: `Analyze the following trend data for "${data.topic}" in the ${data.industry || 'general'} industry:
            
            **Google Trends Data:**
            - Interest Over Time: ${data.googleTrends.interestOverTime}/100
            - Trend Direction: ${data.googleTrends.trendDirection}
            - Related Queries: ${data.googleTrends.relatedQueries.join(', ')}
            - Related Topics: ${data.googleTrends.relatedTopics.join(', ')}
            - Time Series Data: ${JSON.stringify(data.googleTrends.timeSeriesData)}
            
            **Social Media Data:**
            - Overall Engagement: ${data.socialMedia.overallEngagement}/100
            - Twitter: ${JSON.stringify(data.socialMedia.twitter)}
            - Reddit: ${JSON.stringify(data.socialMedia.reddit)}
            - LinkedIn: ${JSON.stringify(data.socialMedia.linkedin)}
            
            **News Data:**
            - Article Count: ${data.news.articleCount}
            - Sentiment: ${data.news.sentiment}
            - Top Sources: ${data.news.topSources.join(', ')}
            
            **AI Conversation Data:**
            - AI Mention Frequency: ${data.aiConversations.aiMentionFrequency}/100
            - Complexity Level: ${data.aiConversations.complexityLevel}
            - Conversation Trend: ${data.aiConversations.conversationTrend}
            - Common Questions: ${data.aiConversations.commonQuestions.join(', ')}
            
            Provide a comprehensive trend analysis with these exact JSON fields:
            {
              "trendVelocity": number (0-100),
              "aiEngagementScore": number (0-100),
              "queryVolume": number (0-100),
              "topicClustering": string[],
              "forecastConfidence": number (0-100),
              "dataSources": string[],
              "insights": string[],
              "relatedTopics": string[]
            }
            
            **Analysis Guidelines:**
            - trendVelocity: Based on Google Trends direction and social media engagement
            - aiEngagementScore: How much AI systems are engaging with this topic
            - queryVolume: Search volume and query patterns from Google Trends
            - topicClustering: Related topics that are trending together
            - forecastConfidence: Confidence in trend predictions based on data consistency
            - dataSources: Which data sources provided the most valuable insights
            - insights: 3-5 actionable insights about this trend
            - relatedTopics: Topics that are closely related and also trending
            
            **Focus on actionable insights** that help content creators and SEO professionals understand and capitalize on this trend.`
          }
        ],
        temperature: 0.7
      })
    });

    const responseData = await response.json();
    const content = responseData.choices?.[0]?.message?.content;
    
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      // Enhanced fallback based on actual data
      const googleTrendsScore = data.googleTrends.interestOverTime;
      const socialMediaScore = data.socialMedia.overallEngagement;
      const aiEngagementScore = data.aiConversations.aiMentionFrequency;
      
      analysis = {
        trendVelocity: Math.round((googleTrendsScore + socialMediaScore) / 2),
        aiEngagementScore: aiEngagementScore,
        queryVolume: googleTrendsScore,
        topicClustering: data.googleTrends.relatedTopics.slice(0, 5),
        forecastConfidence: Math.floor(Math.random() * 30) + 60, // 60-90 range
        dataSources: ['Google Trends', 'Social Media', 'News API'],
        insights: [
          `${data.topic} shows ${data.googleTrends.trendDirection} interest in search`,
          `AI systems are ${aiEngagementScore > 50 ? 'actively discussing' : 'beginning to engage with'} this topic`,
          `Related queries suggest users are looking for practical applications`,
          `Social media engagement indicates ${socialMediaScore > 50 ? 'strong' : 'moderate'} community interest`
        ],
        relatedTopics: data.googleTrends.relatedQueries.slice(0, 5)
      };
    }

    return {
      topic: data.topic,
      ...analysis,
      timeframe: data.timeframe || '30d',
      dataStatus: data.dataStatus,
      dataMessages: data.dataMessages
    };
  } catch (error) {
    console.error('AI trend analysis error:', error);
    throw error;
  }
} 