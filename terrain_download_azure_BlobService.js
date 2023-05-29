#!/usr/bin/env node

require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs").promises;
const { downloadBlobToLocal } = require("./lib/azure_blobService")

const containerName = 'terrain'
const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);

async function main() {

    const files = [
        "./config.terrain.json",
        "./keys.terrain.js",
        "./refs.terrain.json"
    ]

    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        await downloadBlobToLocal(containerName,'.', element)
    }
}

main();

