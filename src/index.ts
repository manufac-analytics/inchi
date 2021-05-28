import { Library } from "ffi-napi";

// Use `readelf -s libinchi.so.1.06.00` to dump the SO content to console
// More functions may be exported soon. PRs welcome.
export const INCHIAPI = Library("./libinchi.so.1.06.00", {
  CheckINCHIKey: ["int", ["string"]],
  CheckINCHI: ["int", ["string", "int"]],
  GetStringLength: ["int", ["string"]],
});
