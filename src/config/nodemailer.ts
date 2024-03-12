import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_FROM,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.GMAIL_FROM,
};
