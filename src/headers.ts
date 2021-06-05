import Enum from "enum";
import refNAPI from "ref-napi";
import StructType from "ref-struct-di";
import ArrayType from "ref-array-di";

const NAPIStructType = StructType(refNAPI);
const NAPIArrayType = ArrayType(refNAPI);

// radical definitions
// typedef enum tagINCHIRadical {
//     INCHI_RADICAL_NONE = 0,
//     INCHI_RADICAL_SINGLET = 1,
//     INCHI_RADICAL_DOUBLET = 2,
//     INCHI_RADICAL_TRIPLET = 3
// } inchi_Radical;

export const inchi_Radical = new Enum({
  INCHI_RADICAL_NONE: 0,
  INCHI_RADICAL_SINGLET: 1,
  INCHI_RADICAL_DOUBLET: 2,
  INCHI_RADICAL_TRIPLET: 3,
});

// bond type definitions
// typedef enum tagINCHIBondType {
//     INCHI_BOND_TYPE_NONE = 0,
//     INCHI_BOND_TYPE_SINGLE = 1,
//     INCHI_BOND_TYPE_DOUBLE = 2,
//     INCHI_BOND_TYPE_TRIPLE = 3,
//     INCHI_BOND_TYPE_ALTERN = 4  /* avoid by all means */
// } inchi_BondType;

export const inchi_BondType = new Enum({
  INCHI_BOND_TYPE_NONE: 0,
  INCHI_BOND_TYPE_SINGLE: 1,
  INCHI_BOND_TYPE_DOUBLE: 2,
  INCHI_BOND_TYPE_TRIPLE: 3,
  INCHI_BOND_TYPE_ALTERN: 4 /* avoid by all means */,
});

// typedef enum tagINCHIBondStereo2D {
//     /* stereocenter-related; positive: the sharp end points to this atom  */
//      INCHI_BOND_STEREO_NONE = 0,
//      INCHI_BOND_STEREO_SINGLE_1UP = 1,
//      INCHI_BOND_STEREO_SINGLE_1EITHER = 4,
//      INCHI_BOND_STEREO_SINGLE_1DOWN = 6,
//      /* stereocenter-related; negative: the sharp end points to the opposite atom  */
//      INCHI_BOND_STEREO_SINGLE_2UP = -1,
//      INCHI_BOND_STEREO_SINGLE_2EITHER = -4,
//      INCHI_BOND_STEREO_SINGLE_2DOWN = -6,
//      /* stereobond-related */
//      INCHI_BOND_STEREO_DOUBLE_EITHER = 3 /* unknown stereobond geometry */
//  } inchi_BondStereo2D;

export const inchi_BondStereo2D = new Enum({
  /* stereocenter-related; positive: the sharp end points to this atom  */
  INCHI_BOND_STEREO_NONE: 0,
  INCHI_BOND_STEREO_SINGLE_1UP: 1,
  INCHI_BOND_STEREO_SINGLE_1EITHER: 4,
  INCHI_BOND_STEREO_SINGLE_1DOWN: 6,
  /* stereocenter-related; negative: the sharp end points to the opposite atom  */
  INCHI_BOND_STEREO_SINGLE_2UP: -1,
  INCHI_BOND_STEREO_SINGLE_2EITHER: -4,
  INCHI_BOND_STEREO_SINGLE_2DOWN: -6,
  /* stereobond-related */
  INCHI_BOND_STEREO_DOUBLE_EITHER: 3 /* unknown stereobond geometry */,
});

/*************************************************************************
 * Notes on using INCHI_BOND_STEREO_SINGLE_*  from inchi_BondStereo2D    *
 *                                                                       *
 * These stereo markings are used by InChI to characterize a stereogenic *
 * atom if and only if all neighbors of this atom have same z-coordinate *
 * as this atom (that is, in case of 2D fragment).                       *
 * The only exception is INCHI_BOND_STEREO_SINGLE_?EITHER marking which  *
 * always assigns to the atom an "unknown" parity (u).                   *
 *                                                                       *
 * Note the behavior which is default for InChI software v.1.04/03/02std *
 * (at -NEWPSOFF option is not supplied) 2D stereo interpretation:       *
 * only bonds that have sharp end pointing to the stereogenic atom are   *
 * considered as being out of plane and only sharp ends of               *
 * INCHI_BOND_STEREO_SINGLE_?EITHER bonds are considered to determine    *
 * whether the stereochemistry is unknown.                               *
 *************************************************************************/

