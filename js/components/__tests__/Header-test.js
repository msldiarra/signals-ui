'use strict';

jest.unmock('../Header');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from '../Header';

describe('Header', () => {

    it('Logout link should be displayed when user is logged in', () => {

        const header = TestUtils.renderIntoDocument(
            <Header user={{company:'company name'}} />
        );

        const headerNode = ReactDOM.findDOMNode(header);
        expect(headerNode.textContent).toContain('Déconnexion');
        expect(headerNode.textContent).toContain('NIVELL');
    });

    it('Dashboard link should be displayed when user is logged in', () => {

        const header = TestUtils.renderIntoDocument(
            <Header user={{company:'company name'}} />
        );

        const headerNode = ReactDOM.findDOMNode(header);
        expect(headerNode.textContent).toContain('Dashboard');
        expect(headerNode.textContent).toContain('NIVELL');
    });

    it('Company name link should be displayed user is logged in', () => {

        const header = TestUtils.renderIntoDocument(
            <Header user={{company:'company name'}} />
        );

        const headerNode = ReactDOM.findDOMNode(header);
        expect(headerNode.textContent).toContain('(company name)');
        expect(headerNode.textContent).toContain('NIVELL');
    });

    it('Header should only contain NIVELL when user is not logged in', () => {

        const header = TestUtils.renderIntoDocument(
            <Header user={null} />
        );

        const headerNode = ReactDOM.findDOMNode(header);
        expect(headerNode.textContent).not.toContain('Déconnexion');
        expect(headerNode.textContent).not.toContain('Dashboard');
        expect(headerNode.textContent).toContain('NIVELL');
    });

});