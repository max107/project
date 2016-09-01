import ClientList from 'containers/ClientList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { client as actions } from 'actions';

export default connect(state => state.client, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(ClientList);