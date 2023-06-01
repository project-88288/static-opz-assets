import { task } from "@terra-money/terrain";
import { arrayTemplate, getJsonPath, loadJson, objectTemplate, storeJson } from "../lib/jsonFiles";
import fs from 'fs';
import path from 'path';
import { StoreCodeProposal } from "@terra-money/terra.js";

task(async () => {
  const networkname = process.env.network
  const configPath = process.env.configPath
  const signer = process.env.signer
  //
  if (!signer) return
  if (!configPath) return
  if (!networkname) return;
  //
  console.log(networkname, signer)
  console.log(configPath)
  //
  await generate_png('png')
  await generate_png('svg')
});

async function generate_png(type) {

  task(async () => {
    const networkname = process.env.network
    const configPath = process.env.configPath
    const signer = process.env.signer
    //
    if (!signer) return
    if (!configPath) return
    if (!networkname) return;
    //
    const srcPath = configPath.replace('config.terrain.json', `logos/LOGO.${type}`)
    console.log(`From this source ${srcPath}`)
    const directoryPath = path.dirname(srcPath)
    await createDirectoryIfNotExists(directoryPath)
    // 
    const exists = isFilesExists(srcPath)
    console.log(`File ${srcPath} exists: ${exists}`);
    if (exists) {
      //
      const ringcw20Namejsonpath = getJsonPath('ringcw20Names', configPath)
      const ringcw20names = await loadJson(arrayTemplate, ringcw20Namejsonpath)
      console.log(`load ring-names from ${ringcw20Namejsonpath}`)
      //
      let ringnames: string[] = []
      Object.entries(ringcw20names[networkname]).forEach(data => {
        const element = String(data[1]);
        ringnames.push(element)
      })
      //
      const ringcw20NameArraypath = getJsonPath('ringcw20Array', configPath)
      let ringrnamesJson = await loadJson(arrayTemplate, ringcw20NameArraypath)
      ringrnamesJson[networkname] = ringnames;
      await storeJson(ringrnamesJson, ringcw20NameArraypath)

      for (let index = 0; index < ringnames.length; index++) {
        const element = ringnames[index];
        const desPath = srcPath.replace(`logos/LOGO.${type}`, `icons/${element}.${type}`)

        await copyFile(srcPath, desPath)
          .then(() => {
            console.log(`Copy ${srcPath} to ${desPath}`)
          }).catch(e => console.log(`${e}`))
      }

      const starcw20Namejsonpath = getJsonPath('starcw20Names', configPath)
    
      const starcw20names = await loadJson(arrayTemplate, starcw20Namejsonpath)
      console.log(`load star-names from ${ringcw20Namejsonpath}`)
      //
      let starnames: string[] = []
      Object.entries(starcw20names[networkname]).forEach(data => {
        const element = String(data[1]);
        starnames.push(element)
      })
      //
      const starcw20NameAraypath = getJsonPath('starcw20Array', configPath)
      let starnamesJson = await loadJson(arrayTemplate, starcw20NameAraypath)
      starnamesJson[networkname] = starnames;
      await storeJson(starnamesJson,starcw20NameAraypath)

      for (let index = 0; index < starnames.length; index++) {
        const element = starnames[index];
        const desPath = srcPath.replace(`logos/LOGO.${type}`, `icons/${element}.${type}`)
        await copyFile(srcPath, desPath)
          .then(() => {
            console.log(`Copy ${srcPath} to ${desPath}`)
          }).catch(e => console.log(`${e}`))
      }
    }
  });
}

function isFilesExists(filePath: string): boolean {
  // Check if the file exists
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function createDirectoryIfNotExists(directoryPath: string): Promise<void> {
  console.log(directoryPath)
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directory created: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
};

function copyFile(sourcePath: string, destinationPath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.access(destinationPath, fs.constants.F_OK, (err) => {
      if (err) {
        // Directory does not exist, create it
        const destinationDir = path.dirname(destinationPath);
        fs.mkdirSync(destinationDir, { recursive: true });
      }

      const sourceStream = fs.createReadStream(sourcePath);
      const destinationStream = fs.createWriteStream(destinationPath);

      sourceStream.on('error', reject);
      destinationStream.on('error', reject);
      destinationStream.on('finish', resolve);

      sourceStream.pipe(destinationStream);
    });
  });
}