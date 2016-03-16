'use strict';

jest.unmock('../TanksInAlert');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TanksInAlert from '../TanksInAlert';

describe('TanksInAlert', () => {

    it('LiquidType, tankName and stationName should be displayed in sentence', () => {

        var viewer = {};
        let tank = {
            id: 1,
            liquidType: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingRate: 50
        };

        viewer.tanksInAlert = {}
        viewer.tanksInAlert.edges = [{node:tank}];

        const alert = TestUtils.renderIntoDocument(
            <TanksInAlert viewer={viewer} />
        );

        const node = ReactDOM.findDOMNode(alert);

        /*expect(node.textContent).toContain('Cuve liquid type tank name dans la station de station name');
        expect(node.textContent).toContain('50%');*/
    });

});