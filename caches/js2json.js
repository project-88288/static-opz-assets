#!/usr/bin/env node

require('dotenv').config();
const fs = require("fs").promises;
const path = require('path');

const files = [
  "ringcw20Names.js",
  "starcw20Names.js"
]

const localfolder = process.env.TEMP_FOLDER
if(!localfolder) return

files.forEach(async (file) => {
  const _filepath = `./${file}`;

  const filepath = path.basename(_filepath)
  const fullPath = path.join(__dirname,filepath)
  //console.log(fullPath)
  // Append `on` to the end of `js` to create `json`.
  const _jsonpath = `./${file}on`;
  const jsonpath = path.basename(_jsonpath)
  const fullPathJSON = path.join(__dirname,jsonpath)
  //console.log(fullPathJSON)

  const list = require(fullPath);
  
  // Sort lists based on protocol name, or contract name.
  ["mainnet", "classic", "testnet", "localterra"].forEach((network) => {
    if (typeof list[network] === "undefined") {
      return;
    }

    list[network] = Object.entries(list[network])
      .sort(([_a, a], [_b, b]) => {
        if (typeof a.protocol !== "undefined") {
          return a.protocol.localeCompare(b.protocol);
        }

        if (typeof a.name !== "undefined") {
          return a.name.localeCompare(b.name);
        }

        return 0;
      })
      .reduce((obj, key) => {
        obj[key[0]] = list[network][key[0]];
        return obj;
      }, {});
  });

  // Format the JSON with indentions before writing.
  const jsonList = JSON.stringify(list, null, 2);
  await fs.writeFile(fullPathJSON, jsonList);

});

