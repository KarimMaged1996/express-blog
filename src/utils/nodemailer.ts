import nodemailer from "nodemailer";

// import config
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kmaged2024@gmail.com",
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
      from: "kmaged2024@gmail.com",
      ...details,
    });
  } catch (err) {
    console.error(err);
  }
};
