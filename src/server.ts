import { Server } from "jayson";
import { INCHIAPI } from "./ffis";

const server = new Server({
  GetStringLength: (args: [string], callback: Function) => {
    let output = NaN;
    try {
      output = INCHIAPI.GetStringLength(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
});

// Start the HTTP server
server.http().listen(3000, () => {
  console.log("JSON/RPC server started on port 3000.");
});
