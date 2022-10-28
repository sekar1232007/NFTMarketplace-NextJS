import { useRouter } from 'next/router';
import NftSell from './NftSell';
import Card from '../ui/Card';
import classes from './NftItem.module.css';

function NftItem(props) {
  const router = useRouter();
 

  function showDetailsHandler() {
    router.push('/' + props.tokenId);
  }
  const priceSubmitHandler=(NFtSellPrice)=>{
    props.onPriceSubmit({price:NFtSellPrice,NFTId:props.tokenId});
  }

  function buyNft(){
    props.onBuyClicked({price:props.price,NFTId:props.tokenId});
  }

  return (
    <li className={classes.item}>
      <Card>
        <div>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <h3>{props.price}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
        {props.caller == 'my-nft' && 
        (<NftSell onPriceSubmit={priceSubmitHandler}/>)        
        }  
        {props.caller == 'index' && props.state == 2 &&
        (<div className={classes.actions}>
        <button onClick={buyNft}>Buy</button>
        </div>)        
        }  

      </Card>
    </li>
  );
}

export default NftItem;
