import React, { Component, PropTypes } from 'react';
import { tr } from 'lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { year as actions } from 'actions';

class YearList extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        objects: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    state = {
        index: 0
    };

    componentWillMount() {
        const { actions } = this.props;
        actions.fetchListIfNeeded();
    }

    handleOnClick(id, i, e) {
        e.preventDefault();
        this.setState({
            index: i
        }, () => {
            const { onClick } = this.props;
            onClick(id);
        });
    }

    render() {
        const { objects, loading } = this.props;
        const { index } = this.state;

        if (loading) {
            return <div>Загрузка...</div>;
        }

        let yearNodes = objects.map((year, i) => {
            return (
                <li key={i + 1}>
                    <a href="#" className={i + 1 == index ? 'active' : ''}
                       onClick={this.handleOnClick.bind(this, year, i + 1)}>{year}</a>
                </li>
            );
        });

        return (
            <div className="filter-container">
                <p className="filter-title">{tr.t('By year')}</p>
                <ul className='filter-list'>
                    <li>
                        <a href="#" className={index == 0 ? "active" : ""} onClick={this.handleOnClick.bind(this, 0, 0)}>{tr.t('All')}</a>
                    </li>
                    {yearNodes}
                </ul>
            </div>
        );
    }
}

export default connect(state => state.year, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(YearList);