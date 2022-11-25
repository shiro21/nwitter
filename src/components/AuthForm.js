import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "fbase";

const AuthForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [err, setErr] = useState('');

    const toggleAccount = () => setNewAccount(prev => !prev);

    const onChange = (e) => {
        const { target: {name, value}} = e;

        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let data;

        try {
            if(newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password)
            }
            else {
                data = await signInWithEmailAndPassword(auth, email, password)
            }
        } catch(error) {
            setErr(error.message);
            if (error.message === "Firebase: Error (auth/invalid-email).") setErr('비밀번호를 6자 이상 입력해주세요.');
            else if (error.message === "Firebase: Error (auth/email-already-in-use).") setErr('이메일이 존재합니다.');
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} className="auth_form">
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />

                <input type="submit" className="main_color" value={newAccount ? "Create Account" : "Sign In"} />
                <div className="danger_color">
                    {err}
                </div>
            </form>
            <div className="sign_form" onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</div>
        </>
    );
};

export default AuthForm;