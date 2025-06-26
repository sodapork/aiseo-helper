import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  // Debug: Check if API key is available
  console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);
  console.log('API Key length:', process.env.OPENAI_API_KEY?.length || 0);

  const prompt = `
    Analyze and optimize the following content for AI and LLM understanding:
    """
    ${content}
    """
    
    Respond ONLY with a valid JSON object with these exact fields:
    {
      "aiReadability": number, // 0-100
      "contextClarity": number, // 0-100
      "semanticStructure": number, // 0-100
      "llmCompatibility": number, // 0-100
      "suggestions": Array<{ type: string, priority: string, title: string, description: string, example?: string }>,
      "optimizedContent": string,
      "aiContext": string
    }
    - aiReadability: How easily AI can read and parse the content
    - contextClarity: How clearly AI understands the context
    - semanticStructure: How well the content is semantically organized
    - llmCompatibility: How compatible the content is with large language models
    - suggestions: Actionable suggestions for improvement (array of objects)
    - optimizedContent: An improved version of the content
    - aiContext: A short summary of the AI's analysis
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
          { role: 'system', content: 'You are an expert in AI SEO, LLM optimization, and content strategy.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    console.log('OpenAI API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI API Response received');
    
    const contentResp = data.choices?.[0]?.message?.content;
    let result;
    try {
      result = JSON.parse(contentResp);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Raw content response:', contentResp);
      result = {};
    }
    result = {
      aiReadability: typeof result.aiReadability === 'number' ? result.aiReadability : 0,
      contextClarity: typeof result.contextClarity === 'number' ? result.contextClarity : 0,
      semanticStructure: typeof result.semanticStructure === 'number' ? result.semanticStructure : 0,
      llmCompatibility: typeof result.llmCompatibility === 'number' ? result.llmCompatibility : 0,
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      optimizedContent: typeof result.optimizedContent === 'string' ? result.optimizedContent : '',
      aiContext: typeof result.aiContext === 'string' ? result.aiContext : '',
      content,
    };
    return NextResponse.json(result);
  } catch (error) {
    console.error('Content Optimizer Error:', error);
    return NextResponse.json({
      aiReadability: 0,
      contextClarity: 0,
      semanticStructure: 0,
      llmCompatibility: 0,
      suggestions: [],
      optimizedContent: '',
      aiContext: `Error contacting OpenAI API: ${error instanceof Error ? error.message : 'Unknown error'}`,
      content,
    });
  }
} 