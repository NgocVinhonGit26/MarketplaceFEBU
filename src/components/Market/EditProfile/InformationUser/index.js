import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Form from "react-bootstrap/Form";
import Avatar from '@mui/material/Avatar';
import { updateUserById } from 'api/user';
import { successToast } from 'utilities/toast';
import { useDispatch } from "react-redux";
import { setUser } from 'redux/slices/userSlice';

export default function InformationUser({ userInfor, setUserInfor }) {

    const [id, setId] = React.useState(userInfor?.id || 0);
    const [name, setName] = React.useState(userInfor?.name || "");
    const [avatar, setAvatar] = React.useState(userInfor?.avatar || ""); // avatar: state.user.avatar[0
    const [username, setUserName] = React.useState(userInfor?.username || ""); // email: state.user.email[0
    const [phone, setPhone] = React.useState(userInfor?.phone || "");
    const [image, setImage] = React.useState("");
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();

    useEffect(() => {
        if (avatar !== "") {
            handleSubmit();
        }
    }, [avatar])

    const handleSubmit = async () => {
        const data = {
            name,
            avatar,
            phone,
        };
        try {
            const response = await updateUserById(id, data, accessToken)
            // console.log("response updateUserById", response)
            // successToast("Cập nhật thông tin thành công")
            setUserInfor(response)
            const payload = {
                // token: response.token,
                role: response.role,
                name: response.name,
                id: response.id,
                avatar: response.avatar,
                email: response.email,
                phone: response.phone,
            };
            // console.log("payload>>>>>>>>>", payload);
            dispatch(setUser(payload));
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const handleImageUpload = () => {

        if (image === "") {
            // console.log("hehhehe")
            handleSubmit();
            return;
        }

        const dataImg = new FormData();
        dataImg.append("file", image);
        dataImg.append("upload_preset", "cspmjsnn");
        dataImg.append("cloud_name", "dkcetq9et");

        fetch("https://api.cloudinary.com/v1_1/dkcetq9et/image/upload", {
            method: "post",
            body: dataImg,
        })
            .then((response) => response.json())
            .then((dataImg) => {
                // console.log("dataImg", dataImg.url)
                setAvatar(dataImg.url);
            })
            .catch((err) => {
                console.log(err);
            });

    };


    // useEffect(() => {
    //     setName(userInfor?.name || "");
    //     setAvatar(userInfor?.avatar || "");
    //     setUserName(userInfor?.username || "");
    //     setPhone(userInfor?.phone || "");
    //     console.log("userInfor effec", userInfor)
    // }, [userInfor])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, minWidth: '40ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Form.Group>
                <Form.Label>Ảnh</Form.Label>
                <Stack direction="row" spacing={2} sx={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
                    <Avatar
                        // sizes="30"
                        alt={name} src={avatar}
                        sx={{ width: 350, height: 350 }}
                    />
                </Stack>
                <Form.Control
                    type="file"
                    name="avatar"
                    // value={avatar}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Form.Group>
            <div style={{ marginTop: "5px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Họ và tên"
                    name="name"
                    defaultValue={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    // name='email'
                    defaultValue={username}
                    disabled
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Số điện thoại"
                    defaultValue={phone}
                    name='phone'
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
            </div>
            <Button
                variant="contained"
                color="success"
                sx={{ marginLeft: 2 }}
                onClick={handleImageUpload}

            >
                Lưu thay đổi
            </Button>
            <div style={{ marginTop: "15px", borderBottom: "1px solid #ececec" }}>
                <h4>THAY ĐỔI MẬT KHẨU</h4>
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Mật khẩu hiện tại"
                // defaultValue="Hello World"

                />

            </div>
            <div style={{ marginBottom: "10px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Mật khẩu mới"
                // defaultValue="Hello World"

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nhập lại mật khẩu mới"
                // defaultValue="Hello World"

                />
            </div>
            <Button variant="contained" color="success" sx={{ marginLeft: 2 }}>
                Đổi mật khẩu
            </Button>
        </Box>
    );
}

