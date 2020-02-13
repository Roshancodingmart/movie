import React, { Component } from "react";
import "./table.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleCrypto from "simple-crypto-js";
import cookie from "react-cookies";
toast.configure({
  autoClose: 2000,
  draggable: true
});

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page:0,
      user:[],
      pageNumber:1,
      prevPage:0
    };
  }
color=()=>{
  this.setState({
    prevPage:this.state.pageNumber
  },()=>{
    if(this.state.prevPage!=0){
      var x=document.getElementById(this.state.pageNumber).style.backgroundColor="limegreen";
    }
  })
  var x=document.getElementById(this.state.pageNumber).style.backgroundColor="blue";
}
  decrypt = () => {
    var _secretKey = "goodmorningeveryone";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var token = cookie.load("token");
    var decipherText = simpleCrypto.decrypt(token);
    console.log("token", decipherText);
    return decipherText;
  };

  handleTable = async () => {
    if (cookie.load("token") && localStorage.getItem("priority")) {
      var token = this.decrypt();
    }

    await axios
      .get("http://localhost:3005/userTable", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      });
  };

  notify = () => {
    toast("User deleted", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  // componentWillMount = () => {
  //   this.handleTable();
  // };
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  };
  handleExcel = async () => {
    await axios({
      url: "http://localhost:3005/printExcel",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Excel.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };
  excel = async () => {
    await axios({
      url: "http://localhost:3005/excel",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Report.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };
  handlePage = async event => {
    event.preventDefault();
    let pageNo = { pg_no: this.state.page };
    console.log(this.state.page)
    await axios.post("http://localhost:3005/page", pageNo).then(response=>{
      this.setState({
        btn:response.data.length,
        data:response.data
      })
    });
    this.toStart();
  };

  handlePageNo=(event)=>{
    var pageNum=parseInt(event.target.value)
    this.setState({
      pageNumber:pageNum
    },()=>{
      this.setState({
        user:this.state.data[this.state.pageNumber-1]
      })
    })  
    this.color(); 
  }
  toStart=()=>{
    this.setState({
      user:this.state.data[0],
      pageNumber:1
    })
    this.color();
  }
  toEnd=()=>{
    this.setState({
      user:this.state.data[this.state.data.length-1],
      pageNumber:this.state.data.length
    },()=>{
      console.log(this.state.pageNumber)
    })
    this.color();
  }
  toBefore=()=>{
    if(this.state.pageNumber>1)
    {this.setState({
      user:this.state.data[this.state.pageNumber-2],
      pageNumber:this.state.pageNumber-1
    },()=>{

      console.log(this.state.data[this.state.pageNumber])
      console.log(this.state.pageNumber-1)
    })}
    this.color();
  }
  toNext=()=>{
    if(this.state.pageNumber<this.state.data.length){
      this.setState({
        user:this.state.data[this.state.pageNumber],
        pageNumber:this.state.pageNumber+1
      },()=>{
        console.log(this.state.data[this.state.pageNumber+1])
        console.log(this.state.pageNumber)
      })
    }
    this.color();
  }
  deleteUser = async event => {
    if (cookie.load("token") && localStorage.getItem("priority")) {
      var key = this.decrypt();
    }
    let user = {
      mail: event.target.id,
      name: event.target.name,
      pass: event.target.value
    };
    await axios
      .post("http://localhost:3005/deleteUser", user, {
        headers: {
          authorization: `Bearer ${key}`
        }
      })
      .then(response => {
        if (response.data == "User deleted from the database") {
          this.notify();
        }
      });
    this.handleTable();
  };
  render() {
    var token1 = "";
    var no=0;
    return (
      <>
       
        
        <div className="table-container">
        <button onClick={this.handleExcel} className="excel" style={{display:"none"}}>print</button>
          <button onClick={this.excel} className="excel">export</button>
          <table className="table">
            <thead>
              <tr>
                <th className="email">Email</th>
                <th className="name">Name</th>

                <th className="status"></th>
              </tr>
            </thead>

            {this.state.user.map((value, index) => {
              return (
                <tbody>
                  <tr>
                    <td className="uemail">{value.email}</td>
                    <td className="uname">{value.name}</td>

                    <td className="ustatus">
                      <button
                        id={value.email}
                        name={value.name}
                        value={value.password}
                        onClick={this.deleteUser}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}

            {/* <tfoot>
              <tr>
                <th className="femail" />
                <th className="name" />
                <th className="pass" />
                <th className="fstatus" />
              </tr>
            </tfoot> */}
          </table>
          <form onSubmit={this.handlePage} className="pg_input">
          <input
            type="text"
            name="page"
            value={this.state.page}
            title="no of row per table"
            onChange={this.handleChange}
          ></input>
        </form>
        <div className="page">
        <button className="pg_no" onClick={this.toStart}>&#8810;</button>
        <button className="pg_no" onClick={this.toBefore}>&#8826;</button>
        
          {
            this.state.data.map(()=>{
              no++
               return(
                 <button value={no} id={no} onClick={this.handlePageNo} className="pg_no">{no}</button>
               )
               
            })
          }
          <button className="pg_no" onClick={this.toNext}>&#8827;</button>
          <button className="pg_no" onClick={this.toEnd}>&#8811;</button>
        </div>
        </div>
      </>
    );
  }
}
