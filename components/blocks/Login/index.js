import RegHeader from "../Signup/RegHeader";
import LoginForm from "./login";

const Login = ({ setUser, sarabun }) => {
    const ctaCnt = "Create an Account";
    const url = 'signup';
    const ctaData = {
        login_text: 'Login'
    }

    return (
        <div className="user_reg login">
            <div className="section_padding">
                <div className="main_container">
                    <div className="user_reg_inner">
                        <RegHeader ctaCnt={ctaCnt} url={url} />
                        <LoginForm redirectTo={`/customer/account`} ctaData={ctaData} setUser={setUser} sarabun={sarabun}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;