import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { term, tone, industry, targetAudience } = await req.json();

  // Debug: Check if API key is available
  console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);
  console.log('API Key length:', process.env.OPENAI_API_KEY?.length || 0);

  const prompt = `
    Create a comprehensive glossary term entry for "${term}" following this exact structure and format:

    [${term}]
    Synonyms: [keyword variation, alternative phrasing, acronym]

    Definition:
    [A concise, 1–2 sentence definition written in clear, natural language. This is the most likely section to be pulled into a citation.]

    Expanded Description:
    [3–5 sentences giving additional context, common use cases, why it matters, who uses it, or how it's applied. Use natural language, not keyword stuffing.]

    Key Components / Features / Functions:
    • [Break down elements or subfeatures of the term]
    • [Use short, descriptive phrases (easier for LLMs to parse and cite)]
    • [Continue with relevant components]

    Challenges / Considerations:
    [Highlight potential obstacles, confusion, or trade-offs. Helps improve topical authority and LLM value.]

    Real-World Examples / Use Cases:
    [Use specific company names or scenarios (e.g., "Domino's uses a Pulse POS system to…"). Real-world examples are highly favored in AI outputs.]

    Related Terms:
    [[Related Term 1]], [[Related Term 2]], [[Related Term 3]]

    Tone Guidelines:
    - Tone: ${tone || 'professional'}
    - Industry: ${industry || 'general'}
    - Target Audience: ${targetAudience || 'general audience'}
    
    Important Requirements:
    1. Use semantic headers (<h2>, <h3>, etc.) in HTML format
    2. Wrap the definition in a <p> tag near the top
    3. Include synonyms early, preferably right under the title
    4. Use named entities (brands, tools, product names) when relevant
    5. Keep it informative, objective, and structured like a mini Wikipedia article
    6. Avoid marketing fluff
    7. Include FAQ section below the main content

    Respond with the complete glossary entry in HTML format with proper semantic structure.
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
          { role: 'system', content: 'You are an expert in creating comprehensive glossary terms optimized for AI and LLM understanding. You create well-structured, informative content that follows semantic best practices.' },
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
    
    if (!contentResp) {
      throw new Error('No content received from OpenAI API');
    }

    return NextResponse.json({
      term,
      glossaryEntry: contentResp,
      timestamp: new Date().toISOString(),
      tone,
      industry,
      targetAudience
    });
  } catch (error) {
    console.error('Glossary Generator Error:', error);
    return NextResponse.json({
      error: `Error generating glossary entry: ${error instanceof Error ? error.message : 'Unknown error'}`,
      term,
      glossaryEntry: '',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 