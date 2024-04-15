import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { Application } from "https://deno.land/x/oak@14.2.0/mod.ts";

const app = new Application();

const read = async (...filepath: string[]) => {
  const file = await Deno.readFile(path.join(Deno.cwd(), ...filepath));
  return new TextDecoder().decode(file);
};

app.use(async (ctx) => {
  const { pathname } = new URL(ctx.request.url);

  console.log(pathname);

  if (pathname === "/clientA.js") {
    ctx.response.headers.set("Content-Type", "text/javascript");
    ctx.response.body = await read("clientA.js");
    return;
  }

  if (pathname === "/clientB.js") {
    ctx.response.headers.set("Content-Type", "text/javascript");
    ctx.response.body = await read("clientB.js");
    return;
  }

  ctx.response.body = await read("index.html");
});

app.listen({ port: 8000 });
