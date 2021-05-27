const {CheckINCHIKey, CheckINCHI, GetStringLength} = require("./index");

// Example usage
console.log(CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj")); // Invalid length and format
console.log(CheckINCHIKey("ddddkhhkjhkjhkjhkjhkjhkj111")); // Valid length and Invalid format
console.log(CheckINCHIKey("VNWKTOKETHGBQD-UHFFFAOYSA-N")); // Valid length and valid format
console.log(CheckINCHI("ddddkhhkjhkjhkjhkjhkjhkj", 0)); // Invalid length and format
console.log(CheckINCHI("ddddkhhkjhkjhkjhkjhkjhkj111", 0)); // Valid length and Invalid format
console.log(CheckINCHI("VNWKTOKETHGBQD-UHFFFAOYSA-N", 1)); // Valid length and valid format
console.log(GetStringLength("VNWKTOKETHGBQD-UHFFFAOYSA-N")); // Valid length and valid format