import React, { useEffect, useState } from "react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([]);
    
    // forEach 방법
    // const getNweets = async () => {
    //     const q = query(collection(db, "nweets"));
    //     const dbNweets = await getDocs(q);

    //     dbNweets.forEach((doc) => {
    //         const nweetObject = {
    //             ...doc.data(),
    //             id: doc.id
    //         }
    //         setNweets(prev => [nweetObject, ...prev]);
    //     })
    // };

    useEffect(() => {
        // 실시간 데이터 생성 ( onSnapshot = DB에 무슨일이 있을 때, 알림을 받는다. )
        const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));

        onSnapshot(q, (snap) => {
            const nweetArray = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, [])


    return (
        <div id="home_page">
            <NweetFactory userObj={userObj} />
            <div className="nweets_item">
                {
                    nweets.map((item) => (
                        <Nweet key={item.id} nweetObj={item} isOwner={item.creatorId === userObj.uid} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;