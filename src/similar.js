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
        <span className="genre">Similar Movies</span>
        {this.state.list && <div className="whole">
          { this.state.list.map((value, index) => {
            return (
              <div className="top-rated">
                <div className="select1">
                  <div className="title">
                    <span className="heading">{value.title}</span>
                  </div>
                  <div className="desp">
                    <div className="rate">
                      <span className="rating">Rating: </span>
                      <span style={{ color: "black" }}>/</span>
                      <span className="rating-n">{value.vote_average}/10</span>
                    </div>
                    <span className="overview">Overview</span>
                    <span>{value.overview}</span>
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
