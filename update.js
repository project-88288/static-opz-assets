const readline = require('readline');

const intro = ' This program is designed to update a icons with new logos from ./logos directory.\
It provides update icons into ./icons and also updating into the clound on azure with \
the latest information. The program require input of network name mainnet,\
 localterra, testnet or classic.'

 console.log(intro)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to process user input
function processData(networkName) {
  // Create an object to store the network data
  const networkData = {
    name: networkName,
    // Add more properties as needed
  };

  // Print the network data object
  console.log(networkData);

  // Close the readline interface
  rl.close();
}

// Prompt the user for network name
rl.question('Enter the network name: ', processData);