// sizes definitions
// #define MAXVAL                   20 /* max number of bonds per atom                 */
// #define ATOM_EL_LEN               6 /* length of ASCIIZ element symbol field        */
// #define NUM_H_ISOTOPES            3 /* number of hydrogen isotopes: protium, D, T   */
// #define ISOTOPIC_SHIFT_FLAG   10000 /* add to isotopic mass if isotopic_mass =      */
//                                     /* (isotopic mass - average atomic mass)        */
// #define ISOTOPIC_SHIFT_MAX      100 /* max abs(isotopic mass - average atomic mass) */

export const MAXVAL = 20; // max number of bonds per atom
export const ATOM_EL_LEN = 6; // length of ASCIIZ element symbol field
export const NUM_H_ISOTOPES = 3; // number of hydrogen isotopes: protium, D, T
export const ISOTOPIC_SHIFT_FLAG = 10000; // add to isotopic mass if isotopic_mass = (isotopic mass - average atomic mass)                             /* (isotopic mass - average atomic mass)        */
export const ISOTOPIC_SHIFT_MAX = 100; // max abs(isotopic mass - average atomic mass)

/*************************************************
 *
 *
 *  A T O M S   a n d   C O N N E C T I V I T Y
 *
 *
 *************************************************/

//  typedef struct tagInchiAtom {
//     /* atom coordinates */
//     double x;
//     double y;
//     double z;
//     /* connectivity */
//     AT_NUM  neighbor[MAXVAL];     /* adjacency list: ordering numbers of */
//                                   /*            the adjacent atoms, >= 0 */
//     S_CHAR  bond_type[MAXVAL];    /* inchi_BondType */
//     /* 2D stereo */
//     S_CHAR  bond_stereo[MAXVAL];  /* inchi_BondStereo2D; negative if the */
//                                   /* sharp end points to opposite atom */
//     /* other atom properties */
//     char    elname[ATOM_EL_LEN];  /* zero-terminated chemical element name:*/
//                                   /* "H", "Si", etc. */
//     AT_NUM  num_bonds;            /* number of neighbors, bond types and bond*/
//                                   /* stereo in the adjacency list */
//     S_CHAR  num_iso_H[NUM_H_ISOTOPES + 1]; /* implicit hydrogen atoms */
//                                   /* [0]: number of implicit non-isotopic H
//                                        (exception: num_iso_H[0]=-1 means INCHI
//                                        adds implicit H automatically),
//                                      [1]: number of implicit isotopic 1H (protium),
//                                      [2]: number of implicit 2H (deuterium),
//                                      [3]: number of implicit 3H (tritium) */
//     AT_NUM  isotopic_mass;        /* 0 => non-isotopic; isotopic mass or  */
//                                   /* ISOTOPIC_SHIFT_FLAG + mass - (average atomic mass) */
//     S_CHAR  radical;              /* inchi_Radical */
//     S_CHAR  charge;               /* positive or negative; 0 => no charge */
// }inchi_Atom;

export const inchi_Atom = NAPIStructType({
  x: refNAPI.types.double,
  y: refNAPI.types.double,
  z: refNAPI.types.double,
  neighbor: NAPIArrayType(refNAPI.types.short, MAXVAL),
  bond_type: NAPIArrayType(refNAPI.types.char, MAXVAL),
  bond_stereo: NAPIArrayType(refNAPI.types.char, MAXVAL),
  elname: NAPIArrayType(refNAPI.types.char, ATOM_EL_LEN),
  num_bonds: refNAPI.types.short,
  num_iso_H: NAPIArrayType(refNAPI.types.char, NUM_H_ISOTOPES + 1),
  isotopic_mass: refNAPI.types.short,
  radical: refNAPI.types.char,
  charge: refNAPI.types.char,
});

