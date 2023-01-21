import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("✨ HTTP Server running! 🚀");
  });
