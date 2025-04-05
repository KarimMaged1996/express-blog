import nodemailer from "nodemailer";

// import config
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.GMAIL_ACCOUNT,
    pass: config.GMAIL_PASSWORD,
  },
});

export const sendMail = async (details: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    await transporter.sendMail({
      from: config.GMAIL_ACCOUNT,
      ...details,
    });
  } catch (err) {
    console.error(err);
  }
};
