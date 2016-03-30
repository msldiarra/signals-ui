'use strict';

jest.unmock('../AlertBar');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AlertBar from '../AlertBar';

describe('AlertBar', () => {

    it('LiquidType, tankName and stationName should be displayed in sentence', () => {

        let tank = {
            id: 1,
            liquidtype: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingrate: 50
        }
        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const node = ReactDOM.findDOMNode(alert);

        expect(node.textContent).toContain('Cuve liquid type tank name dans la station de station name');
        expect(node.textContent).toContain('50%');
    });

    it('When fillingrate < 30, bar class should be progress-bar-danger', () => {

        let tank = {
            id: 1,
            liquidtype: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingrate: 15
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-danger');
        expect(element).not.toBeNull();
    });

    it('When fillingrate > 50, bar class should be progress-bar-success', () => {

        let tank = {
            id: 1,
            liquidtype: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingrate: 75
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-success');
        expect(element).not.toBeNull();
    });

    it('When 30 > fillingrate > 50, bar class should be progress-bar-success', () => {

        let tank = {
            id: 1,
            liquidtype: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingrate: 31
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-warning');
        expect(element).not.toBeNull();
    });

    it('Bar width should be equal to fillingrate', () => {

        let tank = {
            id: 1,
            liquidtype: 'liquid type',
            tank: 'tank name',
            station: 'station name',
            fillingrate: 66
        };

        const alert = TestUtils.renderIntoDocument(
            <AlertBar key={tank.id} tank={tank} />
        );

        const element = TestUtils.findRenderedDOMComponentWithClass(alert, 'progress-bar-success');
        expect(element).not.toBeNull();
        expect(element.style).not.toBeNull();
        expect(element.style.width).toEqual("66%");
    });

});