import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`ای میل ${to} کو بھیجی گئی`);
  } catch (error) {
    console.error('ای میل بھیجنے میں خرابی:', error);
  }
};

const sendOrderConfirmation = async (email, order) => {
  const html = `
    <h2>آپ کا آرڈر تصدیق شدہ ہے</h2>
    <p>آرڈر ID: ${order._id}</p>
    <p>کل رقم: ${order.totalAmount}</p>
    <p>حالت: ${order.status}</p>
  `;
  await sendEmail(email, 'آرڈر تصدیق', html);
};

const sendOrderShipped = async (email, order) => {
  const html = `
    <h2>آپ کا آرڈر شپ ہو گیا</h2>
    <p>آرڈر ID: ${order._id}</p>
    <p>ٹریکنگ نمبر: ${order.trackingNumber}</p>
  `;
  await sendEmail(email, 'آرڈر شپ ہو گیا', html);
};

export { sendEmail, sendOrderConfirmation, sendOrderShipped };
