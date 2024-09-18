import { router, publicProcedure } from "../trpc";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Modifica qui: Configura il trasportatore per usare MailHog
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025, // Porta SMTP predefinita di MailHog
  ignoreTLS: true, // Ignora TLS per MailHog
});

export const resetRouter = router({
  resetPassword: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      const newPassword = generateRandomPassword(12);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      const mailOptions = {
        from: 'test@example.com',
        to: email,
        subject: 'Password Reset',
        text: `Your new password is: ${newPassword}`,
        html: `<strong>Your new password is: ${newPassword}</strong>`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email inviata a MailHog per ${email}`);
        return { success: true, message: 'Password reset successful and email sent to MailHog' };
      } catch (error) {
        console.error('Error sending email to MailHog:', error);
        await prisma.user.update({
          where: { email },
          data: { password: user.password },
        });
        throw new Error('Failed to send password reset email to MailHog. Password not changed.');
      }
    }),
});

function generateRandomPassword(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}