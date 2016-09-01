import React, { Component, PropTypes } from 'react';
import { tr } from 'lib';
import { client as actions } from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Client from 'components/Client';

class ClientList extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        objects: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    };

    componentWillMount() {
        const { actions } = this.props;
        actions.fetchListIfNeeded();
    }

    render() {
        const { objects, loading } = this.props;

        if (loading) {
            return <div>Загрузка...</div>;
        }

        let clientNodes = objects.map((model, i) => {
            return <li key={i}><Client client={model}/></li>;
        });

        return (
            <div className="clients-container">
                <div className="row">
                    <div className="columns small-12">
                        <h1>{tr.t('Our clients')}</h1>
                        <ul className="clients-list small-block-grid-2 medium-block-grid-4 large-block-grid-5">
                            {clientNodes}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    const { objects, loading } = state.client;
    return {
        objects,
        loading
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(ClientList);