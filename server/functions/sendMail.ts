"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendMail = async ({
  to,
  from = process.env.ADMIN_EMAIL!,
  content,
}: {
  to: string;
  from?: string;
  content: { subject: string; text: string; html: string };
}) => {
  try {
    const mailOptions = {
      from: from,
      to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
