const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Validate required env vars
    const requiredVars = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    if (missing.length > 0) {
        throw new Error(`Missing SMTP config: ${missing.join(', ')}. See backend/EMAIL_SETUP.md`);
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465', // secure for port 465
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"DazzleAura" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message.replace(/\n/g, '<br>')
    };

    try {
        // Verify transporter
        await transporter.verify();
        console.log('SMTP server ready');

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${options.email}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('❌ Email send failed:', error.message);
        throw error; // Propagate to API for client feedback
    }
};

module.exports = sendEmail;

