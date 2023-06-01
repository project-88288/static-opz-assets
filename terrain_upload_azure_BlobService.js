#!/usr/bin/env node

require('dotenv').config();
const { uploadToStorageBlob, checkAzureStorageAccess } = require("./lib/azure_blobService")

const containerName = 'terrain'

async function main() {

    if (await checkAzureStorageAccess()) {

        const files = [
            "./config.terrain.json",
            //"./keys.terrain.js",
            "./refs.terrain.json"
        ]

        console.log(files)

        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            await uploadToStorageBlob(containerName, '.', element)
        }
    }
}

main();

