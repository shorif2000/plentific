import configureStore from 'redux-mock-store';

const middlewares = []
const mockStore = configureStore(middlewares)

import * as actions from '../../src/actions';


describe('actions', () => {

  it('should dispatch action', () => {

  // Initialize mockstore with empty state
  const initialState = {}
  const store = mockStore(initialState)

  // Dispatch the action
  return store.dispatch(actions.fetchCategories)
.then(() => {
// Test if your store dispatched the expected actions
    	expect(store.getActions()).toEqual(expectedActions);
    });

  // Test if your store dispatched the expected actions
/*
  const actions = store.getActions()
  const expectedPayload = { type: 'FETCH_CATEGORIES' }
  expect(actions).toEqual([expectedPayload])*/
})
})
