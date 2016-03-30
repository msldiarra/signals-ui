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
                        <h5><i className="fa fa-filter"></i> Cuve {this.props.tank.liquidtype} {this.props.tank.tank} dans la station de {this.props.tank.station} </h5>
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