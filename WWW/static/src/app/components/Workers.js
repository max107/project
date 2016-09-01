import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Worker from './Worker';
import { worker as actions } from 'actions';

class Workers extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        objects: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        workers: [],
        workers_through: {},
        extra: null
    };

    componentWillMount() {
        const { actions } = this.props;
        actions.fetchListIfNeeded();
    }

    render() {
        const { loading, objects, extra } = this.props;

        if (loading) {
            return (
                <div>Загрузка...</div>
            );
        }

        let workerNodes = objects.map((worker, i) => {
            return <Worker key={i} worker={worker}
                           through={this.props.workers_through[worker.id]}/>;
        });

        return (
            <ul className="team-list">
                {workerNodes}
                {extra}
            </ul>
        );
    }
}

export default connect(state => {
    const { objects, loading } = state.worker;
    return {
        objects,
        loading
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(Workers);
