import api from  '../utils/api';
import { setAlert } from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types'

//GET CURRENT USERS PROFILE

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};


//CREATE OR UPDATE PROFILE

export const createProfile = (formData, navigate, edit = false) => async (dispatch) => {
    try {
    
        const res = await api.post('/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Add Experience

export const addExperience = ( formData, navigate ) => async dispatch => {
    try {
        const res = await api.put('/profile/experience', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
           
        navigate('/dashboard');
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Add Education

export const addEducation = ( formData, navigate ) => async dispatch => {
    try {
    
        const res = await api.put('/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
           
        navigate('/dashboard');
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}


// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can Not be undone!')) {
    try {
        const res = await api.delete('/profile');

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED});

        dispatch(setAlert('Your account has been successfully deleted'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        }
    }
}