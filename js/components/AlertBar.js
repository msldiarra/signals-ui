import React from 'react';

export default class AlertBar extends React.Component {

    render() {

        let progressBarClass = (this.props.tank.fillingrate > 50) ?
            "progress-bar progress-bar-success" :
            (this.props.tank.fillingrate > 30) ?
                "progress-bar progress-bar-warning":
                "progress-bar progress-bar-danger";

        return (<div>
            <a className="black" href="#">
                <div>
                    <div>
                        <h5><i className="fa fa-filter"></i> {this.props.tank.tank} (<b>{this.props.tank.liquidtype}</b>) dans la station de <b>{this.props.tank.station}</b> </h5>
                    </div>
                    <div className="progress">
                        <div className={progressBarClass} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:this.props.tank.fillingrate + '%'}}>
                            <span>{this.props.tank.fillingrate}%</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>);
    }
}