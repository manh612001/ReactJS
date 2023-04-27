import request from "../api/request";


export const GetAll = async() =>{
    try {
        const res = await request.get('Class');
        return res.data;
    } catch (error) {
        return error;
    }
};

export const Add = async(value:{}) =>{
    try {
        const res = await request.post('Class',value);
        return res.data;
    } catch (error) {
        return error;
    }
}
export const Delete = async (id:any) =>{
    try {
        const res = await request.delete(`Class/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}
export const GetById = async(id:any) =>{
    try {
        const res = await request.get(`Class/GetById/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const Edit = async(id:any,value:{}) =>{
    try {
        const res = await request.put(`Class/${id}`,value);
        return res.data;
    } catch (error) {
        return error;
    }
};
