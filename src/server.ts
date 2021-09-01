import { Server } from "jayson";
import {
  GetStringLength,
  CheckINCHIKey,
  CheckINCHI,
  GetStructFromINCHI,
  GetStructFromINCHIEx,
  GetStructFromStdINCHI,
} from "./api";

const server = new Server({
  GetStringLength: (args: Parameters<typeof GetStringLength>, callback: Function) => {
    let output: ReturnType<typeof GetStringLength>;
    try {
      output = GetStringLength(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  CheckINCHIKey: (args: Parameters<typeof CheckINCHIKey>, callback: Function) => {
    let output: ReturnType<typeof CheckINCHIKey>;
    try {
      output = CheckINCHIKey(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  CheckINCHI: (args: Parameters<typeof CheckINCHI>, callback: Function) => {
    let output: ReturnType<typeof CheckINCHI>;
    try {
      output = CheckINCHI(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromINCHI: (args: Parameters<typeof GetStructFromINCHI>, callback: Function) => {
    let output: ReturnType<typeof GetStructFromINCHI>;
    try {
      output = GetStructFromINCHI(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromINCHIEx: (args: Parameters<typeof GetStructFromINCHIEx>, callback: Function) => {
    let output: ReturnType<typeof GetStructFromINCHIEx>;
    try {
      output = GetStructFromINCHIEx(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromStdINCHI: (args: Parameters<typeof GetStructFromStdINCHI>, callback: Function) => {
    let output: ReturnType<typeof GetStructFromStdINCHI>;
    try {
      output = GetStructFromStdINCHI(...args);
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
