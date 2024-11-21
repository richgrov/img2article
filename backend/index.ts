const server = Bun.serve({
  port: 8888,
  hostname: "0.0.0.0",
  async fetch(req) {
    return new Response("200 Okay!");
  },
});

console.log(`Listening on ${server.url}`);