/*****************************************************************************
 * Notes: 1. Atom ordering numbers (i, k, and atom[i].neighbor[j] below)
 *           start from zero; max. ordering number is (num_atoms-1).
 *        2. inchi_Atom atom[i] is connected to the atom[atom[i].neighbor[j]]
 *           by a bond that has type atom[i].bond_type[j] and 2D stereo type
 *           atom[i].bond_stereo[j] (in case of no stereo
 *           atom[i].bond_stereo[j] = INCHI_BOND_STEREO_NONE)
 *           Index j is in the range 0 <= j <= (atom[i].num_bonds-1)
 *        3. Any connection (represented by atom[i].neighbor[j],
 *           atom[i].bond_type[j], and atom[i].bond_stereo[j])
 *           should be present in one or both adjacency list:
 *             if k = atom[i].neighbor[j] then i may or may not be present in
 *           atom[k].neighbor[] list. For example, the adjacency lists may be
 *           populated with only such neighbors that atom[i].neighbor[j] < i
 *           All elements of an adjacency list must be different, that is,
 *           a bond must be specified in an adjacency list only once.
 *        4. in Molfiles usually
 *           (number of implicit H) = Valence - SUM(bond_type[])
 *        5. Seemingly illogical order of the inchi_Atom members was
 *           chosen in an attempt to avoid alignment problems when
 *           accessing inchi_Atom from unrelated to C programming
 *           languages such as Visual Basic.
 ******************************************************************************/

