#Run NPM install to install all dependencies
npm install

#The compiled contract is stored on /contracts folder
#deploy the contract to polygon mumbai test network using the 
#following command
npx hardhat run scripts/deploy.js --network mumbai

#npm run dev to execute the application
npm run dev
