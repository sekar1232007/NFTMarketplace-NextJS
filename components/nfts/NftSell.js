import React, { useState } from 'react';
import classes from './NftSell.module.css';
const NftSell=(props)=>{
    const [formType,setformType]=useState(0);
    const [enteredPrice,setEnteredPrice]=useState('');
    
    const priceChangeHandler=(event)=>{
        //set the enteredAmount state to the value entered in the Amount textbox
        setEnteredPrice(event.target.value)        
    }

    const priceSubmitHandler=()=>{
        props.onPriceSubmit(enteredPrice);
    }
    const cancelClicked=(event)=>{
        setformType(0);
   }

    const shortFormSubmitHandler=(event)=>{
         setformType(1);
    }

    if(formType===0){
        return(
            <div className={classes.actions}>
            <button onClick={shortFormSubmitHandler}>List</button>
            </div>
       )
    }

    return(
    <div>
        <div className={classes.pricecontrol}>
        <label>Price in MATIC</label>
        <input type='number' min='0.01' step='0.01' value={enteredPrice} onChange={priceChangeHandler}></input>
        </div>
       
        <div className={classes.actions}>
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={priceSubmitHandler}>set Price</button>
        </div>
    </div> 
    )

}
export default NftSell;
