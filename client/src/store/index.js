import {compose, createStore, applyMiddleware} from 'redux'

import rootRedecer from './reducers/rootReducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

const store = createStore(rootRedecer,compose(
    applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store