#!/usr/bin/env node

require('dotenv').config();
const { downloadBlobToLocal, checkAzureStorageAccess, uploadToStorageBlob } = require("./lib/azure_blobService")

const containerName = 'names'

async function main() {

  if (await checkAzureStorageAccess()) {

    const files = [
      "ringcw20Array.json",
      "starcw20Array.json"
    ]

    console.log(files)
    const localfolder = process.env.TEMP_FOLDER

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      await uploadToStorageBlob(containerName,localfolder,element)
    }
  }
}

main();