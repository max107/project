import React, { Component, PropTypes } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';
import svg from './svg';

export default class Header extends Component {
    static propTypes = {
        onOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired
    };

    handleOpenMenu(e) {
        e.preventDefault();
        const { onOpen } = this.props;
        onOpen();
    }

    render() {
        const { open, onClose } = this.props;
        return (
            <div className="header">
                <div className="row">
                    <div className="columns small-1">
                        <HeaderLogo />
                        <a className="mobile-menu-link" href="#" onClick={this.handleOpenMenu.bind(this)}>{svg('mobile-menu')}</a>
                    </div>
                    <div className="columns small-9">
                        <HeaderMenu mobile={false} onClose={onClose}/>
                    </div>
                    <div className="columns small-2">
                        <div className="header-contact">
                            <p><a href="mailto:mail@studio107.ru">mail@studio107.ru</a></p>
                            <p><a href="tel:+78332207107">+7 (8332) 207-107</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
