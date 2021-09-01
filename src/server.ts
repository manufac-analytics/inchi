import { Server } from "jayson";
import {
  GetStringLength,
  GetStructFromINCHI,
  GetStructFromINCHIOutput,
  GetINCHIOptions,
  GetStructFromINCHIEx,
  GetStructFromINCHIExOutput,
  GetStructFromStdINCHI,
  CheckINCHIKey,
  CheckINCHIKeyReturnCode,
  CheckINCHI,
  CheckINCHIReturnCode,
} from "./api";

const server = new Server({
  GetStringLength: (args: [string], callback: Function) => {
    let output = NaN;
    try {
      output = GetStringLength(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  CheckINCHIKey: (args: [string], callback: Function) => {
    let output: CheckINCHIKeyReturnCode;
    try {
      output = CheckINCHIKey(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  CheckINCHI: (args: [string, boolean?], callback: Function) => {
    let output: CheckINCHIReturnCode;
    try {
      output = CheckINCHI(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromINCHI: (args: [string, GetINCHIOptions?], callback: Function) => {
    let output: GetStructFromINCHIOutput;
    try {
      output = GetStructFromINCHI(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromINCHIEx: (args: [string, GetINCHIOptions?], callback: Function) => {
    let output: GetStructFromINCHIExOutput;
    try {
      output = GetStructFromINCHIEx(...args);
      callback(null, output);
    } catch ({ message, name }) {
      callback({ message, code: name === "TypeError" ? -32602 : 404 });
    }
  },
  GetStructFromStdINCHI: (args: [string, GetINCHIOptions?], callback: Function) => {
    let output: GetStructFromINCHIOutput;
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
