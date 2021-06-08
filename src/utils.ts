import { readFile } from "fs/promises";
import { join } from "path";

// TODO: Read as NULL terminated string
async function readMolFile(path: string): Promise<string | void> {
  let molFileData: string | undefined;
  try {
    molFileData = await readFile(path, "ascii");
    console.log(molFileData);
  } catch (e) {
    console.error(e);
  }
  return molFileData;
}

readMolFile(join(__dirname, "../../../mol-files/CH4S.mol"));
