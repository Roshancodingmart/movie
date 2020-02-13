import React, { Component } from 'react'
import "./expire.css"
export default class Expire extends Component {
    render() {
        return (
            <div className="expire">
                <span style={{color:"red"}}>Link Expired!</span>
                <br/>
                <span>Create new link to change password.</span>
                <br/>
                <span>To Create new link click <a href="http://localhost:3000/send">here</a></span>
            </div>
        )
    }
}
