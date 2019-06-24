import configureStore from 'redux-mock-store';

const middlewares = []
const mockStore = configureStore(middlewares)

import * as actions from '../../src/actions';

// You would import the action from your codebase in a real scenario
//const addTodo = () => ({ type: 'ADD_TODO' })
const fetchCategories = actions.fetchCategories;


describe('actions', () => {


  it('should dispatch action', () => {

  // Initialize mockstore with empty state
  const initialState = {}
  const store = mockStore(initialState)

  // Dispatch the action
  store.dispatch(fetchCategories())

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: 'FETCH_CATEGORIES' }
  expect(actions).toEqual([expectedPayload])
})
})
