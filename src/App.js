import React, { Component } from "react";
import Comic from "./components/comic";
import Navbar from "./components/navbar";
import Footer from './components/footer'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Comic />
        <Footer/>
      </div>
    );
  }
}
