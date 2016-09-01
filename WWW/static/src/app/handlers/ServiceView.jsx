import React, { Component, PropTypes } from 'react';
import { Link } from 'react-easy-router';
import NotFound from './NotFound';
import { tr } from 'lib';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { service as actions } from 'actions';
import svg from 'components/svg';
import RequestForm from 'components/RequestForm';
import PortfolioList from 'components/PortfolioList';

class ServiceView extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        service: PropTypes.object
    };

    componentWillMount() {
        const { actions, params } = this.props;
        actions.fetchViewIfNeeded(params.slug);
    }

    render() {
        const { loading, service } = this.props;

        if (loading || !service) {
            return <div>Загрузка...</div>;
        }

        let placeholder;
        switch (service.slug) {
            case "mobile":
                placeholder = "Добрый день. Для нашей компании требуется мобильное приложение.";
                break;
            case "design":
                placeholder = "Добрый день. Для нашей компании требуется разработка дизайн проекта.";
                break;
            case "web-development":
                placeholder = "Добрый день. Для нашей компании требуется разработка сайта.";
                break;
            case "support":
                placeholder = "Добрый день. Для нашей компании требуется техническая поддержка сайта.";
                break;
            case "content":
                placeholder = "Добрый день. Для нашей компании требуется контентное сопровождение сайта.";
                break;
            case "other":
                placeholder = "Добрый день. Для нашей компании требуется аудит сайта или разработка приложения сайта.";
                break;
        }

        return (
            <div className="services-page-container">
                <div className="row">
                    <div className="columns medium-1 hide-for-small-only">
                        <Link to="ServiceList" className="page-back" rel="tooltip"
                              title={tr.t('Back to services')}>{svg('left')}</Link>
                    </div>
                    <div className="columns small-12 medium-11">
                        <div className="service-page">
                            <h1>{tr.ta(service, 'name')}</h1>
                            <div className="service-page-content"
                                 dangerouslySetInnerHTML={{__html: tr.ta(service, 'content')}}></div>
                        </div>
                    </div>
                    <div className="columns small-12">
                        <p className="title-separator">
                            <span>{tr.t('Feedback')}</span>
                        </p>
                        <RequestForm placeholder={placeholder} />
                    </div>
                    <div className="columns small-12">
                        <p className="title-separator">
                            <span>{tr.t('Portfolio')}</span>
                        </p>
                        <PortfolioList limit={4} random={true} />
                        <p className="text-center">
                            <Link to="PortfolioList" className="button show-portfolio">{tr.t('See portfolio')}</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => {
    const { loading, view } = state.service.view;
    return {
        loading,
        service: view[props.params.url]
    };
}, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(ServiceView);