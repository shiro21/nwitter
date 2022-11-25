import { useState } from "react";
import { getDownloadURL, ref as fbRef, uploadString } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from "fbase";

const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            const fileRef = fbRef(storage, `${userObj.uid}/${uuidv4()}`);

            let fileUrl = "";
            
            if (attachment !== "") {
                const fileUpload = await uploadString(fileRef, attachment, 'data_url');
                fileUrl = await getDownloadURL(fileUpload.ref);
            }

            const nweetItem = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                fileUrl: fileUrl
            };

            await addDoc(collection(db, "nweets"), nweetItem);

            setNweet('');
            setAttachment(null);
        } catch(error) {
            console.log(error);
        }
    };

    const onChange = (e) => {
        const { target: { value }} = e;

        setNweet(value);
    };
    const onFileChange = (e) => {
        console.log(e);
        const { target: { files }} = e;

        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result }} = finishedEvent;
            setAttachment(result);
        }
        if (e.target.files[0]) reader.readAsDataURL(oneFile);
    };

    const onClearAttachment = () => setAttachment(null);

    return (
        <form onSubmit={onSubmit} className="nweet_factory_form">
            <input type="text" value={nweet} onChange={onChange} placeholder="Mind?" maxLength={120} />
            <div className="input_wrap">
                <div className="image_add">
                    이미지 추가
                    <input type="file" onChange={onFileChange} accept="image/*" />
                </div>
                {
                    attachment && (
                        <>
                            <div className="preview">
                                <img src={attachment} alt="이미지" width="50px" height="50px" />
                            </div>
                            <button onClick={onClearAttachment}>clear</button>
                        </>
                    )
                }
            </div>
            <input type="submit" className="main_color" value="Nweet" />
        </form>
    );
};

export default NweetFactory;