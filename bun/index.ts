const server = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname == "/data/image") {
      console.log(req.body?.arguments);
      return new Response(JSON.stringify({ message: "somethingdslkfjdkfj" }));
    }
    return new Response("uh oh");
  },
});

console.log(`Listening on ${server.url}`);
