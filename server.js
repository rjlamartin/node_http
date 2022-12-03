console.log("Hello World!\n==========\n");
// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

http
  .createServer((request, response) => {
    const { url, method } = request;
    const chunks = [];

    request
      .on("error", (error) => {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(error));
        response.end();
      })
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.concat(chunks).toString();
        const responseBody = {
          url,
          method,
          body,
        };

        response.on("error", (error) => {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.write(JSON.stringify(error));
          response.end();
        });

        switch (url) {
          case "/":
          case "/home":
            //do something
            response.setHeader("Content-Type", "text/html");
            response.write("Home");
            break;
          case "/about":
            //send about json info
            const details = {
              name: "Reece",
              city: "Detroit",
            };

            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(details));
            break;
          case "/echo":
            //echo back to client
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(responseBody));
            break;
          default:
            //404 not found message
            response.setHeader("Content-Type", "text/html");
            response.write(
              "404 Not Found. Try <a href=http://localhost:3000> this</a>"
            );
        }

        return response.end();
      });
  })
  .listen(3000, () => console.log("Server is listening on port 3000..."));
