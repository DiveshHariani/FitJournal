import React, { useState } from "react";
import './SignupForm.css'

const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);

    // password validation states:
    const [isLongEnough, setIsLongEnough] = useState(false);
    const [containsSpecialChar, setContainsSpecialChar] = useState(false);
    const [containsNumber, setContainsNumber] = useState(false);
    const [containsChar, setContainsChar] = useState(false);

    const submitSignUp = async (e) => {
        e.preventDefault();
        if(password === confirmPassword) {
            console.log("calling api")
            let result = await fetch("http://localhost:49954/user/user-signin", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    height: height,
                    weight: weight,
                    age: age,
                    isGoogleAuth: false
                })
            });
            let jsonResult = await result.json();
            console.log(jsonResult);
            if(jsonResult.RESULT_CODE == 0) console.log("Sign Up successful");
            else console.log("Error")
        } else {
            console.log("Password Mismatch")
        }
    }
    return (
        <div className="signup_form_container container mx-auto">
            <h3 className="text-center">Sign Up</h3>
            <form>
                <input 
                    className="form-control my-3" 
                    type="text" 
                    placeholder="Enter your name" 
                    name="name" 
                    id="signup_form_name" 
                    value={name}
                    onChange = {(e) => setName(e.target.value)} />

                <input 
                    className="form-control my-3" 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    id="signup_form_email" 
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)} />

                <input 
                    className="form-control my-3" 
                    type="password" 
                    placeholder="Password" 
                    name="pwd" 
                    id="signup_form_pwd"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)} />
                {/* <div className="container password-validation">
                    <ul>
                        <li style={isLongEnough ? {color: "green"} : {color: "red"}}>Must have atleast 8 characters</li>
                        <li>Must contain one special character from !, @, #, $, %</li>
                        <li>Must contain atleast one number</li>
                        <li>Must contain atlease one character</li>
                    </ul>
                </div> */}

                <input 
                    className="form-control my-3" 
                    type="password" 
                    placeholder="Reconfirm Password" 
                    name="pwd-reconfirm" 
                    id="signup_form_pwd-reconfirm"
                    value={confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)} />

                <div className="row my-3">
                    <div className="col-4">
                        <div className="input-group">
                            <label htmlFor="height-input" className="input-group-text">Height(cms):</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="height-input" 
                                min="0" 
                                value={height} 
                                onChange={(e) => setHeight(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group">
                            <label htmlFor="weight-input" className="input-group-text">Weight(Kgs):</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="weight-input" 
                                min="0" 
                                value={weight} 
                                onChange={(e) => setWeight(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group">
                            <label htmlFor="age-input" className="input-group-text">Age:</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="age-input" 
                                min="0" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mx-auto my-3">
                    <button id="signup_form_signup-btn" className="btn btn-primary" onClick={submitSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;