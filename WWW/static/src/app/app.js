import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default class App extends Component {
    state = {
        mobile_open: false
    };

    handleCloseMenu() {
        this.setState({
            mobile_open: false
        });
    }

    getChildren() {
        return this.props.children;
    }

    handleOpenMenu() {
        this.setState({
            mobile_open: true
        });
    }

    render() {
        const { mobile_open } = this.state;
        return (
            <div>
                <div id="wrapper">
                    <Header open={mobile_open} onClose={this.handleCloseMenu.bind(this)} onOpen={this.handleOpenMenu.bind(this)}/>
                    {this.getChildren()}
                    <a href="#" className={mobile_open ? "exit-menu" : "hide"}
                       onClick={this.handleCloseMenu.bind(this)}/>
                    <p id="push"/>
                </div>
                <Footer />
            </div>
        );
    }
}