/*******************************************************************
    0D Stereo Parity and Type definitions
 *******************************************************************
            Note:
            =====
            o Below #A is the ordering number of atom A, starting from 0
            o See parity values corresponding to 'o', 'e', and 'u' in
              inchi_StereoParity0D definition below)

           =============================================
            stereogenic bond >A=B< or cumulene >A=C=C=B<
           =============================================

                                 neighbor[4]  : {#X,#A,#B,#Y} in this order
     X                           central_atom : NO_ATOM
      \            X      Y      type         : INCHI_StereoType_DoubleBond
       A==B         \    /
           \         A==B
            Y

    parity= 'e'    parity= 'o'   unknown parity = 'u'

    Limitations:
    ============
    o Atoms A and B in cumulenes MUST be connected by a chain of double bonds;
      atoms A and B in a stereogenic 'double bond' may be connected by a double,
      single, or alternating bond.
    o One atom may belong to up to 3 stereogenic bonds (i.g. in a fused
      aromatic structure).
    o Multiple stereogenic bonds incident to any given atom should
      either all except possibly one have (possibly different) defined
      parities ('o' or 'e') or should all have an unknown parity 'u'.

      Note on parities of alternating stereobonds
      ===========================================
                                                     D--E
      In large rings  (see Fig. 1, all              //   \\
      atoms are C) all alternating bonds         B--C      F--G
      are treated as stereogenic.              //              \\
      To avoid "undefined" bond parities      A                  H
      for bonds BC, DE, FG, HI, JK, LM, AN     \               /
      it is recommended to mark them with       N==M       J==I
      parities.                                     \     /
                                                      L==K    Fig. 1
      Such a marking will make
      the stereochemical layer unambiguous
      and it will be different from the          B--C      F--G
      stereochemical layer of the second       //   \\   //    \\
      structure (Fig. 2).                     A      D--E        H
                                               \               /
                                                N==M       J==I
      By default, double and alternating            \     /
      bonds in 8-member and greater rings             L==K    Fig. 2
      are treated by InChI as stereogenic.


           =============================================
            tetrahedral atom
           =============================================

   4 neighbors

            X                    neighbor[4] : {#W, #X, #Y, #Z}
            |                    central_atom: #A
         W--A--Y                 type        : INCHI_StereoType_Tetrahedral
            |
            Z
   parity: if (X,Y,Z) are clockwize when seen from W then parity is 'e' otherwise 'o'
   Example (see AXYZW above): if W is above the plane XYZ then parity = 'e'

   3 neighbors

              Y          Y       neighbor[4] : {#A, #X, #Y, #Z}
             /          /        central_atom: #A
         X--A  (e.g. O=S   )     type        : INCHI_StereoType_Tetrahedral
             \          \
              Z          Z

   parity: if (X,Y,Z) are clockwize when seen from A then parity is 'e',
                                                          otherwise 'o'
   unknown parity = 'u'
   Example (see AXYZ above): if A is above the plane XYZ then parity = 'e'
   This approach may be used also in case of an implicit H attached to A.

           =============================================
            allene
           =============================================

       X       Y                 neighbor[4]  : {#X,#A,#B,#Y}
        \     /                  central_atom : #C
         A=C=B                   type         : INCHI_StereoType_Allene

                                      Y      X
                                      |      |
     when seen from A along A=C=B:  X-A    Y-A

                          parity:   'e'    'o'

   parity: if A, B, Y are clockwise when seen from X then parity is 'e',
                                                          otherwise 'o'
   unknown parity = 'u'
   Example (see XACBY above): if X on the diagram is above the plane ABY
                                                      then parity is 'o'

   Limitations
   ===========
   o Atoms A and B in allenes MUST be connected by a chain of double bonds;


   How InChI uses 0D parities
   ==========================

   1. 0D parities are used if all atom coordinates are zeroes.

   In addition to that:

   2. 0D parities are used for Stereobonds, Allenes, or Cumulenes if:

   2a. A bond to the end-atom is shorter than MIN_BOND_LEN=0.000001
   2b. A ratio of two bond lengths to the end-atom is smaller than MIN_SINE=0.03
   2c. In case of a linear fragment X-A=B end-atom A is treated as satisfying 2a-b

       0D parities are used if 2a or 2b or 2c applies to one or both end-atoms.

   3. 0D parities are used for Tetrahedral Atoms if at least one of 3a-c is true:

   3a. One of bonds to the central atom is shorter than MIN_BOND_LEN=0.000001
   3b. A ratio of two bond lengths to the central atom is smaller than MIN_SINE=0.03
   3c. The four neighbors are almost in one plane or the central atom and
       its only 3 explicit neighbors are almost in one plane

   Notes on 0D parities and 'undefined' stereogenic elements
   =========================================================

   If 0D parity is to be used according to 1-3 but    CH3     CH3
   has not been provided then the corresponding         \    /
   stereogenic element is considered 'undefined'.        C=CH
                                                        /
   For example, if in the structure (Fig. 3)           H
   the explicit H has been moved so that it                Fig. 3
   has same coordinates as atom >C= (that is,
   the length of the bond H-C became zero)
   then the double bond is assigned 'undefined'       CH3      CH3
   parity which by default is omitted from the          \     /
   Identifier.                                           CH=CH

   However, the structure on Fig. 4 will have double        Fig. 4
   bond parity 'o' and its parity in the Identifier is (-).

   Notes on 0D parities in structures containing metals
   ====================================================
   Since InChI disconnects bonds to metals the 0D parities upon the
   disconnection may change in several different ways:

   1) previously non-stereogenic bond may become stereogenic:

         \     /                            \     /
          CH==CH          disconnection      CH==CH
           \ /               ======>
            M                                  M

     before the disconnection:    after the disconnection:
     atoms C have valence=5 and   the double bond may become
     the double bond is not       stereogenic
     recognized as stereogenic

   2) previously stereogenic bond may become non-stereogenic:

       M                           M(+)
        \    /                             /
         N==C      disconnection    (-)N==C
             \        ======>              \

   3) Oddball structures, usually resulting from projecting 3D
      structures on the plane, may contain fragment like that
      depicted on Fig. 5:

              M   A                      M   A
              |\ /   B                      /   B
              | X   /     disconnection    /   /
              |/ \ /         ======>      /   /
              C===C                      C===C
             Fig. 5
     (X stands for bond intersection)

     A-C=C-B parity is              A-C=C-B parity is
     trans (e)                      cis (o) or undefined
     because the bond               because C valence = 3,
     orientation is same            not 4.
     as on Fig, 6 below:

          A       M
           \     /     Removal of M from the structure
            C===C      on Fig. 5 changes the geometry from trans
           /     \     to cis.
          M'      B    Removal of M and M' from the structure
          Fig. 6       on Fig. 6 does not change the A-C=C-B
                       geometry: it is trans.

   To resolve the problem InChI API accepts the second parity
   corresponding to the metal-disconnected structure.
   To store both bond parities use left shift by 3 bits:

   inchi_Stereo0D::parity = ParityOfConnected | (ParityOfDisconnected<<3)

   In case when only disconnected structure parity exists set
   ParityOfConnected = INCHI_PARITY_UNDEFINED.
   This is the only case when INCHI_PARITY_UNDEFINED parity
   may be fed to the InChI.

   In cases when the bond parity in a disconnected structure exists and
   differs from the parity in the connected structure the atoms A and B
   should be non-metals.

****************************************************************************/

