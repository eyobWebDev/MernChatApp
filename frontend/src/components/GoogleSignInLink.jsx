
const GOOGLE_CLIENT_ID ="362947800165-3lelo0t1hgkp33hlqm648sfs7t3aao3r.apps.googleusercontent.com"
const API_BASE_URL = "http://localhost:5001"

export default function GoogleSignInLink() {

    const GoogleLogin = () => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
        const redirect_uri = `${API_BASE_URL}/api/auth/google/login`
        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(" ")

        const params = {
            response_type: 'code',
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri,
            prompt: 'select_account',
            access_type: 'offline',
            scope 
        }

        const urlParams = new URLSearchParams(params).toString()
        window.location = `${googleAuthUrl}?${urlParams}`
        console.log("redirect...", `${googleAuthUrl}?${urlParams}`);
        
    }

    return<div className="m-1 block">
        <button onClick={GoogleLogin} className="btn w-full mt-1.5 mb-1.5">Log in with Google</button>
    </div>
}