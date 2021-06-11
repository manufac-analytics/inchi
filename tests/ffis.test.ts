// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies
import { INCHIAPI, inchi_Output } from "../src";
import { strict } from "assert";
import refNAPI from "ref-napi";

/**
 * Check if the string represents valid InChIKey.
 */
strict.equal(INCHIAPI.CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N"), 0); // Valid length and valid format
strict.equal(INCHIAPI.CheckINCHIKey("OTMSDBZUPAUEDD-UHFFFAOYSA-N"), 0); // Valid length and valid format

/**
 * Check if the string represents valid InChI/standard InChI.
 */
strict.equal(INCHIAPI.CheckINCHI("InChI=1S/C3H5NO/c1-2-5-3-4-1/h3H,1-2H2/p+1", 0), 0); // Standard InChI
strict.equal(
  INCHIAPI.CheckINCHI(
    "InChI=1S/C55H73N4O5.Mg/c1-13-39-35(8)42-28-44-37(10)41(24-25-48(60)64-27-26-34(7)23-17-22-33(6)21-16-20-32(5)19-15-18-31(3)4)52(58-44)50-51(55(62)63-12)54(61)49-38(11)45(59-53(49)50)30-47-40(14-2)36(9)43(57-47)29-46(39)56-42;/h13,26,28-33,37,41,51H,1,14-25,27H2,2-12H3,(H-,56,57,58,59,61);/q-1;+2/p-1/b34-26+;/t32-,33-,37+,41+,51-;/m1./s1",
    0
  ),
  0
); // Standard InChI

/**
 * Returns string length.
 */
strict.equal(INCHIAPI.GetStringLength("VNWKTOKETHGBQD-UHFFFAOYSA-N"), 27);
strict.equal(INCHIAPI.GetStringLength("4444"), 4);

/**
 * Test MakeINCHIFromMolfileText
 */
const output = refNAPI.alloc(inchi_Output, {
  szInChI: "",
  szAuxInfo: "",
  szMessage: "",
  szLog: "",
});
strict.equal(INCHIAPI.MakeINCHIFromMolfileText("", "-SNON -ChiralFlagOFF", output), 0);
strict.equal(output.deref().szInChI, "");

const output2 = refNAPI.alloc(inchi_Output, {
  szInChI: "",
  szAuxInfo: "",
  szMessage: "",
  szLog: "",
});
// Methane mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
strict.equal(
  INCHIAPI.MakeINCHIFromMolfileText(
    `
Actelion Java MolfileCreator 1.0

  1  0  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
M  END
`,
    "",
    output2
  ),
  0
);
strict.equal(output2.deref().szInChI, "InChI=1S/CH4/h1H4");

const output3 = refNAPI.alloc(inchi_Output, {
  szInChI: "",
  szAuxInfo: "",
  szMessage: "",
  szLog: "",
});
// Ethanol mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
strict.equal(
  INCHIAPI.MakeINCHIFromMolfileText(
    `
Actelion Java MolfileCreator 1.0

  3  2  0  0  0  0  0  0  0  0999 V2000
    1.7321   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.8660   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.5000   -0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  2  1  1  0  0  0  0
  3  2  1  0  0  0  0
M  END
`,
    "",
    output3
  ),
  0
);
strict.equal(output3.deref().szInChI, "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");

/**
 * Test GetINCHIKeyFromINCHI
 * refNAPI.allocCString | Returns a new Buffer instance with the given String written to it with the given encoding (defaults to 'utf8').
 * The buffer is 1 byte longer than the string itself, and is NUL terminated.
 */
const x = refNAPI.allocCString(" ".repeat(27));
const y = refNAPI.allocCString(" ".repeat(64));
const z = refNAPI.allocCString(" ".repeat(64));
const out = INCHIAPI.GetINCHIKeyFromINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", 1, 1, x, y, z);
strict.equal(out, 0);
strict.equal(x.toString(), "LFQSCWFLJHTTHZ-UHFFFAOYSA-N\x00");
strict.equal(x.length, 28);
strict.equal(y.length, 65);
strict.equal(z.length, 65);

/**
 * Test GetStdINCHIKeyFromStdINCHI
 */
const x2 = refNAPI.allocCString(" ".repeat(27));
const out2 = INCHIAPI.GetStdINCHIKeyFromStdINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", x2);
strict.equal(out2, 0);
strict.equal(x2.toString(), "LFQSCWFLJHTTHZ-UHFFFAOYSA-N\x00");