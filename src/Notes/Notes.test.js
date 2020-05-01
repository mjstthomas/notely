import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Notes from './Notes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Notes id="1" /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
const tree = renderer
  .create(<BrowserRouter><Notes id="1" name="dolphins"/></BrowserRouter>)
  .toJSON();
expect(tree).toMatchSnapshot();  
});