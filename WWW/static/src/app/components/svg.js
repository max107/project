import React, { Component } from 'react';

export default icon => {
    let html = {
        __html: require('../../svg/' + icon + '.svg')
    };
    return <span dangerouslySetInnerHTML={html}/>;
};