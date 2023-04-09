import React from "react";
import './ThirdPartyAuth.css'

export default function ThirdPartyAuth() {
    return (
        <div className="icon_container">
            <div className="row my-2 mx-2">
                <div className="col-4">
                    <img className="icon" src="./google-icon.webp" alt="Google Logo"/>
                </div>
                <div className="col-4">
                    <img className="icon" src="./twitter-icon.png" alt="Twitter Logo"/>
                </div>
                <div className="col-4">
                    <img className="icon" src="./facebook-icon.png" alt="Facebook Logo"/>
                </div>
            </div>
        </div>
    )
}