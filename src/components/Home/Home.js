import React, {Component} from 'react';
import FrontHeader from "../Header/FrontHeader";

class Home extends Component {
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