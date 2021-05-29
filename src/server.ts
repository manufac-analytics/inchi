import { Server } from "jayson";
import { INCHIAPI } from ".";

// Observe how easily FFIs are integrated with the RPC server.
// Appears to be a very compatible match.
const server = new Server(INCHIAPI);

// Start the HTTP server
server.http().listen(3000, undefined, undefined, () => {
  console.log("JSON/RPC server started on port 3000.");
});
