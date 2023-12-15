import fs from "fs";
// const fs = require("fs");

// Load the JSON data
let data = JSON.parse(
  fs.readFileSync("src/shared/conductorTypes.json", "utf8")
);

// Add an auto-incrementing id to each object
data.forEach((obj, index) => {
  obj.id = index + 1;
});

// Write the updated data back to the file
fs.writeFileSync(
  "src/shared/conductorTypes.json",
  JSON.stringify(data, null, 2),
  "utf8"
);
