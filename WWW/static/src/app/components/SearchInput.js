import React, { Component } from 'react';

export default class SearchComponent extends Component {
    static defaultProps = {
        placeholder: "",
        callback: value => {

        }
    };

    changeHandler(e) {
        var value = e.target.value;
        this.props.callback(value.length == 0 ? null : value);
    }

    render() {
        return <input
            type="search"
            onChange={this.changeHandler.bind(this)} placeholder={this.props.placeholder}/>;
    }
}
