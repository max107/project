import React, { Component, PropTypes } from 'react';
import TypeList from 'components/TypeList';
import YearList from 'components/YearList';
import PortfolioList from 'containers/PortfolioList';
import _ from 'lodash';
import { tr } from 'lib';
import svg from 'components/svg';
import shallowequal from 'shallowequal';

export default class PortfolioListBase extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        objects: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            objects: props.objects
        };
    }

    state = {
        objects: [],
        type: null,
        year: null
    };

    componentWillMount() {
        const { actions, params } = this.props;
        actions.fetchList(params, data => {
            this.setState({
                objects: data.objects
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { actions, params } = nextProps;
        if (shallowequal(params, this.props.params) === false) {
            actions.fetchListIfNeeded(params, data => {
                this.setState({
                    objects: data.objects
                });
            });
        }
    }

    filterType(objects, id) {
        return id ? _.filter(objects, obj => obj.type_id == id) : objects;
    }

    filterYear(objects, year) {
        return year ? _.filter(objects, obj => moment(new Date(obj.created_at)).year() == year) : objects;
    }

    handleType(id) {
        const { objects } = this.props;
        const { current_year } = this.state;
        this.setState({
            objects: this.filterYear(this.filterType(objects, id), current_year),
            type: id
        });
    }

    handleYear(year) {
        const { objects } = this.props;
        const { type } = this.state;
        this.setState({
            objects: this.filterYear(this.filterType(objects, type), year),
            year: year
        });
    }

    renderObjects() {
        const { objects } = this.state;

        return objects.length ? <PortfolioList objects={objects}/> : (
            <div className="portfolio-empty">{tr.t('Oops. Portfolio not found or missing.')}</div>
        );
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return <div className="portfolio-loader">{svg('loader')}</div>;
        }

        return (
            <div className="portfolio-container">
                <div className="portfolio-text-container">
                    <div className="row">
                        <div className="columns small-1">&nbsp;</div>
                        <div className="columns small-10">
                            <h1 className="main-title">Портфолио</h1>
                            <p className="heading-text">
                                За все время работы у нас накопилось множество работ из различных отраслей деятельности.
                                <br/>Мы выбрали лучшие их них, достойные вашего внимания.
                            </p>
                        </div>
                        <div className="columns small-1">&nbsp;</div>
                    </div>
                </div>
                <div className="row">
                    <div className="columns small-12 medium-12 large-5">
                        <TypeList onClick={this.handleType.bind(this)}/>
                    </div>
                    <div className="columns small-12 medium-12 large-7">
                        <YearList onClick={this.handleYear.bind(this)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="columns small-12">
                        {this.renderObjects()}
                    </div>
                </div>
            </div>
        );
    }
}