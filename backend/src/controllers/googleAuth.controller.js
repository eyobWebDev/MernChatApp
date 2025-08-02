import User from "../models/user.model.js"
import axios, { Axios } from "axios"
import { config } from "dotenv"
import { generateToken } from "../lib/utils.js"

config()

const BASE_API_URL = "http://localhost:5001"
const GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_USER_INFO_URL = "https://wwww.googleapis.com/oauth2/v3/userinfo"

export const googleAuth = async (req, res) => {
    const code = req.query.code
    console.log("code", code);
    
    try {
        if(!code) return res.status(400).json({message : "Bad request."})
        console.log("getting user data...");
        const userData = await getGoogleUserData(code) 
        console.log("gettting User data done");
        
        console.log("fininding xisting user...");
        
        const user = await User.findOne({email: userData.email})
        if(user) {
            console.log("got existing uset");
            console.log("generating jwt token...");
            
            generateToken(user._id, res);
            console.log("jwt token generated.");

           res.redirect(`${BASE_API_URL}/api/auth/google/login/redirect`)
            console.log("user redirected.");
           
            
        }
            console.log("couldn't find existing user");
        console.log("creating new user...");

        const newUser = new User({
            fullName: `${userData.given_name} ${userData.last_name}`,
            email: userData.email,
        })
        if (newUser) {
            console.log("new user created");
            
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
            console.log("generated token and saved user redirecting...");
            
            res.redirect(`${BASE_API_URL}/api/auth/google/login/redirect`)
        } else {
            res.status(400).json({message: "Invalid credentials."})
        }
    } catch (e) {
       console.log("Error in Get Google Authorization code controller", e)
        res.status(500).json({message: "Internal server error."}) 
    }
}


export const setUserAndRedirect = async (req, res) => {
    try {
        res.redirect(`http://localhost:5173`)
    } catch (e) {
        console.log("Error in redirect controller", e)
        res.status(500).json({message: "Internal server error."}) 
    }

}

const getGoogleUserData = async (code) => {
    console.log("using code to get acces token...");
    const redirect_uri = `${BASE_API_URL}/api/auth/google/login`
    const access_token = await getAccesToken(code, redirect_uri)
    if(!access_token) return console.log("no valid acces-token");
    
    console.log("access token got.");
    
    console.log("getting user info...");
    const res = await axios.get(`${GOOGLE_USER_INFO_URL}?access_token=${access_token}`)
    console.log("info gotten.");
        
    return res.data

}

const getAccesToken = async (code, redirecr_uri) => {
    
    try {
        console.log("preparing data...");
        
        const data = {
            'code': code,
            'client_id': process.env.GOOGLE_CLIENT_ID,
            'client_secret': process.env.GOOGLE_CLIENT_SECRET,
            'redirect_uri': redirecr_uri,
            'grant_type': 'authorization_code'
        }
        const params = new URLSearchParams(data)
        console.log("obtainong acces token...");
        
        const response = await axios.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
        console.log("accesss token obtained");

        return response.data.access_token
            
    } catch (e) {
        console.log("Error in getting access token", e)
    }

}