import Header from "./header";
import Sidebar from "./Sidebar";
import Data from "./Data"
import { useState } from "react";
import {auth, provider} from "./firebase"

function App() {
    const [user, setUser] = useState(null)

    const signIn=()=>{
        auth.signInWithPopup(provider).then(({user})=>{
            setUser(user)
        }).catch(error=>{
            alert(error.message)
        })
    }
    return (
        <>
        {
            user ? (
                <>
                    <Header photoURL={user.photoURL} />
                    <div className="app">
                    <Sidebar />
                    <Data />
                    </div>
                </>
            ):(
                <div className="loginWrap">
                    <img src="https://play-lh.googleusercontent.com/t-juVwXA8lDAk8uQ2L6d6K83jpgQoqmK1icB_l9yvhIAQ2QT_1XbRwg5IpY08906qEw" />
                    <button onClick={signIn}>Login to Google Drive Clone</button>
                </div>
            )
        }
        </>
    )
}

export default App;