import {Navigate} from 'react-router-dom';

export const PrivateRoute = (props: { children: JSX.Element }) => {
    const logged = !!localStorage.getItem('token')

    return logged ? props.children : <Navigate to='/login'/>
};