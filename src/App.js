import './App.css';
import 'antd/dist/antd.css';

import {Button, Card, Col, Pagination, Rate, Row} from 'antd'
import { Radio, Tabs } from 'antd';
import React, { Component } from 'react';

const { TabPane } = Tabs;

const  BASE_URL="http://www.i2ce.in"
const numEachPage = 3
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      reviews:[],
      product:1,
      viewer:1,
      minValue: 0,
      maxValue: 3,
      showText: false,
      sortType:'asc'
    };
    this.sortedRatings =  this.sortedRatings.bind(this)
  }
 
  componentDidMount=()=> {
    fetch(`http://www.i2ce.in/reviews/${this.state.product}/${this.state.viewer}`)
      .then(res => res.json())
      .then(data => this.setState({ items:data,reviews: data.reviews}));
  }
 
  componentDidUpdate=(prevProps,prevState)=>{
    if(this.state.product !== prevState.product){
      fetch(`http://www.i2ce.in/reviews/${this.state.product}/${this.state.viewer}`)
      .then(res => res.json())
      .then(data => this.setState({ items:data,reviews: data.reviews}));
    }
    if(this.state.viewer !== prevState.viewer){
      fetch(`http://www.i2ce.in/reviews/${this.state.product}/${this.state.viewer}`)
      .then(res => res.json())
      .then(data => this.setState({ items:data,reviews: data.reviews}));
    }
  }

  handleChange=(value)=>{
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage
    });
  }
  sortedRatings =()=>{

   this.state.reviews.sort((a,b)=>{
      return a.ratings.Overall - b.ratings.Overall
    })
    console.log(this.state.reviews)
  }
  
  render(){
      const ids =[]
      
      const arrayIds =()=>{
        for(var i = 1; i < 20+1; i++){
          ids.push(i)
        }
      }     

    
      arrayIds()
    return (

          <div className="App" style={{textAlign:"left",padding:"10px"}} >
          
          <Card className="cardMain" bordered={false} title={<div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
            <div>Product no. {this.state.items.product_id}</div>
            <div>{ids.slice(0,10).map((id,key)=>(
              <Button style={{marginLeft:"5px"}} className="prods" type="primary" shape="circle" key={key}  onClick={()=>this.setState({viewer:id})}>
                <p>{id}</p>
              </Button>
            ))}</div>
            </div>}>
            <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>

                <Button type="primary" onClick={this.sortedRatings}> sort by overall rating</Button> &nbsp;
                <Button type="primary">sort by usefulness</Button>

            </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"20px"}}>
              {this.state.reviews && this.state.reviews.slice(this.state.minValue, this.state.maxValue).map((review,key)=>(
                <Card key={key} bordered={false} className="cardInner" style={{marginBottom:"10px",marginRight:"10px"}}>
                    <b>Reviewer's Name</b> - {review.reviewer.name}<br/>
                    <b>Comment</b> - {review.comment}<br/>
                    <b>Usefullness</b> - {review.usefulness}<br/>
                    <b>Rating(overall)</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.Overall} /><br/>
                    {this.state.showText===false && <a style={{cursor:"pointer"}} onClick={() => this.setState({ showText: !this.state.showText })}>more....</a>}
                    {this.state.showText===true && (<div>
                    <b>delivery_time</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled defaultValue={review.ratings.delivery_time} />
                      <b>discounts_and_offers</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.discounts_and_offers} />
                      <b>matches_description</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.matches_description} />
                      <b>matches_phot</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.matches_phot} /><br/>
                      <b>packaging</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.packaging} /><br/>
                      <b>price</b> - <Rate style={{color:"black",fontSize:"0.8rem"}} allowHalf disabled value={review.ratings.price} />
                      <a style={{cursor:"pointer"}} onClick={() => this.setState({ showText: !this.state.showText })}><br/>collapse....</a>
                      </div>)}
                </Card>
              ))}
          </div>
          <div style={{width:"100%",textAlign:"center"}}>
            <Pagination onChange={this.handleChange} defaultPageSize={numEachPage} defaultCurrent={1} total={this.state.items.reviews && this.state.items.reviews.length}/>
          </div>
        </Card>
        <div style={{width:"100%",display:"flex",justifyContent:"space-between",padding:"20px"}}>
              {ids.map((id,key)=>(
                <Button className="prods" type="primary" shape="circle" key={key}  onClick={()=>this.setState({product:id})}>
                  <p>{id}</p>
                </Button>
              ))}
          </div>
          </div>
    )
  }
  
}


