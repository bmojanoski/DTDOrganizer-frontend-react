import React, {Component} from 'react';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicks: 0
        }
    }

    handleClicks = () => {
        this.setState({clicks: this.state.clicks + 1});
        if (this.state.clicks === 2) {
            this.setState({clicks: 0});
            this.props.openAdmin();
        }
    };

    render() {
        return (

            <footer className="footer  py-1 bg-primary">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <span className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 text-small  text-white">
                            ©2020 Day to day organizer
                        </span>

                        <span className="text-white col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 text-small  "
                              onClick={(e) => this.handleClicks(e)}>
                                Click 3 times to open/close admin panel
                        </span>
                    </div>
                </div>
            </footer>

        )
    }
}

export default Footer