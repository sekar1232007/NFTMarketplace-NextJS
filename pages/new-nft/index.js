// our-domain.com/new-meetup
import NewNftForm from '../../components/nfts/NewNftForm';
import Web3Modal from 'web3modal'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import {
  marketplaceAddress
} from '../../config'

import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
const projectId = '2DWRKnzK6zTnLBCAAhz43UcW7ED';   // <---------- your Infura Project ID

const projectSecret = '1b53f5c6652402f2317863a9226618c2';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


let nftdetails={name: '', description: '',image:'',price: ''}

function NewNft() {

  async function uploadToIPFS() {
    if (!nftdetails.name || !nftdetails.description || !nftdetails.price || !nftdetails.image) return
    // first, upload to IPFS 
    
    const data = JSON.stringify(nftdetails)
    try {
      console.log(data);
      const added = await client.add(data)
      const url = `https://test-project.infura-ipfs.io/ipfs/${added.path}`
      console.log(url);
      // after file is uploaded to IPFS, return the URL to use it in the transaction 
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  
  async function CreateNFTHandler(nftData) {
    console.log(nftData);
    nftdetails=nftData
    console.log(nftdetails);
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(nftdetails.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let transaction = await contract.createToken(url, price)
    await transaction.wait()

  }


  return <NewNftForm onCreateNFT={CreateNFTHandler} ipfsClient={client} />
}

export default NewNft;