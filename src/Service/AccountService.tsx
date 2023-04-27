import request from "../api/request"


export const Login = async(value:{}) =>{
    try {
        const res = await request.post('Account/Login',value);
        return res.data;
    } catch (error) {
        return error;
    }
    
}

export const SignUp = async(value:{}) =>{
    try {
        const res = await request.post('Account/SignUp',value);
        return res.data;
    } catch (error) {
        return error;
    }
    
}