// /* 0D parity types */
// typedef enum tagINCHIStereoType0D {
//   INCHI_StereoType_None = 0,
//   INCHI_StereoType_DoubleBond = 1,
//   INCHI_StereoType_Tetrahedral = 2,
//   INCHI_StereoType_Allene = 3
// } inchi_StereoType0D;

export const inchi_StereoType0D = new Enum({
  INCHI_StereoType_None: 0,
  INCHI_StereoType_DoubleBond: 1,
  INCHI_StereoType_Tetrahedral: 2,
  INCHI_StereoType_Allene: 3,
});

// /* 0D parities */
// typedef enum tagINCHIStereoParity0D {
//   INCHI_PARITY_NONE = 0,
//   INCHI_PARITY_ODD = 1,  /* 'o' */
//   INCHI_PARITY_EVEN = 2,  /* 'e' */
//   INCHI_PARITY_UNKNOWN = 3,  /* 'u' */ /* (see also readinch.c)
//                                          used in: Extract0DParities, InchiToAtom  */
//   INCHI_PARITY_UNDEFINED = 4   /* '?' -- should not be used; however, see Note above */
// } inchi_StereoParity0D;

export const inchi_StereoParity0D = new Enum({
  INCHI_PARITY_NONE: 0,
  INCHI_PARITY_ODD: 1 /* 'o' */,
  INCHI_PARITY_EVEN: 2 /* 'e' */,
  INCHI_PARITY_UNKNOWN: 3 /* 'u' */ /* (see also readinch.c) used in: Extract0DParities, InchiToAtom  */,
  INCHI_PARITY_UNDEFINED: 4 /* '?' -- should not be used; however, see Note above */,
});

/*************************************************
 *
 *
 *  0D - S T E R E O  (if no coordinates given)
 *
 *
 *************************************************/

//  typedef struct tagINCHIStereo0D {
//   AT_NUM  neighbor[4];    /* 4 atoms always */
//   AT_NUM  central_atom;   /* central tetrahedral atom or a central */
//                           /* atom of allene; otherwise NO_ATOM */
//   S_CHAR  type;           /* inchi_StereoType0D */
//   S_CHAR  parity;         /* inchi_StereoParity0D: may be a combination of two parities: */
//                           /* ParityOfConnected | (ParityOfDisconnected << 3), see Note above */
// }inchi_Stereo0D;

export const inchi_Stereo0D = NAPIStructType({
  neighbor: NAPIArrayType(refNAPI.types.short, 4),
  central_atom: refNAPI.types.short,
  type: refNAPI.types.char,
  parity: refNAPI.types.char,
});

/*************************************************
 *
 *
 *  I N C h I    D L L     I n p u t
 *
 *
 *************************************************/

/*
    Structure -> InChI

    GetINCHI()
    GetStdINCHI()
    GetINCHIEx()

*/

// typedef struct tagINCHI_Input
// {
//     /* the caller is responsible for the data allocation and deallocation               */
//     inchi_Atom     *atom;         /* array of num_atoms elements                        */
//     inchi_Stereo0D *stereo0D;     /* array of num_stereo0D 0D stereo elements or NULL   */
//     char           *szOptions;    /* InChI options: space-delimited; each is preceded by*/
//                                   /* '/' or '-' depending on OS and compiler            */
//     AT_NUM          num_atoms;    /* number of atoms in the structure < MAX_ATOMS       */
//     AT_NUM          num_stereo0D; /* number of 0D stereo elements                       */
// }inchi_Input;

export const inchi_Input = NAPIStructType({
  atom: refNAPI.refType(inchi_Atom),
  stereo0D: refNAPI.refType(inchi_Stereo0D),
  szOptions: refNAPI.refType(refNAPI.types.char),
  num_atoms: refNAPI.types.short,
  num_stereo0D: refNAPI.types.short,
});

