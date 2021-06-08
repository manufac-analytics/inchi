import { INCHIAPI } from "../src";
import { strict } from "assert";

strict.equal(INCHIAPI.GetStringLength("ssss"), 4);
strict.equal(INCHIAPI.GetStringLength("abcdefgh"), 8);
