import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const newsApiKey = process.env.NEWS_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    newsApiKey: newsApiKey ? `${newsApiKey.substring(0, 8)}...` : 'NOT SET',
    openaiApiKey: openaiApiKey ? `${openaiApiKey.substring(0, 8)}...` : 'NOT SET',
    hasNewsApiKey: !!newsApiKey,
    hasOpenaiApiKey: !!openaiApiKey,
    nodeEnv: process.env.NODE_ENV,
    message: 'Environment variables check'
  });
} 