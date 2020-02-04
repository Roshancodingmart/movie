import React, { Component } from "react";
import "./movie.css"
import List from "./list"
import Similar from "./similar";
export default class Movie extends Component {
  constructor() {
    super();
    this.state={
        id:"",
        title:"",
        overview:"",
        rating:"",
        genre:[],
        runtime:0
    }
  }
  Fetch = async (event) => {
      var movie = event.target.value
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var targetUrl = "https://www.themoviedb.org/search/trending?language=en-US&query="+movie;
    var url = proxyUrl + targetUrl;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data",data.results[0].id)
      this.setState({
          id:data.results[0].id,
      },async ()=>{
          var target="https://api.themoviedb.org/3/movie/"+this.state.id+"?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US"
        url=proxyUrl+target
        try{
            const res = await fetch(url);
            const data2 = await res.json();
            console.log("data2",data2.genres) 
            this.setState({
                title:data2.title,
                overview:data2.overview,
                rating:data2.vote_average,
                genre:data2.genres,
                runtime:data2.runtime/60
            })
        }
        catch(error){
            console.log(error)
        }
      })
      
    }
    catch (error){
        console.log(error)
    }
  }
  render() {
    return (
      <>
      <div className="input-container">
          <input type="text" placeholder="Enter a movie to search..." className="movie-input" onChange={this.Fetch}/>
      </div>
        {this.state.id && <div className="select">
            <div className="title">
                <span className="heading">{this.state.title}</span>
                
                
            </div>
            <div className="desp">
            <span className="rating">Rating: </span>
            <span className="rating-n">{this.state.rating}/10</span>
                <span className="duration">{this.state.runtime}hrs</span>
            <span className="">Overview</span>
                <span>{this.state.overview}</span>
                {
                    this.state.genre&&
                    this.state.genre.map((value,index)=>{
                        return(
                            <button className="tags">{value.name}</button>
                    )
                    })
                }
            </div>
        </div>}
        {this.state.id && <Similar id={this.state.id}/>}
        <List/>
      </>
    );
  }
}
