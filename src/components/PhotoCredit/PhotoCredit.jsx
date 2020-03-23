import React, { Component } from "react";
import "./PhotoCredit.css";

class PhotoCredit extends Component {
    render (){
        const {credit} = this.props;
        if(credit){
            return(
            <div>Photo by {credit}</div>
            )
        }
        return null;
    }
}

export default PhotoCredit;