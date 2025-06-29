import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const SERP_API_KEY = process.env.SERP_API_KEY;
  
  if (!SERP_API_KEY) {
    return NextResponse.json({
      success: false,
      error: 'No SERP_API_KEY found',
      message: 'Please add SERP_API_KEY to your environment variables'
    });
  }

  try {
    console.log('Testing SerpApi with key length:', SERP_API_KEY.length);
    
    // Test with a simple search first
    const testResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google',
        q: 'test',
        api_key: SERP_API_KEY
      }
    });

    console.log('SerpApi test response status:', testResponse.status);
    console.log('SerpApi test response keys:', Object.keys(testResponse.data || {}));

    // Now test Google Trends with correct date format
    const trendsResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_trends',
        q: 'artificial intelligence',
        data_type: 'TIMESERIES',
        geo: 'US',
        date: 'today 1-m', // Fixed date format
        api_key: SERP_API_KEY
      }
    });

    console.log('SerpApi trends response status:', trendsResponse.status);
    console.log('SerpApi trends response keys:', Object.keys(trendsResponse.data || {}));

    return NextResponse.json({
      success: true,
      testSearch: {
        status: testResponse.status,
        hasData: !!testResponse.data,
        dataKeys: Object.keys(testResponse.data || {})
      },
      trendsSearch: {
        status: trendsResponse.status,
        hasData: !!trendsResponse.data,
        dataKeys: Object.keys(trendsResponse.data || {}),
        hasInterestData: !!trendsResponse.data?.interest_over_time,
        hasTimelineData: !!trendsResponse.data?.interest_over_time?.timeline_data
      },
      message: 'SerpApi test completed successfully'
    });

  } catch (error) {
    console.error('SerpApi test error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      response: (error as any)?.response?.data,
      status: (error as any)?.response?.status,
      statusText: (error as any)?.response?.statusText
    });

    return NextResponse.json({
      success: false,
      error: 'SerpApi test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: {
        response: (error as any)?.response?.data,
        status: (error as any)?.response?.status,
        statusText: (error as any)?.response?.statusText
      }
    });
  }
} 