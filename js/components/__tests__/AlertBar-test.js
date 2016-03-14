'use strict';

jest.unmock('../AlertBar');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AlertBar from '../AlertBar';

describe('Header', () => {

    it('LiquidType, tankName and stationName should be displayed in sentence', () => {

        let tank = {
            id: 1,
            liquidType: 'liquid type',
            name: 'tank name',
            station: 'station name',
            fillingRate: 50
        }
        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const node = ReactDOM.findDOMNode(alert);

        expect(node.textContent).toContain('Cuve liquid type tank name dans la station de station name');
        expect(node.textContent).toContain('50%');
    });

    it('When fillingRate < 30, bar class should be progress-bar-danger', () => {

        let tank = {
            id: 1,
            liquidType: 'liquid type',
            name: 'tank name',
            station: 'station name',
            fillingRate: 15
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-danger');
        expect(element).not.toBeNull();
    });

    it('When fillingRate > 50, bar class should be progress-bar-success', () => {

        let tank = {
            id: 1,
            liquidType: 'liquid type',
            name: 'tank name',
            station: 'station name',
            fillingRate: 75
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-success');
        expect(element).not.toBeNull();
    });

    it('When 30 > fillingRate > 50, bar class should be progress-bar-success', () => {

        let tank = {
            id: 1,
            liquidType: 'liquid type',
            name: 'tank name',
            station: 'station name',
            fillingRate: 31
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-warning');
        expect(element).not.toBeNull();
    });

});