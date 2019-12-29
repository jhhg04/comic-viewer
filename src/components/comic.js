import React, { Component } from 'react'
import BeautyStars from 'beauty-stars';
export default class comic extends Component {

    constructor(props){
        super(props)
        this.state= {
            items: [],
            isloaded: false,
            value:0

        }
    }

    componentDidMount(){
        let aleatorio = Math.floor((Math.random() * 2247) + 1);
        fetch(`https://xkcd.now.sh/?comic=${aleatorio}`)
        .then(res => res.json())
        .then(json=>{
            this.setState({
                items:json,
                isloaded:true,
                value:0
            })
        })
    }
    onChange = (event)=>{
        this.setState({
            items:event.target.value
        })
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        fetch(`https://xkcd.now.sh/?comic=${this.state.items}`)
        .then(res => res.json())
        .then(json=>{
            this.setState({
                items:json,
                isloaded:true,
                value:0
            })
        })
    }


    handleRandom = (event) => {
        let aleatorio = Math.floor((Math.random() * 2247) + 1);
        event.preventDefault()
        fetch(`https://xkcd.now.sh/?comic=${aleatorio}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                    value:0
                })
            })
    }

    handleAfter = (event) => {
        event.preventDefault()
        fetch('https://xkcd.now.sh/?comic=' + (this.state.items.num+1))
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                    value:0
                })
            })
    }

    handleBefore = (event) => {
        event.preventDefault()
        fetch('https://xkcd.now.sh/?comic=' + (this.state.items.num-1))
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                    value:0
                })
            })
    }

    render() {
        let {items} = this.state
        return (
            <div className="container">
                <div class="container h-100">
                    <div class="row h-100 justify-content-center align-items-center">
                        <form class="form-inline my-2 my-lg-0 p-3" onSubmit={this.handleSubmit}>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.items.num} onChange={this.onChange} />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div key={items.id}>
                    <h2 className="text-center letra">{items.safe_title}</h2>
                    <img src={items.img} class="rounded mx-auto d-block" alt={items.alt} title={items.title}></img>
                </div>
                <div class="container h-100">
                    <div className = "row h-100 justify-content-center align-items-center p-2">
                    <form onSubmit={this.handleBefore}>
                        <button class="btn btn-primary my-2 my-sm-0" type="submit">Previous</button>
                    </form>
                    <form  onSubmit={this.handleRandom}>
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Random</button>
                    </form>
                    <form onSubmit={this.handleAfter}>
                        <button class="btn btn-success my-2 my-sm-0" type="submit">Next</button>
                    </form>
                    </div>
                </div>
                <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <h2>Rate this caricature...</h2>
                </div>
                <div class="row h-100 justify-content-center align-items-center">
                    <BeautyStars
                        value={this.state.value}
                        onChange={value => this.setState({ value })}
                    />
                </div>
                <div class="row h-100 justify-content-center align-items-center">
                    <h4>You rate is... {this.state.value}</h4>
                </div>
            </div>
            </div>
        )
    }
}
