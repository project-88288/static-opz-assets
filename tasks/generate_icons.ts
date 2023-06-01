import { task } from "@terra-money/terrain";
import * as fs from 'fs-extra';
import { arrayTemplate, getJsonPath, loadJson, objectTemplate, storeJson } from "../lib/jsonFiles";
import delay from 'bluebird'

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
    const srcPath = configPath.replace('config.terrain.json', `assets/logos/LOGO.${type}`)
    //
    const ringcw20Namejsonpath = getJsonPath('ringcw20Names', configPath)
    const ringcw20names = await loadJson(arrayTemplate, ringcw20Namejsonpath)
    console.log(type,'=>',networkname,ringcw20names[networkname])
    //
    ringcw20names[networkname].forEach(element => {
      const desPath = srcPath.replace(`LOGO.${type}`, `${element}.${type}`)
      fs.copyFile(srcPath, desPath).then(() => {
        console.log(`generated ${element}.${type}`)
      }).catch(e => console.log(e))
      //
      delay(1000)
    })

    const starcw20Namejsonpath = getJsonPath('starcw20Names', configPath)
    const starcw20names = await loadJson(arrayTemplate, starcw20Namejsonpath)
    console.log(type,'=>',networkname,starcw20names[networkname])
    //
    starcw20names[networkname].forEach(element => {
      const desPath = srcPath.replace(`LOGO.${type}`, `${element}.${type}`)
      fs.copyFile(srcPath, desPath).then(() => {
        console.log(`generated ${element}.${type}`)
      }).catch(e => console.log(e))
      //
      delay(1000)
    })

  });
}