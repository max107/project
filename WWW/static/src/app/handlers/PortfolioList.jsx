import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { portfolio as actions } from 'actions';
import PortfolioListBase from './PortfolioListBase';

class PortfolioList extends PortfolioListBase {
}

export default connect(state => {
    const { objects, loading } = state.portfolio;
    return {
        objects,
        loading
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(PortfolioList);