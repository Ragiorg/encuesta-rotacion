import { Employee, Organization } from '@/.generated/client';
import { REMINDER_HTML_TEMPLATE } from '@/constants/email_template';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailer = new MailerSend({ apiKey: process.env.MAILERSEND_TOKEN || '' });

export const sendReminderEmail = async (employee: Employee, baseUrl: string, organization: Organization) => {

    const sentFrom = new Sender("no-reply@"+process.env.MAILERSEND_TEST_DOMAIN, "Encuestas de Rotación: "+(organization?.name || "Su Organización"));
    const recipients = [new Recipient(employee.email || '', employee.firstName + ' ' + employee.lastName)];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject('Recordatorio: Por favor completa tu encuesta de rotación')
        .setHtml(REMINDER_HTML_TEMPLATE(employee, baseUrl));

    try {
        await mailer.email.send(emailParams);
        return true; // Email sent successfully
    } catch (error) {
        console.error('Error sending reminder email:', error);
        return false;
    }
};