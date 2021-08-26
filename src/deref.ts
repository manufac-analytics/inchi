import type { ATOMELLENTuple, INCHIAtom, MAXVALTuple, NUMHISOTOPESTuple } from "./headers";
import { inchi_Atom } from "./headers";

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
		charge: input.charge
	};
	return output;
}