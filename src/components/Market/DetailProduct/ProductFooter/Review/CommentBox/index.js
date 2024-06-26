import "./style.scss"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { addHours, format, parseISO } from 'date-fns';

const CommentBox = ({ listComment }) => {
    // const convertTimestamp = (timestamp) => {
    //     const date = new Date(timestamp);
    //     const options = {
    //         year: 'numeric',
    //         month: '2-digit',
    //         day: '2-digit',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit',
    //         hour12: false
    //     };
    //     return date.toLocaleString('en-GB', options).replace(',', '');
    // };
    const formatDate = (date) => {
        const dateParts = date.split(' ')[0].split('-');
        const timePart = date.split(' ')[1];
        return `${timePart} ${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }
    return (
        <section >
            <div className="containerpy-5 text-body" >
                <div className="row d-flex ">
                    <div className="col-md-11 col-lg-9 col-xl-7">
                        {listComment.map((comment, index) => (
                            <div key={index} className="d-flex flex-start mb-4">
                                <div style={{ width: '60px', height: "60px", marginRight: "10px" }}>
                                    <img className="rounded-circle shadow-1-strong me-3"
                                        src={comment.userAvatar} alt="avatar" />
                                </div>
                                <div className="card w-100">
                                    <div className="card-body p-4">
                                        <div className="">
                                            <h5>{comment.userName}</h5>
                                            <p className="small">
                                                {
                                                    formatDate(comment.created_at)
                                                }
                                            </p>
                                            <p>
                                                {comment.content}
                                            </p>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="link-muted me-2">
                                                        <ThumbUpAltIcon />
                                                        {comment.likes}</div>
                                                    <div className="link-muted">
                                                        <ThumbDownAltIcon />
                                                        {comment.dislikes}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CommentBox