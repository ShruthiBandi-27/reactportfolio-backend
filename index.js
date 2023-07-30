import express from 'express';
import nodemailer from "nodemailer";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("<h1>Hello,😊<br> Welcome to email sending app!!</h1>");
})

app.post("/send-email", (req, res) => {
    const {name, email, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: process.env.EMAIL_ID,
        subject: `${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
            `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            console.log(error);
            res.status(500).send('Error sending email');
        }
        else {
            console.log('Email sent: ' + info.response);
            console.log(`email: ${email}`)
            res.send({message:'Thank you for contacting me, will get back to you as soon as possible!!!'})
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})