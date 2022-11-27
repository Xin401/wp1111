import AppTitle from "../components/Title"
import LogIn from "../components/Login"
import { useChat } from "./hooks/useChat";

const SignIn = () => {
    const { setMe, setSignedIn, displayStatus, me } = useChat();
    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else {
            setSignedIn(true);
        }
    }
    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn;