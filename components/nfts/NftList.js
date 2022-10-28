import NftItem from './NftItem';
import classes from './NftList.module.css';

function NftList(props) {

  const priceSubmitHandler=(NFtSellToken)=>{
    props.onPriceSubmit(NFtSellToken);
  }

  const onBuyHandler=(NFtBuyToken)=>{
    props.onBuyClicked(NFtBuyToken);
  }
  
  return (
    <ul className={classes.list}>
      {props.loadednfts.map((nft) => (
        <NftItem
          onPriceSubmit={priceSubmitHandler}
          onBuyClicked={onBuyHandler}
          key={nft.tokenId}
          tokenId={nft.tokenId}
          price={nft.price}
          state={nft.state}
          owner={nft.owner}
          image={nft.image}
          name={nft.name}
          description={nft.description}
          caller={props.caller}        
        />
      ))}
    </ul>
  );
}

export default NftList;