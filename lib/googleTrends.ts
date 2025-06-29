import axios from 'axios';

export interface GoogleTrendsResponse {
  success: boolean;
  data?: {
    interest_over_time: number;
    related_queries: string[];
    related_topics: string[];
    geographic_data: any[];
    trend_direction: string;
    time_series_data: any[];
  };
  error?: string;
  message?: string;
}

export async function fetchGoogleTrendsCombined(topic: string, timeframe: string = '30d', geo: string = ''): Promise<GoogleTrendsResponse> {
  if (!topic) {
    return {
      success: false,
      error: 'Topic is required'
    };
  }
  try {
    // Option 1: SerpApi Google Trends (Recommended - more reliable)
    const trendsData = await fetchSerpApiTrends(topic, timeframe, geo);
    if (trendsData.success) {
      return trendsData;
    }
    // Option 2: RapidAPI Google Trends (Fallback)
    const rapidApiData = await fetchRapidApiTrends(topic, timeframe, geo);
    if (rapidApiData.success) {
      return rapidApiData;
    }
    // Option 3: Enhanced mock data as final fallback
    return generateEnhancedMockData(topic, timeframe);
  } catch (error) {
    console.error('Google Trends API error:', error);
    return {
      success: false,
      error: 'Failed to fetch trends data',
      data: generateEnhancedMockData(topic, timeframe).data
    };
  }
}

