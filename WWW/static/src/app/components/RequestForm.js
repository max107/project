import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request as actions } from 'actions';
import serialize from 'form-serialize';
import Validate from 'components/Validate';
import { tr } from 'lib';

class RequestForm extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        errors: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]).isRequired,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        placeholder: ''
    };

    state = {
        complete: false
    };

    handleOnSubmit(e) {
        e.preventDefault();
        let params = serialize(e.target, {hash: true});
        const { actions } = this.props;
        actions.create(params, data => {
            this.setState({complete: true});
        });
    }

    render() {
        const { loading, errors, placeholder } = this.props;
        const { complete } = this.state;

        return complete ? (
            <div>Ваша заявка успешно отправлена</div>
        ) : (
            <form id="contacts-form" method="post" onSubmit={this.handleOnSubmit.bind(this)}>
                <div className="row">
                    <div className="columns small-12 medium-4">
                        <div className="form-row">
                            <label htmlFor="name">{tr.t('Your name:')}</label>
                            <input id="name" className={errors['name'] ? 'has-errors' : ''} name="name" placeholder={tr.t('Your name:')} type="text" disabled={loading} />
                            <Validate name="name" errors={errors}/>
                        </div>
                    </div>
                    <div className="columns small-12 medium-4">
                        <div className="form-row">
                            <label htmlFor="phone">{tr.t('Phone:')}</label>
                            <input id="phone" className={errors['phone'] ? 'has-errors' : ''} name="phone" placeholder={tr.t('Phone:')} type="text" disabled={loading} />
                            <Validate name="phone" errors={errors}/>
                        </div>
                    </div>
                    <div className="columns small-12 medium-4">
                        <div className="form-row">
                            <label htmlFor="email">{tr.t('E-mail:')}</label>
                            <input id="email" className={errors['email'] ? 'has-errors' : ''} name="email" placeholder="E-mail:" type="email" disabled={loading} />
                            <Validate name="email" errors={errors}/>
                        </div>
                    </div>
                    <div className="columns small-12">
                        <div className="form-row">
                            <label htmlFor="message">{tr.t('Message:')}</label>
                            <textarea cols="40" className={errors['message'] ? 'has-errors' : ''} id="message" name="message" placeholder={tr.t('Message:')} disabled={loading} defaultValue={placeholder} />
                            <Validate name="message" errors={errors}/>
                        </div>
                    </div>
                </div>
                <input type="submit" className="button" value={tr.t('Send')} disabled={loading} />
            </form>
        );
    }
}

export default connect(state => state.request, dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
})(RequestForm);