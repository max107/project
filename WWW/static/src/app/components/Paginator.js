import React, { Component } from 'react';

/**
 * React Paginator
 *
 * @prop {number} numPages - Available number of pages
 * @prop {function} [onClick] - Fired on every click and passes the page number
 */
export default class Paginator extends Component {
    static propTypes:{
        numPages: PropTypes.number.isRequired,
        onClick: PropTypes.func
        };

    static defaultProps = {
        small: false,
        reverse: false,
        splitTemplate: false,
        nextText: "Next",
        prevText: "Prev"
    };

    state = {
        page: 1
    };

    // Slighlty modified from underscore source
    range(start, stop) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }

        let length = Math.max(stop - start, 0);
        let idx = 0;
        let arr = new Array(length);

        while (idx < length) {
            arr[idx++] = start;
            start += 1;
        }

        return arr;
    }

    /**
     * Triggered by any button click within the paginator.
     *
     * @param {number} page - Page number
     */
    onClick(page) {
        const { numPages, onClick } = this.props;

        // n is out of range, don't do anything
        if (page > numPages || page < 1) {
            return;
        }

        if (onClick) {
            onClick(page);
        }

        this.setState({
            page
        });
    }

    /**
     * Returns the number of page numbers
     */
    getDisplayCount() {
        return this.props.numPages;
    }

    /**
     * Returns a range [start, end]
     */
    getPageRange() {
        let pageCount = 5,
            displayCount = this.getDisplayCount(),
            page = this.state.page,
        // Check position of cursor, zero based
            idx = (page - 1) % displayCount,
        // list should not move if cursor isn't passed this part of the range
            start = page - idx,
        // remaining pages
            remaining = this.props.numPages - page;

        // Don't move cursor right if the range will exceed the number of pages
        // in other words, we've reached the home stretch
        if (page > displayCount && remaining < displayCount) {
            // add 1 due to the implementation of `range`
            start = this.props.numPages - displayCount + 1;
        }

        let value = this.range(start, start + displayCount);
        if (this.props.small) {
            let index = value.indexOf(page);
            // Right part
            value.splice(index + pageCount - 1, value.length - index);
            // Left part
            value.splice(0, value.length - pageCount - 2);
        }
        return this.props.reverse ? value.reverse() : value;
    }

    preventDefault(e) {
        e.preventDefault();
    }

    render() {
        let page = this.state.page,
            prevClassName = page === 1 ? 'disabled' : '',
            nextClassName = page >= this.props.numPages ? 'disabled' : '';

        prevClassName += prevClassName.length == 0 ? "prev-page" : " prev-page";
        nextClassName += nextClassName.length == 0 ? "next-page" : " next-page";

        let html;
        if (this.props.splitTemplate) {
            html = (
                <div>
                    <ul className="pager">
                        {this.getPageRange().map(this.renderPage, this)}
                    </ul>
                    <ul className='pager-nav'>
                        <li className={prevClassName} onClick={this.onClick.bind(this, page - 1)}>
                            <a href='#' onClick={this.preventDefault.bind(this)}>
                                {this.props.prevText}
                            </a>
                        </li>
                        <li className={nextClassName} onClick={this.onClick.bind(this, page + 1)}>
                            <a href='#' onClick={this.preventDefault.bind(this)}>
                                {this.props.nextText}
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            html = (
                <div>
                    <ul className='pager-full'>
                        <li className={prevClassName} onClick={this.onClick.bind(this, page - 1)}>
                            <a href='#' onClick={this.preventDefault.bind(this)}>
                                {this.props.prevText}
                            </a>
                        </li>
                        {this.getPageRange().map(this.renderPage, this)}
                        <li className={nextClassName} onClick={this.onClick.bind(this, page + 1)}>
                            <a href='#' onClick={this.preventDefault.bind(this)}>
                                {this.props.nextText}
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="pager-container">
                {html}
            </div>
        );
    }

    renderPage(n, i) {
        let cls = this.state.page === n ? 'active' : '';
        return (
            <li key={i} className={cls} onClick={this.onClick.bind(this, n)}>
                <a href='#' onClick={this.preventDefault.bind(this)}>{n}</a>
            </li>
        );
    }
}