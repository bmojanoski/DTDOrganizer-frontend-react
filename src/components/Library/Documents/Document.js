import React from 'react';
import "./documentCard.css"



class Document extends React.Component {


    render() {
        return (
            <div>
                <div className="movie-card">
                    <a className="text-reset" href={this.props.document.link} target="_blank" rel="noopener noreferrer">
                        <div className="movie-header movie-photo">
                            <div className="header-icon-container">
                            </div>
                        </div>
                    </a>

                    <div className="movie-content">
                        <div className="movie-content-header">
                            <h1 className="movie-title text-left">{this.props.document.document_name}</h1>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


};

export default Document;




