import { useRef } from 'react';
import { useState } from 'react'
import { useRouter } from 'next/router'
import Card from '../ui/Card';
import classes from './NewNftForm.module.css';





function NewNftForm(props) {

  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  const [fileUrl, setFileUrl] = useState(null)
  
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await props.ipfsClient.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://test-project.infura-ipfs.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const nftData = {
      name: enteredName,
      description: enteredDescription,
      image: fileUrl,
      price: enteredPrice,
    };

    props.onCreateNFT(nftData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Price</label>
          <input type='text' required id='price' ref={priceInputRef} />
        </div>

        <div className={classes.control}>
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        </div>
        
        <div className={classes.actions}>
          <button>Add NFT</button>
        </div>
      </form>
    </Card>
  );
}

export default NewNftForm;
