import React, { useState } from "react";
import './LoginForm.css'

import ThirdPartyAuth from "../ThirdPartyAuth/ThirdPartyAuth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div id="login_form_container" className="container mx-auto">
            <h3 className="mx-auto text-center">Login</h3>
            <form>
                <div className="row my-2 g-1">
                    <input  type="email"
                            className="form-control" 
                            name="email" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="row my-2 g-1">
                    <input  type="password" 
                            className="form-control" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="row my-2 g-1">
                    <button className="btn btn-primary" type="button">Sign In</button>
                </div>
                <p>Dont Have an account? <a href="/">Create Account</a></p>
                <hr />
                <ThirdPartyAuth />
            </form>
        </div>
    )
}