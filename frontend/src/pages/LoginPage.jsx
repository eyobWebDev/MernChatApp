import {User,Mail, Loader, Eye, EyeOff ,Lock, MessageSquareText } from "lucide-react"
import {useState } from "react"
import {Axios } from "../utils/axios.js"
import {useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import {useAuthStore } from "../states/useAuthStore.jsx"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {login, isLoggingIn } = useAuthStore()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!password || !email) return toast.error("Inputs must be filled.")
        login({email, password})
    }
    
    return(
        <div className="border-s m-3 mt-32 p-2">
            <div className="header flex justify-center w-full p-4">
            <MessageSquareText />
            </div>
            <h2 className=" mt-1 text-2xl text-center">Log in below</h2>
            <h6 className=" mt-1 text-gray-600 text-center">Log in to continue using the app</h6>
            
            {/* Form below */}
            <form onSubmit={handleSubmit}>
            <div className="form flex m-10 flex-col">
            
            {/* Email input area*/}
            <label>
             <span className="label-text text-gray-300">Email</span>
            </label>
            <div className="text-gray-300 relative mb-4">
            <Mail className="absolute z-10 left-3 top-2 w-5 h-5" />
                <input
                  name="fullname"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g john@gmail.com"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            {/* Email input area End*/}
            
            {/* Password input area*/}
            <label>
             <span className="label-text text-gray-300">Password</span>
            </label>
            <div className="text-gray-300 relative mb-4">
            <Lock className="absolute z-10 left-3 top-2 w-5 h-5" />
                <input
                  name="fullname"
                  type={showPassword? "text": "password"}
                  placeholder="E.g testing321"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
                <div onClick={() => setShowPassword(!showPassword)} className="absolute z-10 right-3 top-2 w-5 h-5">
                {showPassword? <Eye className=" z-10 left-3 top-2 w-5 h-5" />: <EyeOff className=" z-10 left-3 top-2 w-5 h-5" />}
                </div>
              </div>
            {/* Password input area End*/}
            <button disabled={isLoggingIn} type="submit" className="btn w-full">
            {isLoggingIn ? <Loader className="animate-spin text-blue-500 h-6 w-6" />: "Log In"}
            </button>
            
            <div className="w-full text-gray-400 mt-4 text-center">
            Don't have an account Sign up <Link className="text-blue-600" to="/signup">Here</Link>
            </div>
            
            </div>
            </form>
            {/*form ends here */}
            
        </div>
    )
}