import { z } from 'zod';
import { createRouter } from '../context';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer'; // Importa Nodemailer

// Configura Nodemailer per inviare email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puoi usare altri servizi come SMTP, Mailgun, ecc.
    auth: {
      user: 'your-email@gmail.com', 
      pass: 'your-email-password',  
    },
  });

export const authRouter = createRouter({
  resetPassword: {
    input: z.object({
      email: z.string().email(),
      newPassword: z.string().min(8),
    }),
    async resolve({ input }: { input: { email: string } }) {
      const { email } = input;
      const prisma = new PrismaClient();
      try {
        // Verifica se l'utente esiste nel database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('Utente non trovato');
        }

        // Genera una nuova password casuale
        const newPassword = generateRandomPassword(12); // Password di 12 caratteri

        // Hash della nuova password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Aggiorna la password nel database
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        });

        // Prepara il contenuto dell'email
        const mailOptions = {
            from: 'your-email@gmail.com', // Sostituisci con l'email del mittente
            to: email, // L'email dell'utente richiedente
            subject: 'Password aggiornata',
            text: `La tua password è stata aggiornata con successo.\n\nEmail dell'utente richiedente: ${email}\nNuova password: ${newPassword}`,
          };
  
          // Invia l'email all'utente
          await transporter.sendMail(mailOptions);

        // Restituisce un messaggio di successo con la nuova password (puoi anche inviarla via email)
        return { success: true, message: 'Password reimpostata con successo', newPassword };
      } catch (error) {
        console.error('Errore durante il reset della password:', error);
        throw new Error('Errore durante il reset della password');
      }
    },
  },
});

// Funzione per generare una password casuale
function generateRandomPassword(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }