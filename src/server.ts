import { Server } from "jayson";
import { INCHIAPI } from ".";

// TODO: Improve mapping
const server = new Server(INCHIAPI);

// Start the HTTP server
server.http().listen(3000, () => {
  console.log("JSON/RPC server started on port 3000.");
});
