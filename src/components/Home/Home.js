import React, {Component} from 'react';


import Image from '../../img-01.png';
import FrontHeader from "../Header/FrontHeader";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    styles = {
        background:`url(${Image}) no-repeat`,
        float: "left",
        height: "100vh",
        width: "100%",
        backgroundPosition: " center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
    };

    render() {
        return (
            <div>
                <FrontHeader/>
                <div className="intro" style={this.styles}>
                </div>
            </div>
        )
    }


}

export default Home