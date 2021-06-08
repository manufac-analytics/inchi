import { INCHIAPI } from "../src";
import { strict } from "assert";

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
