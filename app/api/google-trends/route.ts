import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleTrendsCombined } from '../../../lib/googleTrends';

export async function POST(req: NextRequest) {
  const { topic, timeframe = '30d', geo = '' } = await req.json();
  const result = await fetchGoogleTrendsCombined(topic, timeframe, geo);
  return NextResponse.json(result);
} 