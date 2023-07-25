import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import NweetFactory from 'components/NweetFactory';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService
      .collection('nweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshop) => {
        const nweetAry = snapshop.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetAry);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
