import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

    // social
    const onSocialClick = async (e) => {
        const { target: {name}} = e;

        let provider;

        if (name === "google") provider = new GoogleAuthProvider();
        else if (name === "github") provider = new GithubAuthProvider();

        const data = await signInWithPopup(auth, provider);

        console.log(data);
    };

    return (
        <div id="auth_page">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: "1rem", position: "relative", left: "50%" }} />
            <AuthForm />
            <div className="auth_sign_box">
                <button onClick={onSocialClick} name="google">Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button onClick={onSocialClick} name="github">Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    );
};

export default Auth;