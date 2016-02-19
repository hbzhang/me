'use strict';

describe('DemoApp', () => {
  let React = require('react/addons');
  let DemoApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    DemoApp = require('components/DemoApp.js');
    component = React.createElement(DemoApp);
  });

  it('should create a new instance of DemoApp', () => {
    expect(component).toBeDefined();
  });
});
