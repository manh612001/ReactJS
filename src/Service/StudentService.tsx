import request from "../api/request"


export const getStudents = async() =>{
    try {
        const res = await request.get('Student/StudentWithClass');
        return res.data;
    } catch (error) {
        return error;
    }
}

export const GetAll = async() =>{
    try {
        const res = await request.get('Student/Students');
        return res.data;
    } catch (error) {
        return error;
    }
    
}

export const Add = async (value:{}) =>{
    try {
        const res = await request.post('Student',value);
        return res.data;
    } catch (error) {
        return error;
    }
    
}
export const Delete = async (id:number) =>{
    try {
        const res = await request.delete(`Student/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
    
}


export const GetById = async(id:any)=>{
    try {
        const res = await request.get(`Student/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const Edit = async(id:any,value:{})=>{
    try {
        const res = await request.put(`Student/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}



