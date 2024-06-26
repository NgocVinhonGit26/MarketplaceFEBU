import instance from "api/axios";

const createComment = async (comment, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await instance.post('/comments/createComment', comment, config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getAllCommentByProductId = (productId) => {
    try {
        const response = instance.get(`/product/findAllByProductId/${productId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {
    createComment,
    getAllCommentByProductId
};
