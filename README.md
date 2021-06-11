![@manufac-analytics/inchi Logo](https://user-images.githubusercontent.com/25290212/120916404-15b66a80-c6c7-11eb-8604-6409546342c0.png)

_NodeJS/TypeScript Port of [InChI 1.06](https://www.inchi-trust.org/downloads/)_

[![Build & Tests](https://github.com/manufac-analytics/inchi/actions/workflows/main.yml/badge.svg)](https://github.com/manufac-analytics/inchi/actions/workflows/main.yml)

---

### How to use this library?

1. Using the library in your source code.

   - This library has a dependency on [ffi-napi](https://www.npmjs.com/package/ffi-napi) so you may need to install [some necessary build tools](https://github.com/nodejs/node-gyp#installation) for it to work.
   - Alternately, you can also use Docker to automatically set up your dev environment with required dependencies. [Here's](https://github.com/manufac-analytics/inchi/blob/main/.devcontainer/Dockerfile) the Dockerfile that we are using for the same.

2. Running a [JSON-RPC 2.0](https://www.jsonrpc.org/specification) server.

   - This library exposes a [Docker image](https://hub.docker.com/r/manufacanalytics/inchi) which you can run to spin off a JSON-RPC 2.0 server.
   - You can interact with that server from your source code by making a HTTP `POST` request.
   - The request's `body` should be JSON-RPC 2.0 compliant. For e.g.,

   ```json
   {
     "jsonrpc": "2.0",
     "method": "GetStringLength",
     "params": ["my-string"],
     "id": 1
   }
   ```

   - The response can look like:

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": 9
   }
   ```

   - In case of an error, the response can look like:

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "error": {
       "message": "Expected 1 arguments, got 2",
       "code": -32602
     }
   }
   ```

---

### API Porting Status

_We are slowly working towards exposing all the InCHI functions. PRs welcome._

A. Generation of InChI from structure

- [ ] GetINCHI
- [ ] GetINCHIEx
- [ ] FreeINCHI
- [ ] Free_inchi_Input
- [ ] Get_inchi_Input_FromAuxInfo
- [ ] GetStdINCHI
- [ ] FreeStdINCHI
- [ ] Free_std_inchi_Input
- [ ] Get_std_inchi_Input_FromAuxInfo

B. Generation of InChI from structure, step-by-step way

- [ ] INCHIGEN_Create
- [ ] INCHIGEN_Setup
- [ ] INCHIGEN_DoNormalization
- [ ] INCHIGEN_DoCanonicalization
- [ ] INCHIGEN_DoSerialization
- [ ] INCHIGEN_Reset
- [ ] INCHIGEN_Destroy
- [ ] STDINCHIGEN_Create
- [ ] STDINCHIGEN_Setup
- [ ] STDINCHIGEN_DoNormalization
- [ ] STDINCHIGEN_DoCanonicalization
- [ ] STDINCHIGEN_DoSerialization
- [ ] STDINCHIGEN_Reset
- [ ] STDINCHIGEN_Destroy

C. Generation of InChI directly from Molfile

- [x] MakeINCHIFromMolfileText

D. Restoring structure from InChI or AuxInfo

- [ ] GetStructFromINCHI
- [ ] GetStructFromINCHIEx
- [ ] FreeStructFromINCHI
- [ ] GetStructFromStdINCHI

E. InChIKey

- [x] GetINCHIKeyFromINCHI
- [x] CheckINCHIKey
- [x] GetStdINCHIKeyFromStdINCHI

F. Test and utlity procedures

- [ ] GetINCHIfromINCHI
- [x] CheckINCHI
- [x] GetStringLength
- [ ] FreeStructFromStdINCHI

G. Status Objects

- [ ] IXA_STATUS_Create
- [ ] IXA_STATUS_Clear
- [ ] IXA_STATUS_Destroy
- [ ] IXA_STATUS_HasError
- [ ] IXA_STATUS_HasWarning
- [ ] IXA_STATUS_GetCount
- [ ] IXA_STATUS_GetSeverity
- [ ] IXA_STATUS_GetMessage

H. Molecule Objects

- [ ] IXA_MOL_Create
- [ ] IXA_MOL_Clear
- [ ] IXA_MOL_Destroy
- [ ] IXA_MOL_ReadMolfile
- [ ] IXA_MOL_ReadInChI
- [ ] IXA_MOL_SetChiral
- [ ] IXA_MOL_GetChiral
- [ ] IXA_MOL_CreateAtom
- [ ] IXA_MOL_SetAtomElement
- [ ] IXA_MOL_SetAtomAtomicNumber
- [ ] IXA_MOL_SetAtomMass
- [ ] IXA_MOL_SetAtomCharge
- [ ] IXA_MOL_SetAtomRadical
- [ ] IXA_MOL_SetAtomHydrogens
- [ ] IXA_MOL_SetAtomX
- [ ] IXA_MOL_SetAtomY
- [ ] IXA_MOL_SetAtomZ
- [ ] IXA_MOL_CreateBond
- [ ] IXA_MOL_SetBondType
- [ ] IXA_MOL_SetBondWedge
- [ ] IXA_MOL_SetDblBondConfig
- [ ] IXA_MOL_CreateStereoTetrahedron
- [ ] IXA_MOL_CreateStereoRectangle
- [ ] IXA_MOL_CreateStereoAntiRectangle
- [ ] IXA_MOL_SetStereoParity
- [ ] IXA_MOL_CreatePolymerUnit (new in v. 1.06)
- [ ] IXA_MOL_GetPolymerUnitId (new in v. 1.06)
- [ ] IXA_MOL_GetPolymerUnitIndex (new in v. 1.06)
- [ ] IXA_MOL_SetPolymerUnit (new in v. 1.06)
- [ ] IXA_MOL_GetNumAtoms
- [ ] IXA_MOL_GetNumBonds
- [ ] IXA_MOL_GetAtomId
- [ ] IXA_MOL_GetBondId
- [ ] IXA_MOL_GetAtomIndex
- [ ] IXA_MOL_GetBondIndex
- [ ] IXA_MOL_GetAtomNumBonds
- [ ] IXA_MOL_GetAtomBond
- [ ] IXA_MOL_GetCommonBond
- [ ] IXA_MOL_GetBondAtom1
- [ ] IXA_MOL_GetBondAtom2
- [ ] IXA_MOL_GetBondOtherAtom (new in v. 1.06)
- [ ] IXA_MOL_GetAtomElement
- [ ] IXA_MOL_GetAtomAtomicNumber
- [ ] IXA_MOL_GetAtomMass
- [ ] IXA_MOL_GetAtomCharge
- [ ] IXA_MOL_GetAtomRadical
- [ ] IXA_MOL_GetAtomHydrogens
- [ ] IXA_MOL_GetAtomX
- [ ] IXA_MOL_GetAtomY
- [ ] IXA_MOL_GetAtomZ
- [ ] IXA_MOL_GetBondType
- [ ] IXA_MOL_GetBondWedge
- [ ] IXA_MOL_GetDblBondConfig
- [ ] IXA_MOL_GetNumStereos
- [ ] IXA_MOL_GetStereoId
- [ ] IXA_MOL_GetStereoIndex
- [ ] IXA_MOL_GetStereoTopology
- [ ] IXA_MOL_GetStereoCentralAtom
- [ ] IXA_MOL_GetStereoCentralBond
- [ ] IXA_MOL_GetStereoNumVertices
- [ ] IXA_MOL_GetStereoVertex
- [ ] IXA_MOL_GetStereoParity

I. InChI Builder Objects

- [ ] IXA_INCHIBUILDER_Create
- [ ] IXA_INCHIBUILDER_SetMolecule
- [ ] IXA_INCHIBUILDER_GetInChI
- [ ] IXA_INCHIBUILDER_GetAuxInfo
- [ ] IXA_INCHIBUILDER_GetLog
- [ ] IXA_INCHIBUILDER_Destroy
- [ ] IXA_INCHIBUILDER_SetOption
- [ ] IXA_INCHIBUILDER_SetOption_Stereo
- [ ] IXA_INCHIBUILDER_SetOption_Timeout
- [ ] IXA_INCHIBUILDER_SetOption_Timeout_Milliseconds (new in v. 1.06)
- [ ] IXA_INCHIBUILDER_CheckOption (new in v. 1.06)
- [ ] IXA_INCHIBUILDER_CheckOption_Stereo (new in v. 1.06)
- [ ] IXA_INCHIBUILDER_IXA_INCHIBUILDER_GetOption_Timeout_MilliSeconds (new in v. 1.06)

J. InChIKey Builder Objects

- [ ] IXA_INCHIKEYBUILDER_Create
- [ ] IXA_INCHIKEYBUILDER_SetInChI
- [ ] IXA_INCHIKEYBUILDER_GetInChIKey
- [ ] IXA_INCHIKEYBUILDER_Destroy

---

### Contributors' Notes

#### Intro

- This library is a NodeJS/TypeScript port of [InChI 1.06](https://www.inchi-trust.org/downloads/). API documentation of the original C based library is present [here](https://www.inchi-trust.org/download/106/INCHI-1-DOC.zip). Derived some inspiration from [smikes/inchi](https://github.com/smikes/inchi).
- The Shared Object file, `libinchi.so.1.06.00`, contains all the InChI related business logic, is installed from [InChITRUST](https://www.inchi-trust.org/downloads/), and is licensed under [IUPAC/InChI Trust Licence](https://www.inchi-trust.org/download/106/LICENCE.pdf).

#### Which porting approach is used?

- Here's a cool overview of integrating native modules with NodeJS applications: [N-API - The new native in Node.JS by Atishay Jain](https://www.youtube.com/watch?v=E0w7Tc0f2fA).
- This library uses foreign function interface to access the native InChI module. The decision was mainly taken to achieve an ease of development that ffi provides as compared to using [nan](https://github.com/nodejs/nan), [Node-API](https://nodejs.org/api/n-api.html), or [node-addon-api](https://github.com/nodejs/node-addon-api).
- One can port the InChI library using the above tools also. These [examples](https://github.com/nodejs/node-addon-examples) may provide you a good idea on how to move forward.
- For using ffi, 2 libraries were considered: [ffi](https://www.npmjs.com/package/ffi) and [ffi-napi](https://www.npmjs.com/package/ffi-napi). `ffi-napi` was adopted because it supports the latest/recent versions of NodeJS; it is tested to run on Node 6 and above, whereas `ffi` is only tested to run on Node v0.6, v0.8, v0.9 and v0.10.
- You can learn more about `ffi-napi`/`ffi` via this [tutorial](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial).

#### How are the `types` ported?

- Information given in this [tutorial](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial) was used.
- But for compliance with N-API, different type-mapping libraries were used as compared to what's prescribed in the above tutorial.
  - [ref](https://www.npmjs.com/package/ref) --> [ref-napi](https://www.npmjs.com/package/ref-napi)
  - [ref-array](https://github.com/TooTallNate/ref-array) --> [ref-array-di](https://www.npmjs.com/package/ref-array-di)
  - [ref-struct](https://github.com/TooTallNate/ref-struct) --> [ref-struct-di](https://www.npmjs.com/package/ref-struct-di)
- Here's some [detailed docs](https://tootallnate.github.io/ref/) on how to use the `ref`/`ref-napi` modules.
- For mapping Enums, [enum](https://github.com/adrai/enum) is used.
