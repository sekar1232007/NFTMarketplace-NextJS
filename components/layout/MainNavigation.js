import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NFT Market</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All NFTs</Link>
          </li>
          <li>
            <Link href='/new-nft'>Create New NFT</Link>
          </li>
          <li>
            <Link href='/my-nft'>My NFT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
