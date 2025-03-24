import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
 // Correct import for thunk
import { composeWithDevTools } from '@redux-devtools/extension';

import { getAllPizzasReducer ,addPizzaReducer, getPizzaByIdReducer, editPizzaReducer} from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import { loginUserReducer, registerUserReducer ,getAllUsersReducer } from './reducers/userReducer';
import { placeOrderReducer, getUserOrdersReducer , getAllOrdersReducer}  from './reducers/orderReducer';

// Combine reducers
const finalReducer = combineReducers({
    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: cartReducer,
    loginUserReducer: loginUserReducer,
    registerUserReducer: registerUserReducer,
    placeOrderReducer : placeOrderReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addPizzaReducer : addPizzaReducer,
    getPizzaByIdReducer : getPizzaByIdReducer,
    editPizzaReducer : editPizzaReducer,
    getAllOrdersReducer:getAllOrdersReducer,
    getAllUsersReducer:getAllUsersReducer
});

// Initial state
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser
    }
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
