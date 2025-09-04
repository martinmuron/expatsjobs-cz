import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    summary: string;
  };
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  skills: Array<{
    name: string;
    level: string;
  }>;
}

async function enhanceWithAI(cvData: CVData): Promise<CVData> {
  if (!process.env.OPENAI_API_KEY) {
    return cvData; // Return original data if no API key
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional CV writing assistant. Improve the professional summary and job descriptions to make them more impactful and ATS-friendly. Keep the original meaning but enhance the language. Return the same JSON structure with improved content.'
          },
          {
            role: 'user',
            content: `Please enhance this CV data: ${JSON.stringify(cvData)}`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      const enhancedData = JSON.parse(result.choices[0].message.content);
      return enhancedData;
    }
  } catch (error) {
    console.error('Error enhancing CV with AI:', error);
  }

  return cvData; // Return original data if AI enhancement fails
}

function generateHTML(cvData: CVData): string {
  const formatDate = (dateStr: string, current: boolean = false) => {
    if (current) return 'Present';
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const skillLevelMap = {
    beginner: '★☆☆☆',
    intermediate: '★★☆☆',
    advanced: '★★★☆',
    expert: '★★★★'
  };

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CV - ${cvData.personalInfo.fullName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2563eb;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;
            color: #666;
        }
        
        .contact-info span {
            display: flex;
            align-items: center;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 1.5em;
            color: #2563eb;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .summary {
            font-size: 16px;
            line-height: 1.7;
            color: #555;
            text-align: justify;
        }
        
        .experience-item, .education-item {
            margin-bottom: 20px;
            padding-left: 20px;
            border-left: 3px solid #2563eb;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 1.1em;
            color: #2563eb;
        }
        
        .item-company {
            font-weight: 600;
            color: #374151;
        }
        
        .item-date {
            color: #6b7280;
            font-size: 14px;
            white-space: nowrap;
        }
        
        .item-description {
            margin-top: 8px;
            color: #555;
            line-height: 1.6;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .skill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #f8fafc;
            border-radius: 5px;
        }
        
        .skill-name {
            font-weight: 500;
        }
        
        .skill-level {
            color: #2563eb;
            font-size: 14px;
        }
        
        .degree-field {
            color: #6b7280;
            font-style: italic;
        }
        
        @media print {
            body {
                margin: 0;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${cvData.personalInfo.fullName}</h1>
            <div class="contact-info">
                ${cvData.personalInfo.email ? `<span>✉ ${cvData.personalInfo.email}</span>` : ''}
                ${cvData.personalInfo.phone ? `<span>📞 ${cvData.personalInfo.phone}</span>` : ''}
                ${cvData.personalInfo.location ? `<span>📍 ${cvData.personalInfo.location}</span>` : ''}
                ${cvData.personalInfo.linkedIn ? `<span>🔗 ${cvData.personalInfo.linkedIn}</span>` : ''}
            </div>
        </div>

        ${cvData.personalInfo.summary ? `
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="summary">${cvData.personalInfo.summary}</div>
        </div>
        ` : ''}

        ${cvData.experiences.length > 0 && cvData.experiences[0].company ? `
        <div class="section">
            <h2 class="section-title">Work Experience</h2>
            ${cvData.experiences.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.position}</div>
                            <div class="item-company">${exp.company}</div>
                        </div>
                        <div class="item-date">
                            ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                    </div>
                    ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${cvData.education.length > 0 && cvData.education[0].institution ? `
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${cvData.education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${edu.degree}</div>
                            <div class="item-company">${edu.institution}</div>
                            ${edu.field ? `<div class="degree-field">${edu.field}</div>` : ''}
                        </div>
                        <div class="item-date">
                            ${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${cvData.skills.length > 0 && cvData.skills[0].name ? `
        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${cvData.skills.map(skill => `
                    <div class="skill-item">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skillLevelMap[skill.level as keyof typeof skillLevelMap] || '★☆☆☆'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const cvData: CVData = await req.json();

    // Enhance CV with AI if API key is available
    const enhancedCVData = await enhanceWithAI(cvData);

    // Generate HTML
    const html = generateHTML(enhancedCVData);

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf"`
      }
    });
  } catch (error) {
    console.error('Error generating CV:', error);
    return NextResponse.json({ error: 'Failed to generate CV' }, { status: 500 });
  }
}