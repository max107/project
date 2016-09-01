import React, { Component, PropTypes } from 'react';
import { Link } from 'react-easy-router';
import PortfolioWorkers from 'components/PortfolioWorkers';
import SocialLikes from 'components/SocialLikes';
import svg from 'components/svg';
import { tr } from 'lib';
import { portfolio as actions } from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PortfolioView extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        portfolio: PropTypes.object
    };

    componentWillMount() {
        const { actions, params } = this.props;
        actions.fetchViewIfNeeded(params.slug);
    }

    componentWillReceiveProps(nextProps) {
        const { actions, params } = nextProps;
        if (params.slug != this.props.params.slug) {
            actions.fetchViewIfNeeded(params.slug);
        }
    }

    renderNext() {
        const { next } = this.props.portfolio;
        return next ? (
            <Link to="PortfolioView" params={{slug: next.slug}}
                  title={tr.ta(next, 'name')} className="portfolio-next-work">
                <span className="hide-for-small-only">{tr.t('Next work')}</span>
                {svg('arrow-right')}
            </Link>
        ) : null;
    }

    renderPrev() {
        const { prev } = this.props.portfolio;
        return prev ? (
            <Link to="PortfolioView" params={{slug: prev.slug}}
                  title={tr.ta(prev, 'name')} className="portfolio-prev-work">
                {svg('arrow-left')}
                <span className="hide-for-small-only">{tr.t('Prev work')}</span>
            </Link>
        ) : <span dangerouslySetInnerHTML={{__html: '&nbsp;'}}/>;
    }

    renderFavicon() {
        const { portfolio } = this.props;

        return Object.keys(portfolio.favicon).length ? (
            <a href={portfolio.url} className="portfolio-view-url" target="_blank">
                <img alt={tr.ta(portfolio, 'name')} src={portfolio.favicon.original} />
                {tr.ta(portfolio, 'name')}
            </a>
        ) : <span dangerouslySetInnerHTML={{__html: '&nbsp;'}}/>;
    }

    renderSocialShare() {
        return false ? (
            <div className="portfolio-view-share">
                <p className="portfolio-view-share-title">{tr.t('Share')}:</p>
                <SocialLikes />
            </div>
        ) : null;
    }

    render() {
        const { loading, portfolio } = this.props;

        if (loading || !portfolio) {
            return <div>Загрузка...</div>;
        }

        let clientContent = Object.keys(portfolio.client).length > 0 ? {
                __html: "<strong>" + tr.t('About client') + ":</strong> " + tr.ta(portfolio.client, 'content')
            } : null,
            taskContent = {
                __html: "<strong>" + tr.t('Task') + ":</strong> " + tr.ta(portfolio, 'task')
            };

        return (
            <div className="portfolio-view-container">
                <div className="row">
                    <div className="columns medium-1 hide-for-small-only">
                        <Link to="PortfolioList" className="page-back" rel="tooltip" title={tr.t('Back to portfolio')}>{svg('left')}</Link>
                    </div>
                    <div className="columns small-12 medium-11">
                        <div className="portfolio-view">
                            <h1>{tr.ta(portfolio, 'name')}</h1>
                            <div className="row">
                                <div className="columns small-12 medium-8">
                                    <p className="portfolio-view-group">{tr.ta(portfolio.group, 'name')}</p>
                                    <div className="portfolio-view-client" dangerouslySetInnerHTML={clientContent}></div>
                                    <div className="portfolio-view-task" dangerouslySetInnerHTML={taskContent}></div>
                                </div>
                                <div className="columns small-12 medium-4">
                                    {this.renderFavicon()}

                                    {this.renderSocialShare()}
                                </div>
                            </div>
                            <div className="portfolio-view-content" dangerouslySetInnerHTML={{__html: tr.ta(portfolio, 'content')}}></div>
                            <div className="portfolio-view-people">
                                <div className="team-container" id="team">
                                    <h3>{tr.t('Creative team')}:</h3>
                                    <PortfolioWorkers objects={portfolio.workers} workers_through={portfolio.workers_through} />
                                </div>
                            </div>
                            <div className="portfolio-view-nav">
                                <div className="row">
                                    <div className="columns small-3 left-side">
                                        {this.renderPrev()}
                                    </div>
                                    <div className="columns small-6 center-side">
                                        <Link to="PortfolioList" rel="tooltip" title={tr.t('Back to portfolio')}>
                                            {svg('mobile-menu')}
                                        </Link>
                                    </div>
                                    <div className="columns small-3 right-side">
                                        {this.renderNext()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => {
    const { loading, view } = state.portfolio.view;
    return {
        loading,
        portfolio: view[props.params.slug]
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(PortfolioView);