import axios from 'axios';

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    try {
        const response = await axios.post('/api/user/register', user);
        console.log(response);
        dispatch({ type: 'USER_REGISTER_SUCCESS',payload:response.data });
        // alert(response.data)
    } catch (error) {
        console.log(error);
        dispatch({ type: 'USER_REGISTER_FAILED', payload: error.message });
    }
};

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    try {
        const response = await axios.post('/api/user/login', user);
        console.log(response);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
        localStorage.setItem('currentUser',JSON.stringify(response.data))
        window.location.href='/'
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error.message });
    }
};

export const logoutUser=() =>dispatch=>{

    
    localStorage.removeItem('currentUser')
    window.location.href='/login'
}

export const getAllUsers =()=>async (dispatch) =>{

    dispatch({type:'GET_USERS_REQUEST'});

    try {
        const response = await axios.get('/api/user/getallusers')
        console.log(response);
        
        dispatch({type:'GET_USERS_SUCCESS' , payload: response.data})
    } catch (error) {
        dispatch({type:'GET_USERS_FAILED' , payload : error})
    }
};