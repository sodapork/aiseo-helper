import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic') || 'artificial intelligence';
  const timeframe = searchParams.get('timeframe') || '30d';

  try {
    // Test the Google Trends API
    const response = await fetch(`${req.nextUrl.origin}/api/google-trends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, timeframe })
    });

    const data = await response.json();

    return NextResponse.json({
      test: 'Google Trends API Test',
      topic,
      timeframe,
      timestamp: new Date().toISOString(),
      apiResponse: data,
      environment: {
        hasSerpApiKey: !!process.env.SERP_API_KEY,
        hasRapidApiKey: !!process.env.RAPID_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        serpApiKeyLength: process.env.SERP_API_KEY ? process.env.SERP_API_KEY.length : 0
      }
    });

  } catch (error) {
    return NextResponse.json({
      test: 'Google Trends API Test',
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: {
        hasSerpApiKey: !!process.env.SERP_API_KEY,
        hasRapidApiKey: !!process.env.RAPID_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        serpApiKeyLength: process.env.SERP_API_KEY ? process.env.SERP_API_KEY.length : 0
      }
    });
  }
} 