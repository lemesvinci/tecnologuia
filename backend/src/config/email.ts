import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendResetPasswordEmail = async (to: string, token: string) => {
    const resetLink = `https://tecnologuia.onrender.com/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Redefinição de Senha',
        html: `
            <h1>Redefinição de Senha</h1>
            <p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetLink}">Redefinir Senha</a>
            <p>Se você não solicitou essa redefinição, ignore este email.</p>
            <p>Atenciosamente,</p>
            <p>Equipe Tecnologuia</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
}