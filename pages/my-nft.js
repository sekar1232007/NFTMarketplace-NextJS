import NftList from '../components/nfts/NftList';
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

function MyNft() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const callerName='my-nft';
  useEffect(() => {
    loadNFTs()
  }, [])


  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    console.log("Inside Load NFT 1 :"+"loadingState : ",loadingState)
    console.log("Inside Load NFT 1 : nfts.length : ", nfts.length)
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi,signer)
    const data = await contract.fetchMyNFTs()


    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("before : ",i.tokenId.toNumber()," ",i.state.toNumber())
      const tokenUri = await contract.tokenURI(i.tokenId.toNumber())
      console.log("after : ",i.tokenId.toNumber()," ",i.state.toNumber())
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        state: i.state,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
    console.log("Inside Load NFT 2 :"+"loadingState : ",loadingState)
    console.log("Inside Load NFT 2 : nfts.length : ", nfts.length)
  }
  async function priceSubmitHandler (NFtSellToken){
    if (!NFtSellToken.price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(NFtSellToken.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    console.log('Inside NFT Sale : ',NFtSellToken.NFTId,'  ',NFtSellToken.price,'  ', priceFormatted)
    let transaction = await contract.putupforSale(NFtSellToken.NFTId,priceFormatted)
    await transaction.wait()
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No NFTs Owned</h1>)
  return <NftList loadednfts={nfts} caller={callerName} onPriceSubmit={priceSubmitHandler} />;
}

export default MyNft;
