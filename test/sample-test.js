const ethers = require('ethers')
const NFTMarketplace = require('../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json') 
const marketplaceAddress  = require('../config')



/* test/sample-test.js */

describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
  

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/kEyzItQvc6wu1DajdghUl6wkq7CG4s4E")
    //const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    let signer = new ethers.Wallet("0x02c382f8cea73a6ca9b8893319422f0f242241245fc25773b3589faf015e276c",provider)
    let contract1 = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract1.fetchMarketItems()
    items = await Promise.all(data.map(async i => {
     // const tokenUri = await contract.tokenURI(i.tokenId)
     //console.log("Price : ", ethers.utils.formatEther(i.price));
     
      let item = {
        price: ethers.utils.formatEther(i.price).toString(),
        tokenId: i.tokenId.toString(),
        owner: i.owner,
        //tokenUri
      }
      return item
    }))
    console.log('items: ', items)
    /*let signer = new ethers.Wallet("0x02c382f8cea73a6ca9b8893319422f0f242241245fc25773b3589faf015e276c",provider)
    let contract1 = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const price = ethers.utils.parseUnits('0.3', 'ether')
    let transaction = await contract1.createToken("https://www.mytokenlocation.com", price)
    await transaction.wait()/*


/*
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    const auctionPrice = ethers.utils.parseUnits('1000', 'ether')


    await nftMarketplace.createToken("https://www.mytokenlocation.com", auctionPrice)
    await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice)
      
    const [owner, buyer] = await ethers.getSigners()


    await nftMarketplace.putupforSale(1, auctionPrice)  
    

    balance = await owner.getBalance();
    //console.log('Owner Balance before purchase : ', balance);
    console.log('Owner Balance before purchase : ', ethers.utils.formatEther(balance));
    balance = await buyer.getBalance();
    console.log('Buyer Balance before purchase : ', ethers.utils.formatEther(balance));


    await nftMarketplace.connect(buyer).buyItem(1, { value: auctionPrice })


    balance = await owner.getBalance();
    console.log('Owner Balance after purchase : ', ethers.utils.formatEther(balance));    
    balance = await buyer.getBalance();
    console.log('Buyer Balance after purchase : ', ethers.utils.formatEther(balance));


    items = await nftMarketplace.fetchMyNFTs()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)*/

  })
})