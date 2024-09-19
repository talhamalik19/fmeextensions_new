import RegHeader from "./RegHeader";
import SignupForm from "./SignupForm";

const Signup = ({ setUser, sarabun }) => {
    const ctaCnt = "Log In";
    const url = 'login';

    const ctaData = {
        create_account_text:'Create an Account',
        info_text:'Personal Information',
        process_text: 'Once you make an account on FME extensions your checkout process will be much faster. It will also enable you to create wish lists while keeping track of all your orders through your account.'
    }
    return (
        <div className="user_reg">
            <div className="section_padding">
                <div className="main_container">
                    <div className="user_reg_inner">
                        <RegHeader ctaCnt={ctaCnt} url={url} />
                        <SignupForm ctaData={ctaData} redirectTo={`/`} setUser={setUser} sarabun={sarabun}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;