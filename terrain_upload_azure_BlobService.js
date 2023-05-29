#!/usr/bin/env node

const { uploadToStorageBlob } = require("./lib/azure_blobService")

const containerName = 'terrain'

async function main()  {

    const files = [
        "./config.terrain.json",
        //"./keys.terrain.js",
        "./refs.terrain.json"
    ]
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        await uploadToStorageBlob(containerName,'.', element)
    }
}

main();

