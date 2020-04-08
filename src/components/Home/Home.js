import React, {Component} from 'react';
import FrontHeader from "../Header/FrontHeader";

class Home extends Component {

    styles = {
        background:`url(https://i.ibb.co/zJ2fjTz/img-01.png) no-repeat`,
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