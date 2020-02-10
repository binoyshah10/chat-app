import { toast } from 'react-toastify';

const errorMiddleware = store => next => action => {
    
    if (action.type.includes('FAILED')) {
        toast.error(action.payload, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000
        });
    }
    else if (action.type.includes('SUCCESS')) {
        if(action.payload && action.payload.payload && action.payload.payload.success === false) {
            toast.error(action.payload.payload.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
        }  
    }
    
    return next(action);
}

export default errorMiddleware;