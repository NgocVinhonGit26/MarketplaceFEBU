import { signupService } from "api/auth";
import { checkEmail } from "api/auth";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { successToast } from "utilities/toast";
import { errorToast } from "utilities/toast";
import { useNavigate } from "react-router-dom";

const clientId = "753324609964-v61bfjuttptp0l40ia95p0kkpt5p0ovg.apps.googleusercontent.com"

const GGLogin = () => {
    const navigate = useNavigate();

    const isEmailAlreadyExist = async (email) => {
        try {
            const res = await checkEmail(email);
            if (res.data === true) {
                errorToast("Tài khoản này đã tồn tại hehe");
                return true
            }
            return false
        }
        catch (err) {
            console.log(err);
        }
    }

    const onSuccess = async (res) => {
        // console.log('[Login Success] currentUser:', res.profileObj);
        if (!isEmailAlreadyExist(res.profileObj.email)) {
            return
        }
        try {
            const response = await signupService(res.profileObj.name, "", res.profileObj.email, "123456", false);

            if (response?.status === 200 && response?.data?.message === "User registration was successful") {
                successToast("Đăng ký thành công !!! Quý khách vui lòng kiểm tra email để xác nhận tài khoản");
                navigate("/signin");
            }
            const auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signOut().then(
                auth2.disconnect().then(
                    console.log("Sign out success")
                )
            )
        }
        catch (err) {
            errorToast("Đăng ký không thành công !!!");
            console.log(err);
        }

    }

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
        errorToast("Login failed");
    }
    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign up with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}

            />
        </div>
    )
}

export default GGLogin;