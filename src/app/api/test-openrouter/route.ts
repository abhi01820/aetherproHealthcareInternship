import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'OpenRouter API key not found',
          message: 'Please add OPENROUTER_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    // Test the API with a simple request using Google Gemini 2.0 Flash
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Clinic Management System',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            {
              role: 'user',
              content: 'Hello! Can you help me with medical coding recommendations?'
            }
          ],
          max_tokens: 100,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      
      return NextResponse.json(
        { 
          error: 'OpenRouter API test failed',
          details: errorText,
          message: 'Check if your API key is valid and has access to Google Gemini Pro'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the chatbot's reply from the response
    const reply =
      data?.choices?.[0]?.message?.content ||
      'Sorry, no response received from the model.';

    return NextResponse.json({
      success: true,
      message: 'OpenRouter API with Google Gemini Pro is working!',
      reply, // Only return the chatbot's reply
      apiKey: apiKey.substring(0, 10) + '...'
    });

  } catch (error) {
    console.error('Error testing OpenRouter API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test OpenRouter API',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
