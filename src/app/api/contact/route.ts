import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      fullName,
      email,
      company,
      phone,
      subject,
      projectType,
      budget,
      message,
    } = body

    // Server-side validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Rate limiting (simple implementation)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    // In production, you'd use Redis or a database for rate limiting
    // For now, we'll proceed without complex rate limiting

    // Prepare email content with better spam protection
    const plainTextContent = `
New Contact Form Submission

Contact Information
-------------------
Name: ${fullName}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}

Project Details
---------------
Subject: ${subject}
${projectType ? `Project Type: ${projectType}` : ''}
${budget ? `Budget Range: ${budget}` : ''}

Message
-------
${message}

---
Sent from Portfolio Website Contact Form
`.trim()

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">Project Details</h2>
          <p><strong>Subject:</strong> ${subject}</p>
          ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
          ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
          
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">Message</h2>
          <div style="background: white; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
            <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This message was sent from your portfolio website contact form.<br>
            Sender: ${fullName} (${email})
          </p>
        </div>
      </body>
      </html>
    `

    // Send email using Resend with proper headers
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'msutsho55@gmail.com',
      subject: `[Portfolio Contact] ${subject} - from ${fullName}`,
      html: htmlContent,
      text: plainTextContent,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Portfolio Contact Form',
        'List-Unsubscribe': `<mailto:${email}>`,
      },
    })

    if (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
