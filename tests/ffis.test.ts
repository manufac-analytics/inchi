// @ts-nocheck There are some issues in the Definitely Typed packages of the "ref" related dependencies
import { INCHIAPI, inchi_InputINCHI, inchi_Output } from "../src";
import refNAPI from "ref-napi";

describe("test inchi ffis", () => {
  test("Check if the string represents valid InChIKey", () => {
    /**
     * Check if the string represents valid InChIKey.
     */
    expect(INCHIAPI.CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")).toBe(0); // Valid length and valid format
    expect(INCHIAPI.CheckINCHIKey("OTMSDBZUPAUEDD-UHFFFAOYSA-N")).toBe(0); // Valid length and valid format
  });

  test("Check if the string represents valid InChIKey", () => {
    /**
     * Check if the string represents valid InChI/standard InChI.
     */
    expect(INCHIAPI.CheckINCHI("InChI=1S/C3H5NO/c1-2-5-3-4-1/h3H,1-2H2/p+1", 0)).toBe(0); // Standard InChI
    expect(
      INCHIAPI.CheckINCHI(
        "InChI=1S/C55H73N4O5.Mg/c1-13-39-35(8)42-28-44-37(10)41(24-25-48(60)64-27-26-34(7)23-17-22-33(6)21-16-20-32(5)19-15-18-31(3)4)52(58-44)50-51(55(62)63-12)54(61)49-38(11)45(59-53(49)50)30-47-40(14-2)36(9)43(57-47)29-46(39)56-42;/h13,26,28-33,37,41,51H,1,14-25,27H2,2-12H3,(H-,56,57,58,59,61);/q-1;+2/p-1/b34-26+;/t32-,33-,37+,41+,51-;/m1./s1",
        0
      )
    ).toBe(0); // Standard InChI
  });

  test("Check it returns string length", () => {
    /**
     * Returns string length.
     */
    expect(INCHIAPI.GetStringLength("VNWKTOKETHGBQD-UHFFFAOYSA-N")).toBe(27);
    expect(INCHIAPI.GetStringLength("4444")).toBe(4);
  });

  test("Test MakeINCHIFromMolfileText", () => {
    /**
     * Test MakeINCHIFromMolfileText
     */
    const output = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    expect(INCHIAPI.MakeINCHIFromMolfileText("", "-SNON -ChiralFlagOFF", output.ref())).toBe(0);
    expect(output.szInChI).toBe("");

    const output2 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    const molString = `
Actelion Java MolfileCreator 1.0

  1  0  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
M  END
`;
    // Methane mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
    expect(
      INCHIAPI.MakeINCHIFromMolfileText(
        molString,
        "",
        output2.ref()
      )
    ).toBe(0);
    expect(output2.szInChI).toBe("InChI=1S/CH4/h1H4");

    const output3 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    // Ethanol mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
    expect(
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
        output3.ref()
      )
    ).toBe(0);
    expect(output3.szInChI).toBe("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
  });

  test("Test GetINCHIKeyFromINCHI", () => {
    /**
     * Test GetINCHIKeyFromINCHI
     * refNAPI.allocCString | Returns a new Buffer instance with the given String written to it with the given encoding (defaults to 'utf8').
     * The buffer is 1 byte longer than the string itself, and is NUL terminated.
     */
    const x = refNAPI.allocCString(" ".repeat(27));
    const y = refNAPI.allocCString(" ".repeat(64));
    const z = refNAPI.allocCString(" ".repeat(64));
    const out = INCHIAPI.GetINCHIKeyFromINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", 1, 1, x, y, z);
    expect(out).toBe(0);
    expect(x.toString()).toBe("LFQSCWFLJHTTHZ-UHFFFAOYSA-N\x00");
    expect(x.length).toBe(28);
    expect(y.length).toBe(65);
    expect(z.length).toBe(65);
  });

  test("Test GetStdINCHIKeyFromStdINCHI", () => {
    /**
     * Test GetStdINCHIKeyFromStdINCHI
     */
    const x2 = refNAPI.allocCString(" ".repeat(27));
    const out2 = INCHIAPI.GetStdINCHIKeyFromStdINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", x2);
    expect(out2).toBe(0);
    expect(x2.toString()).toBe("LFQSCWFLJHTTHZ-UHFFFAOYSA-N\x00");
  });

  test("Test GetINCHIfromINCHI", () => {
    /**
     * Test GetINCHIfromINCHI
     */
    const inchiOut = new inchi_Output();
    const inchiIn = new inchi_InputINCHI({ szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", szOptions: "" });
    const out3 = INCHIAPI.GetINCHIfromINCHI(inchiIn.ref(), inchiOut.ref());
    expect(out3).toBe(0);
    expect(inchiIn.szInChI).toBe(inchiOut.szInChI);
  });
});
