import { JSONRPCResultLike, Server } from "jayson";
import type { JSONRPCError } from "jayson";
import {
  GetStringLength,
  CheckINCHIKey,
  CheckINCHI,
  GetStructFromINCHI,
  GetStructFromINCHIEx,
  GetStructFromStdINCHI,
} from "./api";

/**
 * Converts JS `Error` object into a JSON RPC 2.0 error object
 */
function convertError(input: Error): JSONRPCError {
  const jsonError: JSONRPCError = { message: input.message, code: input.name === "TypeError" ? -32602 : -32000 };
  return jsonError;
}

/**
 * Converts the input function into a "jayson" server compatible function
 */
function generateServerFunction<T extends (...args: any[]) => any>(
  input: T
): (args: Parameters<T>, callback: (err?: JSONRPCError | null, result?: JSONRPCResultLike) => void) => void {
  return (args: Parameters<T>, callback: (err?: JSONRPCError | null, result?: JSONRPCResultLike) => void) => {
    try {
      const output = input(...args);
      callback(null, output);
    } catch (error) {
      callback(convertError(error), undefined);
    }
  };
}

const server = new Server({
  GetStringLength: generateServerFunction(GetStringLength),
  CheckINCHIKey: generateServerFunction(CheckINCHIKey),
  CheckINCHI: generateServerFunction(CheckINCHI),
  GetStructFromINCHI: generateServerFunction(GetStructFromINCHI),
  GetStructFromINCHIEx: generateServerFunction(GetStructFromINCHIEx),
  GetStructFromStdINCHI: generateServerFunction(GetStructFromStdINCHI),
});

// Start the HTTP server
server.http().listen(3000, () => {
  console.log("JSON/RPC server started on port 3000.");
});
