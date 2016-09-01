import React, { Component } from 'react';
import { tr } from 'lib';

export default class Worker extends Component {
    static defaultProps = {
        worker: {},
        through: {}
    };

    state = {
        cls: false
    };

    handleMouseEnter(e) {
        this.setState({
            cls: true
        });
    }

    handleMouseLeave(e) {
        setTimeout(() => {
            this.setState({
                cls: false
            });
        }, 400);
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        const { worker, through } = this.props;
        const { cls } = this.state;

        return (
            <li>
                <p className={"animation-flip" + (cls ? " on" : "")}
                    onClick={this.handleClick.bind(this)}
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)}>
                    <img className="normal" src={worker.avatar.thumb} alt="" />
                    <img className="hover" src={worker.avatar_hover.thumb} alt="" />
                    <img className="normal_retina" src={worker.avatar.thumb_retina} alt="" />
                    <img className="hover_retina" src={worker.avatar_hover.thumb_retina} alt="" />
                </p>
                <p>{tr.ta(worker, 'name')}</p>
                <p className="post">{Object.keys(through).length ? tr.ta(through, 'description') : tr.ta(worker, 'role')}</p>
                <p className="clear"></p>
            </li>
        );
    }
}
