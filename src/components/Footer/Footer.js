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
            <footer className="footer mt-auto py-1 bg-primary">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6 text-small text-left text-white">
                            © 2020 Day to day organizer All Rights Reserved
                        </div>
                        <div className="col-6 text-right">
                            <button type={"button"} className={"btn btn-primary text-white"}
                                    onClick={(e) => this.handleClicks(e)}>Click 3 times to open/close admin panel
                            </button>
                        </div>

                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer