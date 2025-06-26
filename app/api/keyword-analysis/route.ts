import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  console.log('Received keyword:', keyword);

  const prompt = `
    Analyze the keyword "${keyword}" for:
    - AI Relevance (score 0-100)
    - Semantic Score (score 0-100)
    - Context Strength (score 0-100)
    - LLM Understanding (score 0-100)
    - Suggestions for improvement (as a list)
    - Related terms (as a list)
    - A short AI context summary

    Respond ONLY with a valid JSON object with these exact fields:
    {
      "aiRelevance": number,
      "semanticScore": number,
      "contextStrength": number,
      "llmUnderstanding": number,
      "suggestions": string[],
      "relatedTerms": string[],
      "aiContext": string
    }
  `;

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
          { role: 'system', content: 'You are an expert in AI SEO and LLM optimization.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log('OpenAI API response:', data);

    const content = data.choices?.[0]?.message?.content;
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      result = {};
    }
    result = {
      aiRelevance: typeof result.aiRelevance === 'number' ? result.aiRelevance : 0,
      semanticScore: typeof result.semanticScore === 'number' ? result.semanticScore : 0,
      contextStrength: typeof result.contextStrength === 'number' ? result.contextStrength : 0,
      llmUnderstanding: typeof result.llmUnderstanding === 'number' ? result.llmUnderstanding : 0,
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      relatedTerms: Array.isArray(result.relatedTerms) ? result.relatedTerms : [],
      aiContext: typeof result.aiContext === 'string' ? result.aiContext : '',
      keyword,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({
      aiRelevance: 0,
      semanticScore: 0,
      contextStrength: 0,
      llmUnderstanding: 0,
      suggestions: [],
      relatedTerms: [],
      aiContext: 'Error contacting OpenAI API.',
      keyword,
    });
  }
} 