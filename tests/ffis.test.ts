import { INCHIAPI } from "../src/ffis";
import {
  // InchiInpData,
  inchi_Input,
  inchi_InputEx,
  inchi_InputINCHI,
  inchi_Output,
  inchi_OutputStruct,
  inchi_OutputStructEx,
} from "../src/headers";
import refNAPI from "ref-napi";
import { readFileSync } from "fs";
import { join } from "path";

describe("test inchi ffis", () => {
  test("Check if the string represents valid InChIKey", () => {
    /**
     * Check if the string represents valid InChIKey.
     */
    expect(INCHIAPI.CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")).toBe(0); // Valid length and valid format
    expect(INCHIAPI.CheckINCHIKey("OTMSDBZUPAUEDD-UHFFFAOYSA-N")).toBe(0); // Valid length and valid format
  });

  test("Check if the string represents valid InChI string", () => {
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
    expect(
      INCHIAPI.CheckINCHI(
        "InChI=1S/C22H42O2/c1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22(23)24/h9-10H,2-8,11-21H2,1H3,(H,23,24)/b10-9-",
        0
      )
    ).toBe(0);
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
    // @ts-ignore .ref() is a valid property reference
    expect(INCHIAPI.MakeINCHIFromMolfileText("", "-SNON -ChiralFlagOFF", output.ref())).toBe(0);
    expect(output.szInChI).toBe("");

    const output2 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    const molString2 =
      "\nActelion Java MolfileCreator 1.0\n\n  1  0  0  0  0  0  0  0  0  0999 V2000\n    0.0000   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\nM  END\n";
    // @ts-ignore .ref() is a valid property reference
    const status2 = INCHIAPI.MakeINCHIFromMolfileText(molString2, "", output2.ref());
    // Methane mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
    expect(status2).toBe(0);
    expect(output2.szInChI).toBe("InChI=1S/CH4/h1H4");

    const output3 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    const molString3 =
      "\nActelion Java MolfileCreator 1.0\n\n  3  2  0  0  0  0  0  0  0  0999 V2000\n    1.7321   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.5000   -0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0\n  3  2  1  0  0  0  0\nM  END\n";
    // @ts-ignore .ref() is a valid property reference
    const status3 = INCHIAPI.MakeINCHIFromMolfileText(molString3, "", output3.ref());
    // Methane mol file | Ref: http://www.cheminfo.org/Chemistry/Generate_molfiles/index.html
    expect(status3).toBe(0);
    expect(output3.szInChI).toBe("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");

    const output4 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    const molString4 = readFileSync(join(process.cwd(), "tests/ChEBI_16716.mol")); // Not able to read file in CI, if "./tests/CheBI_16716.mol" is used instead
    // @ts-ignore .ref() is a valid property reference
    const status4 = INCHIAPI.MakeINCHIFromMolfileText(molString4.toString(), "", output4.ref());
    expect(status4).toBe(0);
    expect(output4.szInChI).toBe("InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H");
  });

  test("Test MakeINCHIFromMolfileText using mol file", () => {
    const output4 = new inchi_Output({
      szInChI: "",
      szAuxInfo: "",
      szMessage: "",
      szLog: "",
    });
    const molString4 = readFileSync(join(process.cwd(), "tests/ChEBI_16716.mol")); // Not able to read file in CI, if "./tests/CheBI_16716.mol" is used instead
    // @ts-ignore .ref() is a valid property reference
    const status4 = INCHIAPI.MakeINCHIFromMolfileText(molString4.toString(), "", output4.ref());
    expect(status4).toBe(0);
    expect(output4.szInChI).toBe("InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H");
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
    // @ts-ignore .ref() is a valid property reference
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
    // @ts-ignore .ref() is a valid property reference
    const out2 = INCHIAPI.GetStdINCHIKeyFromStdINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", x2);
    expect(out2).toBe(0);
    expect(x2.toString()).toBe("LFQSCWFLJHTTHZ-UHFFFAOYSA-N\x00");
  });

  test("Test GetINCHIfromINCHI", () => {
    const inchiOut = new inchi_Output();
    const inchiIn = new inchi_InputINCHI({ szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", szOptions: "" });
    // @ts-ignore .ref() is a valid property reference
    const out3 = INCHIAPI.GetINCHIfromINCHI(inchiIn.ref(), inchiOut.ref());
    expect(out3).toBe(0);
    expect(inchiIn.szInChI).toBe(inchiOut.szInChI);
  });

  test("Test GetStructFromINCHI", () => {
    const inchiOutStruct = new inchi_OutputStruct();
    const inchiIn2 = new inchi_InputINCHI({ szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", szOptions: "" });
    // @ts-ignore .ref() is a valid property reference
    const out4 = INCHIAPI.GetStructFromINCHI(inchiIn2.ref(), inchiOutStruct.ref());
    expect(out4).toBe(0);
  });

  test("Test GetStructFromINCHIEx", () => {
    const inchiOutStructEx = new inchi_OutputStructEx();
    const inchiIn3 = new inchi_InputINCHI({ szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", szOptions: "" });
    // @ts-ignore .ref() is a valid property reference
    const out5 = INCHIAPI.GetStructFromINCHIEx(inchiIn3.ref(), inchiOutStructEx.ref());
    expect(out5).toBe(0);
  });

  test("Test GetStructFromStdINCHI", () => {
    const inchiOutStruct2 = new inchi_OutputStruct();
    const inchiIn4 = new inchi_InputINCHI({ szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3", szOptions: "" });
    // @ts-ignore .ref() is a valid property reference
    const out6 = INCHIAPI.GetStructFromStdINCHI(inchiIn4.ref(), inchiOutStruct2.ref());
    expect(out6).toBe(0);
  });

  test("Test FreeStructFromINCHI", () => {
    const inchiOutStruct = new inchi_OutputStruct({ num_atoms: 10, num_stereo0D: 20 });
    expect(inchiOutStruct.num_atoms).toBe(10);
    expect(inchiOutStruct.num_stereo0D).toBe(20);
    // @ts-ignore .ref() is a valid property reference
    INCHIAPI.FreeStructFromINCHI(inchiOutStruct.ref());
    expect(inchiOutStruct.num_atoms).toBe(10);
    expect(inchiOutStruct.num_stereo0D).toBe(20);
  });

  test("Test FreeStructFromStdINCHI", () => {
    const inchiOutStruct = new inchi_OutputStruct({ num_atoms: 10, num_stereo0D: 20 });
    expect(inchiOutStruct.num_atoms).toBe(10);
    expect(inchiOutStruct.num_stereo0D).toBe(20);
    // @ts-ignore .ref() is a valid property reference
    INCHIAPI.FreeStructFromStdINCHI(inchiOutStruct.ref());
    expect(inchiOutStruct.num_atoms).toBe(10);
    expect(inchiOutStruct.num_stereo0D).toBe(20);
  });

  test("Test GetINCHI", () => {
    const inchiInput = new inchi_Input();
    const inchiOutput = new inchi_Output();
    // @ts-ignore .ref() is a valid property reference
    const output = INCHIAPI.GetINCHI(inchiInput.ref(), inchiOutput.ref());
    expect(output).toBe(-1);
  });

  test("Test GetINCHIEx", () => {
    const inchiInputEx = new inchi_InputEx();
    const inchiOutput = new inchi_Output();
    // @ts-ignore .ref() is a valid property reference
    const output = INCHIAPI.GetINCHI(inchiInputEx.ref(), inchiOutput.ref());
    expect(output).toBe(-1);
  });

  // test("Test FreeINCHI", () => {
  //   const inchiOutput = new inchi_Output({
  //     szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3",
  //     szAuxInfo: "gdgdfgdfgdfgdf",
  //     szMessage: "fdfgdfgdfhfd",
  //     szLog: "hfghgfhgfhgfhf",
  //   });
  //   expect(inchiOutput.szInChI).toBe("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
  //   // @ts-ignore .ref() is a valid property reference
  //   INCHIAPI.FreeINCHI(inchiOutput.ref());
  //   expect(inchiOutput.szInChI).toBe("");
  // });

  // test("Test Free_inchi_Input", () => {
  //   const inchiInput = new inchi_Input({
  //     // @ts-ignore unexpected error
  //     atom: [],
  //     stereo0D: [],
  //     num_atoms: 3,
  //     szOptions: "",
  //     num_stereo0D: 0,
  //   });
  //   expect(inchiInput.num_atoms).toBe(3);
  //   // @ts-ignore .ref() is a valid property reference
  //   INCHIAPI.Free_inchi_Input(inchiInput.ref());
  //   expect(inchiInput.num_atoms).toBe(0);
  // });

  //   // didn't get example to test this method
  //   test("Test Get_inchi_Input_FromAuxInfo", () => {
  //     const szInchiAuxInfo = "";
  //     const bDoNotAddH = 0;
  //     const bDiffUnkUndfStereo = 0;
  //     const pInchiInp = new InchiInpData({
  //       pInp: new inchi_Input({
  //         atom: [],
  //         stereo0D: [],
  //         num_atoms: 3,
  //         szOptions: "",
  //         num_stereo0D: 0,
  //       }).ref(),
  //       bChiral: 0,
  //       szErrMsg: "",
  //     });
  //     const output = INCHIAPI.Get_inchi_Input_FromAuxInfo(
  //       szInchiAuxInfo,
  //       bDoNotAddH,
  //       bDiffUnkUndfStereo,
  //       pInchiInp.ref()
  //     );
  //     expect(output).toBe(0);
  //   });

  //   test("Test GetStdINCHI", () => {
  //     const inchiInput = new inchi_Input({
  //       atom: [],
  //       stereo0D: [],
  //       num_atoms: 3,
  //       szOptions: "",
  //       num_stereo0D: 0,
  //     });
  //     const inchiOutput = new inchi_Output({
  //       szInChI: "",
  //       szAuxInfo: "",
  //       szMessage: "",
  //       szLog: "",
  //     });
  //     const output = INCHIAPI.GetStdINCHI(inchiInput.ref(), inchiOutput.ref());
  //     expect(output).toBe(0);
  //   });

  //   test("Test FreeStdINCHI", () => {
  //     const inchiOutput = new inchi_Output({
  //       szInChI: "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3",
  //       szAuxInfo: "",
  //       szMessage: "",
  //       szLog: "",
  //     });
  //     expect(inchiOutput.szInChI).toBe("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
  //     INCHIAPI.FreeStdINCHI(inchiOutput.ref());
  //     expect(inchiOutput.szInChI).toBe("");
  //   });

  //   test("Test Free_std_inchi_Input", () => {
  //     const inchiInput = new inchi_Input({
  //       atom: [],
  //       stereo0D: [],
  //       num_atoms: 3,
  //       szOptions: "",
  //       num_stereo0D: 0,
  //     });
  //     expect(inchiInput.num_atoms).toBe(3);
  //     INCHIAPI.Free_std_inchi_Input(inchiInput.ref());
  //     expect(inchiInput.num_atoms).toBe(0);
  //   });

  //   // didn't get example to test this method
  //   test("Test Get_std_inchi_Input_FromAuxInfo", () => {
  //     const szInchiAuxInfo = "";
  //     const bDoNotAddH = 0;
  //     const pInchiInp = new InchiInpData({
  //       pInp: new inchi_Input({
  //         atom: [],
  //         stereo0D: [],
  //         num_atoms: 3,
  //         szOptions: "",
  //         num_stereo0D: 0,
  //       }).ref(),
  //       bChiral: 0,
  //       szErrMsg: "",
  //     });
  //     const output = INCHIAPI.Get_std_inchi_Input_FromAuxInfo(szInchiAuxInfo, bDoNotAddH, pInchiInp.ref());
  //     expect(output).toBe(0);
  //   });
});
