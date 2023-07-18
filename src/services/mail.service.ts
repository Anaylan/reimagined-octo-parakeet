import { createTransport } from 'nodemailer';

export class MailService {
	private mailer = createTransport({
		host: process.env.SMTP_HOST,
		port: parseInt(`${process.env.SMTP_PORT}`),
		secure: Boolean(process.env.SMTP_SECURE),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	public async send(to: string, link: string) {
		await this.mailer.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: '',
			text: '',
			html: `
            <div>
                <h1>Для активациия учетной записи, перейдите по ссылке ниже</h1>
                <a href="${link}">${link}</a>
            </div>`,
		});
	}
}
