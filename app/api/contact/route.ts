import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: Request) {
  try {
    const { nom, mail, message } = await req.json();
    console.log("data : ");

    console.log(nom + mail + message);
    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // exemple : smtp.gmail.com
      port: 587,
      secure: false,
      auth: {
        user: process.env.mail,
        pass: process.env.mdpmail,
      },
    });
    // Options de l'email
    const mailOptions = {
      from: `"${nom}" <${mail}>`,
      to: process.env.mail, // adresse qui reçoit le message
      subject: "Nouveau message de contact",
      text: message,
      html: `<p><strong>Nom:</strong> ${nom}</p>
             <p><strong>Email:</strong> ${mail}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("L'envoie du message a échouer");
    console.log(error);

    return NextResponse.json({ mess: "L'envoie du message a échouer" });
  }
}
