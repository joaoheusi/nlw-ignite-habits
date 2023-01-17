import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

app.get("/habits", async () => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app.register(cors);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http server running!");
  });
