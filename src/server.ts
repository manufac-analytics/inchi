import { JSONRPCError, Server } from "jayson";
import type { JSONRPCCallbackType } from "jayson";
import {
  GetStringLength,
  CheckINCHIKey,
  CheckINCHI,
  GetStructFromINCHI,
  GetStructFromINCHIEx,
  GetStructFromStdINCHI,
} from "./api";

function convertError(input: Error): JSONRPCError {
  const jsonError: JSONRPCError = { message: input.message, code: input.name === "TypeError" ? -32602 : 404 };
  return jsonError;
}

const server = new Server({
  GetStringLength: (args: Parameters<typeof GetStringLength>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof GetStringLength>;
    try {
      output = GetStringLength(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
  CheckINCHIKey: (args: Parameters<typeof CheckINCHIKey>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof CheckINCHIKey>;
    try {
      output = CheckINCHIKey(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
  CheckINCHI: (args: Parameters<typeof CheckINCHI>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof CheckINCHI>;
    try {
      output = CheckINCHI(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
  GetStructFromINCHI: (args: Parameters<typeof GetStructFromINCHI>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof GetStructFromINCHI>;
    try {
      output = GetStructFromINCHI(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
  GetStructFromINCHIEx: (args: Parameters<typeof GetStructFromINCHIEx>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof GetStructFromINCHIEx>;
    try {
      output = GetStructFromINCHIEx(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
  GetStructFromStdINCHI: (args: Parameters<typeof GetStructFromStdINCHI>, callback: JSONRPCCallbackType) => {
    let output: ReturnType<typeof GetStructFromStdINCHI>;
    try {
      output = GetStructFromStdINCHI(...args);
      callback(null, undefined, output);
    } catch (error) {
      callback(error, convertError(error), undefined);
    }
  },
});

// Start the HTTP server
server.http().listen(3000, () => {
  console.log("JSON/RPC server started on port 3000.");
});
