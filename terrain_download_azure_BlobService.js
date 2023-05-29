#!/usr/bin/env node

require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs").promises;

const containerName = 'terrain'
const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);

async function main() {
    await createContainer()
    const files = [
        "./config.terrain.json",
       // "./keys.terrain.js",
        "./refs.terrain.json"
    ]
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        if ((await checkFileExists(element))) {
            console.log(`Bolb " ${element}" is exists`);
            await downloadBlobToLocal(element)
        }
        else {
            console.log(`Bolb "${element}" is not exists`);
        }
    }
}

main();

async function createContainer() {
    // Create a container (folder) if it does not exist
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const containerExists = await containerClient.exists()
    if (!containerExists) {
        const createContainerResponse = await containerClient.createIfNotExists();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.succeeded);
    }
    else {
        console.log(`Container ${containerName} already exists`);
    }
}

async function uploadToStorageBlob(filepath) {
    // Upload a file into blub
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const data = await fs.readFile(filepath);
    const filename = filepath.replace('/assets', '')
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    await blockBlobClient.upload(data, data.length);
    console.log(`Successfully uploaded ${filename} to Azure Storage Blob!`);
}


async function downloadBlobToLocal(filepath) {
    // Download the blob to a local file
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const filename = filepath.replace('', '')
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const response = await blockBlobClient.downloadToFile(filepath);
    console.log(`Blob "${filename}" downloaded successfully to "${filepath}".`);
}

async function checkFileExists(filepath) {
    // Check if the blob exists
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const filename = filepath.replace('', '')
    const blockBlobClient = containerClient.getBlobClient(filename);
    const exists = await blockBlobClient.exists();
    return exists;
}
