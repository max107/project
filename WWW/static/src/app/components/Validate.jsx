import React, { Component, PropTypes } from 'react';

export default class Validate extends Component {
    static propTypes = {
        errors: PropTypes.oneOfType([
            PropTypes.object,
            // empty array in php received from backend decoded as array
            PropTypes.array
        ]),
        name: PropTypes.string.isRequired,
        className: PropTypes.string
    };

    static defaultProps = {
        name: '',
        errors: {},
        className: 'errors'
    };

    renderErrors() {
        let errors = this.props.errors[this.props.name],
            errorNodes = errors.map((error, i) => {
                return <li key={error + '__' + i}>{error}</li>
            });

        return <ul className={this.props.className}>{errorNodes}</ul>
    }

    render() {
        const { name, errors } = this.props;
        return name in errors ? this.renderErrors() : null;
    }
}