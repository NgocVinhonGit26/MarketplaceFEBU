import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CommentBox from './CommentBox';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCommentByProductId } from 'api/comment';
import { createComment } from 'api/comment';

const Review = ({ productId }) => {
    const avatar = useSelector((state) => state.user.avatar);
    const uname = useSelector((state) => state.user.name);
    const id = parseInt(localStorage.getItem("id"));
    const accessToken = localStorage.getItem("accessToken");
    const [listComment, setListComment] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");


    const [newComment, setNewComment] = React.useState({
        content: "",
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        user_id: id,
        product_id: productId,
    });

    const createNewComment = async () => {
        console.log(newComment);
        if (inputValue === "") {
            return;
        }
        try {
            const response = await createComment(newComment, accessToken);
            setListComment([...listComment, {
                ...newComment,
                likes: 0,
                dislikes: 0,
                userName: uname,
                userAvatar: avatar
            }]);

            setInputValue("");
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            createNewComment();
        }
    };

    useEffect(() => {
        console.log("listComment", listComment);
    }, [listComment])

    useEffect(() => {
        const fetchComment = async () => {
            const repsonse = await getAllCommentByProductId(productId);
            setListComment(repsonse.data);
        }
        fetchComment();
    }, [productId])


    return (
        <div className='container-review-product'>
            <h2>
                Đánh giá
            </h2>
            <CommentBox
                listComment={listComment}
            />
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    {/* <AccountCircle /> */}
                    <img src={avatar} style={{ height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px" }} />
                    <TextField
                        id="input-with-sx"
                        label="Hãy để lại bình luận"
                        variant="standard"
                        onKeyPress={handleKeyPress}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setNewComment({ ...newComment, content: e.target.value });
                        }}
                    />
                </Box>
            </Box>
        </div>
    );
}
export default Review