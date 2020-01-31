import React, { Component } from "react";
import "./similar.css";
export default class Similar extends Component {
  constructor(props) {
    super(props);
    this.state={
        list:[]
    }
  }
  componentWillReceiveProps = () => {
    this.Fetch();
  };
  Fetch = async () => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var targetUrl =
      "https://api.themoviedb.org/3/movie/"+this.props.id+"/similar?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US&page=1";
    var url = proxyUrl + targetUrl;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data.results);
      this.setState({
        list: data.results
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <>
        <h1 style={{ color: "white" }}>Similar Movies</h1>
        {this.state.list && <div className="whole">
          { this.state.list.map((value, index) => {
            return (
              <div className="top-rated">
                <div className="select1">
                  <div className="title">
                    <h1>{value.title}</h1>
                  </div>
                  <div className="desp">
                    <div className="rate">
                      <p className="rating">Rating: </p>
                      <p style={{ color: "black" }}>/</p>
                      <p className="rating-n">{value.vote_average}/10</p>
                    </div>
                    <h3>Overview</h3>
                    <p>{value.overview}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}
      </>
    );
  }
}
