import React from 'react';

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {

        static willTransitionTo(transition) {
            if (!JSON.parse(localStorage.getItem('user'))) {
                transition.redirect('/login', {}, {'nextPath' : transition.path});
            }
        }

        constructor() {
            super()
            this.state = { user: JSON.parse(localStorage.getItem('user')) };
        }

        componentWillUnmount() {

        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    user={this.state.user} />
            );
        }
    }
};