async function fetchSerpApiTrends(topic: string, timeframe: string, geo: string): Promise<GoogleTrendsResponse> {
  const SERP_API_KEY = process.env.SERP_API_KEY;
  if (!SERP_API_KEY) {
    return {
      success: false,
      error: 'SERP_API_KEY not configured',
      message: 'Please add SERP_API_KEY to your environment variables'
    };
  }
  try {
    // Get interest over time
    const interestResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends',
        q: topic,
        data_type: 'TIMESERIES',
        geo: geo || 'US',
        date: getSerpApiDateRange(timeframe),
        api_key: SERP_API_KEY
      }
    });
    // Use only the first query for RELATED_QUERIES and RELATED_TOPICS
    const singleQuery = topic.split(',')[0];
    // Get related queries
    const relatedQueriesResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends',
        q: singleQuery,
        data_type: 'RELATED_QUERIES',
        geo: geo || 'US',
        date: getSerpApiDateRange(timeframe),
        api_key: SERP_API_KEY
      }
    });
    // Get related topics
    const relatedTopicsResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends',
        q: singleQuery,
        data_type: 'RELATED_TOPICS',
        geo: geo || 'US',
        date: getSerpApiDateRange(timeframe),
        api_key: SERP_API_KEY
      }
    });
    // Get geographic data
    const geoResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends',
        q: topic,
        data_type: 'GEO_MAP',
        geo: geo || 'US',
        date: getSerpApiDateRange(timeframe),
        api_key: SERP_API_KEY
      }
    });
    // Log the full responses for debugging
    console.log('SerpApi interestResponse.data:', JSON.stringify(interestResponse.data, null, 2));
    console.log('SerpApi relatedQueriesResponse.data:', JSON.stringify(relatedQueriesResponse.data, null, 2));
    console.log('SerpApi relatedTopicsResponse.data:', JSON.stringify(relatedTopicsResponse.data, null, 2));
    const interestData = interestResponse.data;
    const relatedQueriesData = relatedQueriesResponse.data;
    const relatedTopicsData = relatedTopicsResponse.data;
    const geoData = geoResponse.data;
    const timeSeriesData = Array.isArray(interestData.interest_over_time?.timeline_data)
      ? interestData.interest_over_time.timeline_data
      : [];
    const interestOverTime = timeSeriesData.length > 0
      ? Math.round(
          timeSeriesData.reduce(
            (sum: any, point: any) => sum + (point.values?.[0]?.extracted_value || 0),
            0
          ) / timeSeriesData.length
        )
      : 0;
    // Updated extraction for related queries
    const relatedQueries = Array.isArray(relatedQueriesData.related_queries?.rising)
      ? relatedQueriesData.related_queries.rising.map((item: any) => item.query)
      : Array.isArray(relatedQueriesData.related_queries?.top)
        ? relatedQueriesData.related_queries.top.map((item: any) => item.query)
        : [];
    // Updated extraction for related topics
    const relatedTopics = Array.isArray(relatedTopicsData.related_topics?.rising)
      ? relatedTopicsData.related_topics.rising.map((item: any) => item.topic?.title || '')
      : Array.isArray(relatedTopicsData.related_topics?.top)
        ? relatedTopicsData.related_topics.top.map((item: any) => item.topic?.title || '')
        : [];
    const geographicData = Array.isArray(geoData.interest_by_region)
      ? geoData.interest_by_region
      : [];
    return {
      success: true,
      data: {
        interest_over_time: interestOverTime,
        related_queries: relatedQueries,
        related_topics: relatedTopics,
        geographic_data: geographicData,
        trend_direction: calculateTrendDirection(timeSeriesData),
        time_series_data: timeSeriesData.slice(-7)
      },
      message: 'Real Google Trends data from SerpApi'
    };
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error && (error as any).response?.data) {
      console.error('SerpApi fetch error:', (error as any).response.data);
    } else {
      console.error('SerpApi fetch error:', error);
    }
    return {
      success: false,
      error: 'SerpApi request failed',
      message: `Failed to fetch data from SerpApi: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function fetchRapidApiTrends(topic: string, timeframe: string, geo: string): Promise<GoogleTrendsResponse> {
  const RAPID_API_KEY = process.env.RAPID_API_KEY;
  if (!RAPID_API_KEY) {
    return {
      success: false,
      error: 'RAPID_API_KEY not configured',
      message: 'Please add RAPID_API_KEY to your environment variables'
    };
  }
  try {
    const response = await axios.get('https://google-trends-api1.p.rapidapi.com/trends', {
      params: {
        q: topic,
        geo: geo || 'US',
        date: getRapidApiDateRange(timeframe)
      },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'google-trends-api1.p.rapidapi.com'
      }
    });
    const data = response.data;
    if (data && data.default && data.default.timelineData) {
      const timeSeriesData = data.default.timelineData;
      const interestOverTime = timeSeriesData.length > 0 
        ? Math.round(timeSeriesData.reduce((sum: number, point: any) => sum + point.value[0], 0) / timeSeriesData.length)
        : 0;
      return {
        success: true,
        data: {
          interest_over_time: interestOverTime,
          related_queries: [],
          related_topics: [],
          geographic_data: [],
          trend_direction: calculateTrendDirection(timeSeriesData),
          time_series_data: timeSeriesData.slice(-7)
        },
        message: 'Real Google Trends data from RapidAPI'
      };
    }
    return {
      success: false,
      error: 'Invalid response format from RapidAPI'
    };
  } catch (error) {
    return {
      success: false,
      error: 'RapidAPI request failed',
      message: 'Failed to fetch data from RapidAPI'
    };
  }
}

function getSerpApiDateRange(timeframe: string): string {
  switch (timeframe) {
    case '7d': return 'now 7-d';
    case '30d': return 'today 1-m';
    case '90d': return 'today 3-m';
    case '1y': return 'today 12-m';
    default: return 'today 1-m';
  }
}

function getRapidApiDateRange(timeframe: string): string {
  switch (timeframe) {
    case '7d': return 'now 7-d';
    case '30d': return 'now 1-m';
    case '90d': return 'now 3-m';
    case '1y': return 'now 12-m';
    default: return 'now 1-m';
  }
}

function calculateTrendDirection(timeSeriesData: any[]): string {
  if (timeSeriesData.length < 2) return 'stable';
  const recent = timeSeriesData.slice(-3);
  const older = timeSeriesData.slice(-6, -3);
  const recentAvg = recent.reduce((sum: number, point: any) => sum + point.value[0], 0) / recent.length;
  const olderAvg = older.reduce((sum: number, point: any) => sum + point.value[0], 0) / older.length;
  const change = ((recentAvg - olderAvg) / olderAvg) * 100;
  if (change > 10) return 'rising';
  if (change < -10) return 'falling';
  return 'stable';
}

function generateEnhancedMockData(topic: string, timeframe: string): GoogleTrendsResponse {
  const baseInterest = Math.floor(Math.random() * 40) + 30; // 30-70 range
  const trendMultiplier = Math.random() * 0.4 + 0.8; // 0.8-1.2 range
  const relatedQueries = [
    `${topic} tutorial`,
    `${topic} examples`,
    `${topic} best practices`,
    `${topic} guide`,
    `${topic} tips`,
    `${topic} tools`,
    `${topic} software`,
    `${topic} platform`,
    `${topic} solution`,
    `${topic} framework`
  ];
  const relatedTopics = [
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Technology',
    'Innovation',
    'Digital Transformation',
    'Automation',
    'Analytics',
    'Cloud Computing',
    'Cybersecurity'
  ];
  const timeSeriesData = Array.from({ length: 7 }, (_, i) => ({
    time: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: [Math.floor(baseInterest * trendMultiplier * (0.9 + Math.random() * 0.2))]
  }));
  return {
    success: false,
    data: {
      interest_over_time: Math.floor(baseInterest * trendMultiplier),
      related_queries: relatedQueries.slice(0, 5),
      related_topics: relatedTopics.slice(0, 5),
      geographic_data: [
        { region: 'United States', value: Math.floor(Math.random() * 100) },
        { region: 'United Kingdom', value: Math.floor(Math.random() * 100) },
        { region: 'Canada', value: Math.floor(Math.random() * 100) },
        { region: 'Australia', value: Math.floor(Math.random() * 100) },
        { region: 'Germany', value: Math.floor(Math.random() * 100) }
      ],
      trend_direction: calculateTrendDirection(timeSeriesData),
      time_series_data: timeSeriesData
    },
    message: 'Enhanced mock data (no API key configured)'
  };
} 