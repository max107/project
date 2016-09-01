import React, { Component, PropTypes } from 'react';
import { Link } from 'react-easy-router';
import { tr } from 'lib';
import { connect } from 'react-redux';

class HeaderMenu extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        mobile: PropTypes.bool.isRequired
    };

    renderMobileMenu() {
        const { onClose } = this.props;
        return (
            <div>
                <h4>{tr.t('Menu')}</h4>
                <ul className="header-menu">
                    <li>
                        <Link to="Home" onClick={onClose.bind(this)}>{tr.t('Home')}</Link>
                    </li>
                    <li>
                        <Link to="PortfolioList" onClick={onClose.bind(this)}>{tr.t('Portfolio')}</Link>
                    </li>
                    <li>
                        <Link to="ServiceList" onClick={onClose.bind(this)}>{tr.t('Services')}</Link>
                    </li>
                    <li>
                        <Link to="Support" onClick={onClose.bind(this)}>{tr.t('Support')}</Link>
                    </li>
                    <li>
                        <Link to="Contacts" onClick={onClose.bind(this)}>{tr.t('Contacts us')}</Link>
                    </li>
                    <li>
                        <Link to="About" onClick={onClose.bind(this)}>{tr.t('About')}</Link>
                    </li>
                </ul>
            </div>
        );
    }

    renderMenu() {
        return (
            <ul className="header-menu">
                <li>
                    <Link to="PortfolioList">Портфолио</Link>
                </li>
                <li>
                    <Link to="ServiceList">Услуги</Link>
                </li>
                <li>
                    <Link to="Support">Техническая поддержка</Link>
                </li>
                <li>
                    <Link to="Blog">Блог</Link>
                </li>
                <li>
                    <Link to="About">О студии</Link>
                </li>
                <li>
                    <Link to="Contacts">Контакты</Link>
                </li>
            </ul>
        );
    }

    render() {
        const { mobile, onClose } = this.props;

        return mobile ? this.renderMobileMenu() : this.renderMenu();
    }
}

export default connect(state => {
    const { language } = state.translate;
    return {
        language
    };
})(HeaderMenu);