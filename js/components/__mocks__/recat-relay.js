var Relay = require.requireActual('react-relay');

module.exports = {
    QL: Relay.QL,
    Mutation: Relay.Mutation,
    Route: Relay.Route,
    Store: {
        update: jest.genMockFn()
    },
    createContainer: (compoent) => component
};

/**
 createContainer: (component, containerSpec) => {
        const fragments = containerSpec.fragments || {};

        // mock the static container methods
        Object.assign(component, { getFragment: (fragmentName) => fragments[fragmentName] });

        return component;
    }
 **/
