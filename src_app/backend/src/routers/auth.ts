import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { publicProcedure, router } from "../trpc";
import prisma from "../services/prisma";

const userSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().min(8).max(255),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userRouter = router({
  create: publicProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      const { username, email, password } = input;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      
      return { id: user.id, username: user.username, email: user.email };
    }),
  
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      const { username, password } = input;
      
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new Error("Invalid username or password");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid username or password");
      }
      
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      
      return { token, user: { id: user.id, username: user.username, email: user.email } };
    }),
});

// potresti generarmi tu una chiave sicura? comunque non so dove inserire la JWT nel progetto, non so come si usa. 
