import { Library } from "ffi-napi";
import { join } from "path";
import refNAPI from "ref-napi";
import { inchi_Output } from "./headers";

// Use `readelf -s libinchi.so.1.06.00` to dump the SO content to console
// More functions may be exported soon. PRs welcome.
export const INCHIAPI = Library(join(__dirname, "./libinchi.so.1.06.00"), {
  CheckINCHIKey: [refNAPI.types.int, [refNAPI.types.CString]],
  CheckINCHI: [refNAPI.types.int, [refNAPI.types.CString, refNAPI.types.int]],
  GetStringLength: [refNAPI.types.int, [refNAPI.types.CString]],
  MakeINCHIFromMolfileText: [
    refNAPI.types.int,
    [refNAPI.types.CString, refNAPI.types.CString, refNAPI.refType(inchi_Output)],
  ],
  GetINCHIKeyFromINCHI: [
    refNAPI.types.int,
    [
      refNAPI.types.CString,
      refNAPI.types.int,
      refNAPI.types.int,
      refNAPI.types.CString,
      refNAPI.types.CString,
      refNAPI.types.CString,
    ],
  ],
  GetStdINCHIKeyFromStdINCHI: [refNAPI.types.int, [refNAPI.types.CString, refNAPI.types.CString]],
});

export * from "./headers";
