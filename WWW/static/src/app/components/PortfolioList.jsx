import React, { PropTypes } from 'react';
import PortfolioList from 'containers/PortfolioList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { portfolio as actions } from 'actions';
import _ from 'lodash';

class PortfolioListComponent extends PortfolioList {
    static propTypes = {
        actions: PropTypes.object.isRequired
    };

    componentWillMount() {
        const { actions } = this.props;
        actions.fetchListIfNeeded();
    }
}

export default connect((state, props) => {
    const { objects, loading } = state.portfolio;
    const { is_support } = props;
    return {
        objects: is_support ? _.filter(objects, obj => obj.is_support) : objects,
        loading
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(PortfolioListComponent);