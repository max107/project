import React, { Component, PropTypes } from 'react';
import { tr } from 'lib';

export default class Slide extends Component {
    static propTypes = {
        slide: PropTypes.object.isRequired
    };

    render() {
        const { slide } = this.props;

        return (
            <div className="row slide active">
                <div className="columns small-12 medium-6 slide-left-side">
                    <h3>{tr.ta(slide, 'name')}</h3>
                    <p className="slide-content">{tr.ta(slide, 'content')}</p>
                    <p>
                        <a className="button" href={slide.url}>{tr.t('Learn more')} &rarr;</a>
                    </p>
                </div>
                <div className="columns hide-for-small-only medium-6 slide-right-side">
                    <img src={slide.image.thumb} />
                </div>
            </div>
        );
    }
}