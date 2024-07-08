import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const sendEmail = expressAsyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });
  console.log("Message sent successfully: %s", info.messageId);
  console.log("Preview URL : &s", nodemailer.getTestMessageUrl(info));
});

export default sendEmail;
