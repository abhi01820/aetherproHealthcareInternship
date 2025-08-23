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

    // Check if Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an AAPC-certified medical coder and compliance auditor with extensive experience in medical coding, billing, and compliance. Create professional, structured medical coding audit reports that doctors and medical professionals can easily understand and use. FORMATTING REQUIREMENTS: 1) Use ONLY ordered lists (1., 2., 3.) - NEVER use asterisks (*), dashes (-), or bullet points, 2) Create well-structured tables with clear borders using | characters, 3) Use proper medical terminology and professional language, 4) Structure your response with clear headings and numbered sections, 5) Present information in a logical, clinical flow that follows standard medical documentation practices, 6) Ensure all tables are properly aligned and easy to read, 7) Use consistent formatting throughout the report, 8) Avoid any special characters or symbols except for standard punctuation. Your response should look like a professional medical report that a doctor would write for their colleagues.

${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.3,
          topP: 1,
          topK: 40,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      
      // Provide more specific error messages
      if (errorData.error?.code === 400) {
        return NextResponse.json(
          { error: 'Invalid request to Gemini API. Please check your prompt.' },
          { status: 400 }
        );
      } else if (errorData.error?.code === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your Gemini API key.' },
          { status: 401 }
        );
      } else if (errorData.error?.code === 429) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your Gemini API usage limits.' },
          { status: 429 }
        );
      } else {
        return NextResponse.json(
          { error: `Gemini API error: ${errorData.error?.message || 'Unknown error'}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    let recommendations = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!recommendations) {
      return NextResponse.json(
        { error: 'No recommendations generated' },
        { status: 500 }
      );
    }

    // Clean up unwanted characters and format the response
    recommendations = cleanAndFormatResponse(recommendations);

    return NextResponse.json({ recommendations });

  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Function to clean and format the response
function cleanAndFormatResponse(text: string): string {
  // Remove unwanted characters and literals
  let cleaned = text
    // Remove markdown headers (#, ##, ###)
    .replace(/^#{1,6}\s*/gm, '')
    // Remove asterisks and other unwanted characters
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/~/g, '')
    .replace(/^[-+]\s*/gm, '') // Remove bullet points
    // Remove extra whitespace and normalize
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Convert any remaining bullet-like patterns to ordered lists
  cleaned = cleaned.replace(/^[•▪▫‣⁃]\s*/gm, (match) => {
    // Find the current section to determine the starting number
    const lines = cleaned.split('\n');
    const currentLineIndex = lines.findIndex(line => line.includes(match));
    if (currentLineIndex > 0) {
      // Look for previous list items to determine the next number
      let listNumber = 1;
      for (let i = currentLineIndex - 1; i >= 0; i--) {
        const prevLine = lines[i];
        if (prevLine.match(/^\d+\./)) {
          const num = parseInt(prevLine.match(/^(\d+)\./)?.[1] || '0');
          listNumber = num + 1;
          break;
        }
      }
      return `${listNumber}. `;
    }
    return '1. ';
  });

  // Ensure proper table formatting
  cleaned = cleaned.replace(/\|/g, ' | ');

  // Add proper spacing around tables
  cleaned = cleaned.replace(/(\n)(\|.*\|)(\n)/g, '$1$2$3');

  // Ensure consistent formatting for ordered lists
  cleaned = cleaned.replace(/^(\d+)\.\s*/gm, '$1. ');

  // Structure sections with proper spacing and formatting
  cleaned = structureSections(cleaned);

  return cleaned;
}

// Function to structure sections with proper formatting
function structureSections(text: string): string {
  const lines = text.split('\n');
  const structuredLines: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      if (inTable && tableLines.length > 0) {
        // Convert table to structured sections
        const tableSections = convertTableToSections(tableLines);
        structuredLines.push('', ...tableSections, '');
        tableLines = [];
        inTable = false;
      } else if (structuredLines.length > 0 && structuredLines[structuredLines.length - 1] !== '') {
        structuredLines.push('');
      }
      continue;
    }

    // Check if line is part of a table
    if (line.includes('|')) {
      if (!inTable) {
        inTable = true;
        // Add section header spacing before table
        if (structuredLines.length > 0 && structuredLines[structuredLines.length - 1] !== '') {
          structuredLines.push('');
        }
      }
      tableLines.push(line);
    } else {
      // Not a table line
      if (inTable && tableLines.length > 0) {
        // Convert table to structured sections
        const tableSections = convertTableToSections(tableLines);
        structuredLines.push('', ...tableSections, '');
        tableLines = [];
        inTable = false;
      }

      // Check if this is a section header (contains numbers or key words)
      if (line.match(/^\d+\.|^[A-Z][a-z]+:|^[A-Z\s]+$/) || 
          line.toLowerCase().includes('section') || 
          line.toLowerCase().includes('audit') ||
          line.toLowerCase().includes('recommendation') ||
          line.toLowerCase().includes('finding') ||
          line.toLowerCase().includes('code') ||
          line.toLowerCase().includes('table')) {
        
        // Add spacing before new section
        if (structuredLines.length > 0 && structuredLines[structuredLines.length - 1] !== '') {
          structuredLines.push('');
        }
        structuredLines.push(line);
        // Add spacing after section header
        structuredLines.push('');
      } else {
        structuredLines.push(line);
      }
    }
  }

  // Handle any remaining table
  if (inTable && tableLines.length > 0) {
    const tableSections = convertTableToSections(tableLines);
    structuredLines.push('', ...tableSections, '');
  }

  // Clean up multiple consecutive empty lines
  return structuredLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Function to convert table content to structured sections
function convertTableToSections(tableLines: string[]): string[] {
  const sections: string[] = [];
  
  // Skip header and separator lines
  const dataLines = tableLines.filter(line => 
    line.includes('|') && 
    !line.match(/^\s*\|[\s\-:]+\|/g) && 
    line.trim() !== '|'
  );

  for (const line of dataLines) {
    const columns = line.split('|').map(col => col.trim()).filter(col => col);
    
    if (columns.length >= 4) {
      const section = columns[0];
      const issue = columns[1];
      const risk = columns[2];
      const recommendation = columns[3];
      const guideline = columns[4] || '';

      // Create structured section
      sections.push(`${section}:`);
      
      if (issue && issue !== 'N/A' && !issue.includes('✅')) {
        sections.push(`Issue: ${issue}`);
      }
      
      if (risk && risk !== 'N/A') {
        sections.push(`Risk: ${risk}`);
      }
      
      if (recommendation && recommendation !== 'N/A') {
        sections.push(`Recommendation: ${recommendation}`);
      }
      
      if (guideline && guideline !== 'N/A') {
        sections.push(`Guideline Reference: ${guideline}`);
      }
      
      sections.push(''); // Add spacing between sections
    }
  }

  return sections;
} 