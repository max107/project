import React, { Component, PropTypes } from 'react';
import { blog as actions } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Blog extends Component {
    render() {
        return (
            <div>123</div>
        );
    }
}

export default connect(state => {
    return {};
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(Blog);