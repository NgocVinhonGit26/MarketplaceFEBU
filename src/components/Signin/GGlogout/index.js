const { GoogleLogout } = require("react-google-login")

const clientId = "753324609964-v61bfjuttptp0l40ia95p0kkpt5p0ovg.apps.googleusercontent.com"

const GGLogout = () => {
    return (
        <div id='signOutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={() => console.log('Logout Success')}
            />
        </div>
    )
}

export default GGLogout;