/*
    Extended input supporting v. 1.05+ extensions: V3000; polymers

    Mainly follows Accelrys CTFile cpecification.

    See:
    CTFile Formats. Accelrys, December 2011.
    http://accelrys.com/products/collaborative-science/biovia-draw/ctfile-no-fee.html

    Note that V3000 extensions are supported onlyprovisionally: the data are read but not used

*/

/* Polymers */

// typedef struct inchi_Input_PolymerUnit
// {
//     int id;             /* Unit id; it is what is called 'Sgroup number'        */
//                         /* in CTFile (not used, kept for compatibility)         */
//     int type;           /* Unit type as per CTFile format (STY)                 */
//     int subtype;        /* Unit subtype as per CTFile format (SST)              */
//     int conn;           /* Unit connection scheme  as per CTFile format (SCN)   */
//     int label;          /* One more unit id; what is called 'unique Sgroup      */
//                         /* identifier' in CTFile (not used, for compatibility)  */
//     int na;             /* Number of atoms in the unit                          */
//     int nb;             /* Number of bonds in the unit                          */
//     double xbr1[4];     /* Bracket ends coordinates (SDI)                       */
//     double xbr2[4];     /* Bracket ends coordinates (SDI)                       */
//     char smt[80];       /* Sgroup Subscript (SMT) ('n' or so )                  */
//     int *alist;         /* List of atoms in the unit (SAL), atomic numbers      */
//     int *blist;         /* List of crossing bonds of unit:                      */
//                         /* [bond1end1, bond1end2, bond2end1, bond2end2]         */
// }  inchi_Input_PolymerUnit;

export const inchi_Input_PolymerUnit = NAPIStructType({
  id: refNAPI.types.int,
  type: refNAPI.types.int,
  subtype: refNAPI.types.int,
  conn: refNAPI.types.int,
  label: refNAPI.types.int,
  na: refNAPI.types.int,
  nb: refNAPI.types.int,
  xbr1: NAPIArrayType(refNAPI.types.double, 4),
  xbr2: NAPIArrayType(refNAPI.types.double, 4),
  alist: refNAPI.refType(refNAPI.types.int),
  blist: refNAPI.refType(refNAPI.types.int),
});

// typedef struct inchi_Input_Polymer
// {
//     /* List of pointers to polymer units        */
//     inchi_Input_PolymerUnit **units;
//     int        n;   /* Number of polymer units  */
// } inchi_Input_Polymer;

export const inchi_Input_Polymer = NAPIStructType({
  units: refNAPI.refType(refNAPI.refType(inchi_Input_PolymerUnit)),
  n: refNAPI.types.int,
});

/*
    V3000 Extensions

    Note that V3000 extensions are supported only
    provisionally, the data are read but not used
*/
// typedef struct inchi_Input_V3000
// {
//     int n_non_star_atoms;
//     int n_star_atoms;
//     int *atom_index_orig;       /* Index as supplied for atoms                      */
//     int *atom_index_fin;        /* = index or -1 for star atom                      */
//     int n_sgroups;              /* Not used yet.                                    */
//     int n_3d_constraints;       /* Not used yet.                                    */
//     int n_collections;
//     int n_non_haptic_bonds;
//     int n_haptic_bonds;
//     int **lists_haptic_bonds;   /* Haptic_bonds[i] is pointer to int                */
//                                 /*    array which contains:                         */
//                                 /* bond_type, non-star atom number,                 */
//                                 /* nendpts, then endpts themselves                  */
//     /* Enhanced stereo collections */
//     int n_steabs;
//     int **lists_steabs;         /* steabs[k][0] - not used                          */
//                                 /* steabs[k][1] -  number of members in collection  */
//                                 /* steabs[k][2..] - member atom numbers             */
//     int n_sterel;
//     int **lists_sterel;         /* sterel[k][0] - n from "STERELn" tag              */
//                                 /* sterel[k][1] -  number of members in collection  */
//                                 /* sterel[k][2..] - member atom numbers             */
//     int n_sterac;
//     int **lists_sterac;         /* sterac[k][0] - n from "STERACn" tag              */
//                                 /* sterac[k][1] -  number of members in collection  */
//                                 /* sterac[k][0] - number from "STERACn" tag         */
// } inchi_Input_V3000;

