import instance from "api/axios";

const getUserById = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await instance.get(`/user/getUserById/${id}`, config);
        return {
            id: response.data.id,
            name: response.data.name,
            avatar: response.data.avatar,
            phone: response.data.phoneNumber,
            username: response.data.username,
            address: response.data.address,
            isdeleted: response.data.isdeleted,
            role: response.data.role
        };
    }
    catch (error) {
        throw error;
    }
}

const getAllUsers = async (page, queryCondition = {}, token) => {
    let url = `/admin/searchUser/${page}?`;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    console.log("accessToken:>>>123 ", config);
    if (queryCondition.name) {
        url += `&name=${queryCondition.name}`;
    }
    if (queryCondition.username) {
        url += `&username=${queryCondition.username}`;
    }
    if (queryCondition.address) {
        url += `&address=${queryCondition.address}`;
    }
    if (queryCondition.phone_number) {
        url += `&phone_number=${queryCondition.phone_number}`;
    }
    if (queryCondition.role) {
        url += `&role=${queryCondition.role}`;
    }

    try {
        const response = await instance.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getTotalPageUser = async (page, queryCondition = {}, token) => {
    let url = `/admin/getTotalPageUser/${page}?`;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    if (queryCondition.name) {
        url += `&name=${queryCondition.name}`;
    }
    if (queryCondition.username) {
        url += `&username=${queryCondition.username}`;
    }
    if (queryCondition.address) {
        url += `&address=${queryCondition.address}`;
    }
    if (queryCondition.phone_number) {
        url += `&phone_number=${queryCondition.phone_number}`;
    }
    if (queryCondition.role) {
        url += `&role=${queryCondition.role}`;
    }

    try {
        const response = await instance.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        console.log("accessToken:>>> ", config);
        const response = await instance.post(`/admin/deleteUserById/${id}`, {}, config);
        return response;
    } catch (error) {
        console.log("error:>>> ", error);
        throw error;
    }
}

const updateUserById = async (id, data = {}, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let url = `/user/updateUserById/${id}?`;
        if (data.name) {
            url += `&name=${data.name}`;
        }
        if (data.avatar) {
            url += `&avatar=${data.avatar}`;
        }
        if (data.phone) {
            url += `&phone_number=${data.phone}`;
        }
        const response = await instance.post(url, data, config);
        return {
            id: response.data.id,
            name: response.data.name,
            avatar: response.data.avatar,
            phone: response.data.phoneNumber,
            username: response.data.username,
            address: response.data.address,
            isdeleted: response.data.isdeleted,
            role: response.data.role
        };;
    }
    catch (error) {
        throw error;
    }
}

const getOrderProductByCustomer = (userId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = instance.get(`/user/getOrderProductByCustomer/${userId}`, config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOrderItemByOrderProductId = (orderProductId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = instance.get(`/user/getOrderItemByOrderProductId/${orderProductId}`, config);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const updateAddressById = async (id, address, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let url = `/user/updateAddressById/${id}?address=${address}`;
        const response = await instance.post(url, {}, config);
        return response;
    }
    catch (error) {
        throw error;
    }
}

const getImgqrByIdAd = async (token) => {
    try {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const response = await instance.get(`/admin/getImgqrById`, config);
        return response;
    }
    catch (error) {
        throw error;
    }
}

const getImgqrByIdSB = async (token) => {
    try {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const response = await instance.get(`/merchant/getImgqrById`, config);
        return response;
    }
    catch (error) {
        throw error;
    }
}

const updateImgqrById = async (imgqr, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let url = `/admin/updateImgqrById?imgQR=${imgqr}`;
        const response = await instance.post(url, {}, config);
        return response;
    }
    catch (error) {
        throw error;
    }
}





export {
    getUserById,
    getAllUsers,
    getTotalPageUser,
    deleteUser,
    updateUserById,
    getOrderProductByCustomer,
    getOrderItemByOrderProductId,
    updateAddressById,
    getImgqrByIdAd,
    getImgqrByIdSB,
    updateImgqrById
}