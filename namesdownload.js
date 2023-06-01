#!/usr/bin/env node

require('dotenv').config();
const { downloadBlobToLocal, checkAzureStorageAccess } = require("./lib/azure_blobService")

const containerName = 'names'

async function main() {

  if (await checkAzureStorageAccess()) {

    const files = [
      "ringcw20Names.js",
      "starcw20Names.js",
      "ringcw20Names.json",
      "starcw20Names.json"
    ]

    console.log(files)
    const localfolder = process.env.TEMP_FOLDER

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      await downloadBlobToLocal(containerName, localfolder, element)
    }
  }
}

main();