import { Library } from "ffi-napi";
import { join } from "path";
import refNAPI from "ref-napi";
import {
  InchiInpData,
  inchi_Input,
  inchi_InputEx,
  inchi_InputINCHI,
  inchi_Output,
  inchi_OutputStruct,
  inchi_OutputStructEx,
} from "./headers";

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
  GetINCHIfromINCHI: [refNAPI.types.int, [refNAPI.refType(inchi_InputINCHI), refNAPI.refType(inchi_Output)]],
  GetStructFromINCHI: [refNAPI.types.int, [refNAPI.refType(inchi_InputINCHI), refNAPI.refType(inchi_OutputStruct)]],
  GetStructFromINCHIEx: [refNAPI.types.int, [refNAPI.refType(inchi_InputINCHI), refNAPI.refType(inchi_OutputStructEx)]],
  GetStructFromStdINCHI: [refNAPI.types.int, [refNAPI.refType(inchi_InputINCHI), refNAPI.refType(inchi_OutputStruct)]],
  FreeStructFromINCHI: [refNAPI.types.void, [refNAPI.refType(inchi_OutputStruct)]],
  FreeStructFromStdINCHI: [refNAPI.types.void, [refNAPI.refType(inchi_OutputStruct)]],
  GetINCHI: [refNAPI.types.int, [refNAPI.refType(inchi_Input), refNAPI.refType(inchi_Output)]],
  GetINCHIEx: [refNAPI.types.int, [refNAPI.refType(inchi_InputEx), refNAPI.refType(inchi_Output)]],
  FreeINCHI: [refNAPI.types.void, [refNAPI.refType(inchi_Output)]],
  Free_inchi_Input: [refNAPI.types.void, [refNAPI.refType(inchi_Input)]],
  Get_inchi_Input_FromAuxInfo: [
    refNAPI.types.int,
    [refNAPI.types.CString, refNAPI.types.int, refNAPI.types.int, refNAPI.refType(InchiInpData)],
  ],
  GetStdINCHI: [refNAPI.types.int, [refNAPI.refType(inchi_Input), refNAPI.refType(inchi_Output)]],
  FreeStdINCHI: [refNAPI.types.void, [refNAPI.refType(inchi_Output)]],
  Free_std_inchi_Input: [refNAPI.types.void, [refNAPI.refType(inchi_Input)]],
  Get_std_inchi_Input_FromAuxInfo: [
    refNAPI.types.int,
    [refNAPI.types.CString, refNAPI.types.int, refNAPI.refType(InchiInpData)],
  ],
});
