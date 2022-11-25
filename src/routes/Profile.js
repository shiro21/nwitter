import { auth, db } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {

    const navigation = useNavigate();
    const user = auth.currentUser;

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const getMyNweets = async () => {
        const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"), where("creatorId", "==", userObj.uid));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log(doc.data());
        })
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    const onChange = (e) => {
        const { target: { value }} = e;
        setNewDisplayName(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            console.log(userObj.displayName)
            console.log(newDisplayName)
            await updateProfile(user, { displayName: newDisplayName });
            refreshUser();
        }

    }

    const onLogOutClick = () => {
        auth.signOut();
        navigation("/");
    }

    return (
        <>
            <form onSubmit={onSubmit} className="profile_form">
                <input type="text" onChange={onChange} value={newDisplayName} placeholder="Display Name" />
                <input type="submit" className="main_color" value="Update Profile" />
                <button onClick={onLogOutClick}>Log Out</button>
            </form>
        </>
    );
};

export default Profile;