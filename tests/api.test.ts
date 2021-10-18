import {
  CheckINCHI,
  CheckINCHIKey,
  GetStringLength,
  GetStructFromINCHI,
  GetStructFromINCHIEx,
  GetStructFromStdINCHI,
} from "../src";

describe("test api wrapped ffis functions", () => {
  test("Check if CheckINCHIKey method is working properly", () => {
    expect(CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")).toBe(0);
  });

  test("Check if CheckINCHI method is working properly", () => {
    expect(CheckINCHI("InChI=1S/C3H5NO/c1-2-5-3-4-1/h3H,1-2H2/p+1", false)).toBe(0);
  });

  test("Check if GetStringLength method is working properly", () => {
    expect(GetStringLength("VNWKTOKETHGBQD-UHFFFAOYSA-N")).toBe(27);
  });

  test("Check if GetStructFromINCHI method is working properly", () => {
    const {
      status,
      data: { atom, szMessage, szLog },
    } = GetStructFromINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
    expect(status).toBe(0);
    expect(atom.length).toBe(2);
    expect(szMessage).toBe(null);
    expect(szLog).toBe(null);
  });

  test("Check if GetStructFromINCHIEx method is working properly", () => {
    const {
      status,
      data: { atom, szMessage, szLog },
    } = GetStructFromINCHIEx("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
    expect(status).toBe(0);
    expect(atom.length).toBe(2);
    expect(szMessage).toBe(null);
    expect(szLog).toBe(null);
  });

  test("Check if GetStructFromStdINCHI method is working properly", () => {
    const {
      status,
      data: { atom, szMessage, szLog },
    } = GetStructFromStdINCHI("InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3");
    expect(status).toBe(0);
    expect(atom.length).toBe(2);
    expect(szMessage).toBe(null);
    expect(szLog).toBe(null);
  });
});
