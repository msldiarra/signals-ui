import React from 'react/addons';
import Relay from 'react-relay';
import ReactMixin from 'react-mixin';
import Auth from './AuthService';

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            user: '',
            password: '',
            authenticationError: false
        };
    }


    login(e) {

        e.preventDefault();

        Auth.login(this.state.user, this.state.password)
            .then((loggedIn) => {

                if (!loggedIn) return this.setState({authenticationError: true});
                const { location } = this.props;

                if (location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname)
                } else {
                    this.context.router.replace('/')
                }

            });
    }

    render() {
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading text-center">Nivell</h2>
                <hr/>
                <div className="form-group">
                    <label htmlFor="username" className="sr-only">Identifiant</label>
                    <input type="text" valueLink={this.linkState('user')} className="form-control"
                           placeholder="Identifiant" autoFocus="true"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="sr-only">Mot de passe</label>
                    <input type="password" valueLink={this.linkState('password')} className="form-control"
                           placeholder="Mot de passe"/>
                </div>
                <button className="btn btn-warning btn-block" type="submit" onClick={this.login.bind(this)}>
                    Connectez-vous
                </button>
                {this.state.authenticationError && (
                    <p>Mauvais paramètres d'authentification</p>
                )}
            </form>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

export default Login