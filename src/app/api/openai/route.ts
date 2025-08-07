import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an AAPC-certified medical coder and compliance auditor with extensive experience in medical coding, billing, and compliance. Provide detailed, accurate, and actionable recommendations for medical coding audits.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      // Provide more specific error messages
      if (errorData.error?.code === 'model_not_found') {
        return NextResponse.json(
          { error: 'Model not available. Please check your OpenAI account access.' },
          { status: 400 }
        );
      } else if (errorData.error?.code === 'insufficient_quota') {
        return NextResponse.json(
          { error: 'API quota exceeded. Please add credits to your OpenAI account.' },
          { status: 402 }
        );
      } else if (errorData.error?.code === 'invalid_api_key') {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OpenAI API key.' },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          { error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    const recommendations = data.choices[0]?.message?.content;

    if (!recommendations) {
      return NextResponse.json(
        { error: 'No recommendations generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ recommendations });

  } catch (error) {
    console.error('Error in OpenAI API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 