export const inchi_Input_V3000 = NAPIStructType({
  n_non_star_atoms: refNAPI.types.int,
  n_star_atoms: refNAPI.types.int,
  atom_index_orig: refNAPI.refType(refNAPI.types.int),
  atom_index_fin: refNAPI.refType(refNAPI.types.int),
  n_sgroups: refNAPI.types.int,
  n_3d_constraints: refNAPI.types.int,
  n_collections: refNAPI.types.int,
  n_non_haptic_bonds: refNAPI.types.int,
  n_haptic_bonds: refNAPI.types.int,
  lists_haptic_bonds: refNAPI.refType(refNAPI.refType(refNAPI.types.int)),

  n_steabs: refNAPI.types.int,
  lists_steabs: refNAPI.refType(refNAPI.refType(refNAPI.types.int)),
  n_sterel: refNAPI.types.int,
  lists_sterel: refNAPI.refType(refNAPI.refType(refNAPI.types.int)),
  n_sterac: refNAPI.types.int,
  lists_sterac: refNAPI.refType(refNAPI.refType(refNAPI.types.int)),
});

/* Input data structure for GetINCHIEx() */

// typedef struct inchi_InputEx
// {
//     /* the caller is responsible for the data allocation and deallocation                           */

//     /* same as in older inchi_Input                                                                 */
//     inchi_Atom *atom;                       /* array of num_atoms elements                          */
//     /* same as in older inchi_Input                                                                 */
//     inchi_Stereo0D *stereo0D;               /* array of num_stereo0D 0D stereo elements or NULL     */
//     /* same as in older inchi_Input                                                                 */
//     char *szOptions;                        /* InChI options: space-delimited; each is preceded by  */
//                                             /* '/' or '-' depending on OS and compiler              */
//     /* same as in older inchi_Input                                                                 */
//     AT_NUM num_atoms;                       /* number of atoms in the structure                     */
//     /* same as in older inchi_Input                                                                 */
//     AT_NUM num_stereo0D;                    /* number of 0D stereo elements                         */
//     inchi_Input_Polymer *polymer;           /* v. 1.05+ extended data, polymers                      */
//                                             /* NULL if not a polymer                                */
//     inchi_Input_V3000 *v3000;               /* v. 1.05+ extended data, V3000 Molfile features        */
//                                             /* NULL if no V3000 extensions present                  */
// } inchi_InputEx;

export const inchi_InputEx = NAPIStructType({
  atom: refNAPI.refType(inchi_Atom),
  Stereo0D: refNAPI.refType(inchi_Stereo0D),
  szOptions: refNAPI.refType(refNAPI.types.char),
  num_atoms: refNAPI.types.short,
  num_stereo0D: refNAPI.types.short,
  polymer: refNAPI.refType(inchi_Input_Polymer),
  v3000: refNAPI.refType(inchi_Input_V3000),
});

/*
    InChI -> Structure

    GetStructFromINCHI()
    GetStructFromStdINCHI()
    GetStructFromINCHIEx()
*/

// typedef struct tagINCHI_InputINCHI
// {
//     /* the caller is responsible for the data allocation and deallocation       */
//     char *szInChI;      /* InChI ASCIIZ string to be converted to a strucure    */
//     char *szOptions;    /* InChI options: space-delimited; each is preceded by  */
//                         /* '/' or '-' depending on OS and compiler */
// } inchi_InputINCHI;

export const inchi_InputINCHI = NAPIStructType({
  szInChI: refNAPI.refType(refNAPI.types.char),
  szOptions: refNAPI.refType(refNAPI.types.char),
});

/*************************************************
 *
 *
 *  I N C h I     D L L     O u t p u t
 *
 *
 *************************************************/

/*
    Structure -> InChI
*/

// typedef struct tagINCHI_Output
// {
//     /* zero-terminated C-strings allocated by GetStdINCHI() */
//     /* to deallocate all of them call FreeStdINCHI() (see below) */
//     char *szInChI;     /* InChI ASCIIZ string */
//     char *szAuxInfo;   /* Aux info ASCIIZ string */
//     char *szMessage;   /* Error/warning ASCIIZ message */
//     char *szLog;       /* log-file ASCIIZ string, contains a human-readable list */
//                        /* of recognized options and possibly an Error/warning message */
// } inchi_Output;
