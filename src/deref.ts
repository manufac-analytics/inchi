import type {
  ATOMELLENTuple,
  INCHIAtom,
  MAXVALTuple,
  NUMHISOTOPESTuple,
  INCHIStereo0D,
  FourNumberTuple,
} from "./headers";
import { inchi_Atom, inchi_Stereo0D } from "./headers";

export function generateINCHIAtom(input: ReturnType<typeof inchi_Atom>): INCHIAtom {
  const output: INCHIAtom = {
    x: input.x,
    y: input.y,
    z: input.z,
    neighbor: input.neighbor.toArray() as MAXVALTuple,
    bondType: input.bond_type.toArray() as MAXVALTuple,
    bondStereo: input.bond_stereo.toArray() as MAXVALTuple,
    elName: input.elname.toArray() as ATOMELLENTuple,
    numBonds: input.num_bonds,
    numIsoH: input.num_iso_H.toArray() as NUMHISOTOPESTuple,
    isotopicMass: input.isotopic_mass,
    radical: input.radical,
    charge: input.charge,
  };
  return output;
}

export function generateINCHIStereo0D(input: ReturnType<typeof inchi_Stereo0D>): INCHIStereo0D {
  const output: INCHIStereo0D = {
    neighbor: input.neighbor.toArray() as FourNumberTuple,
    centralAtom: input.central_atom,
    type: input.type,
    parity: input.parity,
  };
  return output;
}
