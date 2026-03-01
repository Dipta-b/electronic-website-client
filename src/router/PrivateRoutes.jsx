import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Navigate } from 'react-router';

function PrivateRoutes({children,allowedRoles}){

    const  {user} = useContext(AuthContext);
    if(!user){
        return <Navigate to="/login" replace></Navigate>    
    }

    if(allowedRoles && !allowedRoles.includes(user.role))
return <Navigate to="/" ></Navigate>
    return children;
}

export default PrivateRoutes