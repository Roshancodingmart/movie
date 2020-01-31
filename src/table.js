import React, { Component } from "react";
import axios from "axios"
const jwt = require("jsonwebtoken");

export default class Table extends Component {
  constructor(props){
    super(props)
    this.state={
    data:[]
    }
  }
  handleTable=async()=>{
    console.log("inside table")
    await axios.post("http://localhost:3005/userTable").then(response=>{
      console.log(response.data)
      this.setState({
        data:response.data
      })
    });
  }
 
  componentWillMount=()=>{
    this.handleTable()
  }

  componentWillReceiveProps=()=>{
    this.handleTable()
  }
  deleteUser=async(event)=>{
    console.log(event.target.id)
    let user ={mail:event.target.id}
    await axios.post("http://localhost:3005/deleteUser", user).then(response=>{
      alert(response.data)
    })
    this.handleTable();
  }
  render() {
    return (
      <>
      <p>{this.props.show}</p>
         <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="email">Email</th>
                <th className="name">Name</th>
                <th className="pass">Password</th>
                <th className="status">Delete</th>
              </tr>
            </thead>
            
            {this.state.data.map((value,index)=>{ 
              return(
              <tbody>
              <tr>
                <td className="uemail">{value.email}</td>
                <td className="uname">{value.name}</td>
                <td className="upass">{value.password}</td>
                <td className="ustatus"><button id={value.email} onClick={this.deleteUser}>X</button></td>
              </tr>
              </tbody>)
            })}
            
            <tfoot>
              <tr>
                <th className="femail" />
                <th className="name" />
                <th className="pass" />
                <th className="fstatus" />
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    );
  }
}
