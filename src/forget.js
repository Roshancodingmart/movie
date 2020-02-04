import React, { Component } from 'react'
import "./forget.css"
import otpGenerator from "otp-generator"
export default class Forget extends Component {
    constructor(){
        super()
        this.state={}
    }
    handleOtp=()=>{
        alert(otpGenerator.generate(4, { alphabets:false, upperCase: false, specialChars: false }))
        
    }
    render() {
        return (
            <div className="forget-div">
                <a href="/" onClick={this.handleOtp}>Forget password?</a>
            </div>
        )
    }
}
