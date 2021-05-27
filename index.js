const ffi = require("ffi-napi");
const { CheckINCHIKey } = ffi.Library("./libinchi.so.1.06.00", {
  CheckINCHIKey: ["int", ["string"]],
});

// More functions may be exported soon. PRs welcome.
module.exports = { CheckINCHIKey };

// Example usage
console.log(CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj")); // Invalid length and format
console.log(CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj111")); // Valid length and Invalid format
console.log(CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")); // Valid length and valid format
