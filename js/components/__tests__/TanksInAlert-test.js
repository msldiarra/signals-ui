'use strict';

jest.unmock('../TanksInAlert');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TanksInAlert from '../TanksInAlert';
import AlertBar from '../AlertBar';

describe('TanksInAlert', () => {

    beforeEach(function() {
        AlertBar.mockClear();
    });

    it('Given one tank in alert' +
       'When displaying TanksInAlert component' +
       'It should contain 1 AlertBar component', () => {

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

        TestUtils.renderIntoDocument(
            <TanksInAlert viewer={viewer} />
        );

        expect(AlertBar.mock.calls.length).toBe(1);
    });

    it('Given two tank in alerts' +
        'When displaying TanksInAlert component' +
        'It should contain 2 AlertBar component', () => {

        var viewer = {};
        let tanks = [{
            id: 1,
            liquidType: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingRate: 50
        },{
            id: 2,
            liquidType: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingRate: 50
        }];

        viewer.tanksInAlert = {}
        viewer.tanksInAlert.edges = [{node:tanks[0]}, {node:tanks[1]}];

        TestUtils.renderIntoDocument(
            <TanksInAlert viewer={viewer} />
        );

        expect(AlertBar.mock.calls.length).toBe(2);
    });

});