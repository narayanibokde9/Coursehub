import {Link} from 'react-router-dom';
import './CSS/Admin.css'
const CommentList = ({comments, title}) => {
    // const blogs = props.blog;
    // const title = props.title;
    
    return (  
        <div className="blog-list">
            <h2>{title}</h2>
            {comments.map((comment)=>(
                <div className="blog-preview" key = {comment.id}>
                    <Link to = {`/comments/${comment.id}`}>
    
                    <p>{comment.review}</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default CommentList;