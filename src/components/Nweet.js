import { db, storage } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref as fbRef } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까 ?");
        // 삭제
        if (ok) {
            await deleteDoc(doc(db, "nweets", nweetObj.id));
            await deleteObject(fbRef(storage, nweetObj.fileUrl));
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);

    const onChange = (e) => {
        const { target: { value }} = e;
        setNewNweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(nweetObj, newNweet);
        await updateDoc(doc(db, "nweets", nweetObj.id), {
            text: newNweet
        });
        setEditing(false);
    }

    return (
        <div className="nweets">
            {
                editing ? (
                    <>
                        {
                            isOwner && (
                                <div className="update_form_wrap">
                                    <form onSubmit={onSubmit} className="update_form">
                                        <input type="text" value={newNweet} onChange={onChange} placeholder="edit mind" required />
                                        <input type="submit" className="main_color" value="Update" />
                                        <button onClick={toggleEditing} className="danger_color">Cancel</button>
                                    </form>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {
                            nweetObj.fileUrl && <img src={nweetObj.fileUrl} alt={nweetObj.text} width="50px" height="50px" />
                        }
                        {
                            isOwner && (
                                <div className="owner_button">
                                    <button onClick={onDeleteClick}>Delete</button>
                                    <button onClick={toggleEditing}>Edit</button>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default Nweet;