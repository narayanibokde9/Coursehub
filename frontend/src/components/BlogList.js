import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
	// const blogs = props.blog;
	// const title = props.title;

	const [blog, setBlog] = useState([]);

	useEffect(() => {
		fetch(`/admin/blogs`)
			.then((res) => res.json())
			.then((jsonRes) => setBlog(jsonRes));
	}, []);

    console.log(blog);

	return (
		<div className="blog-list">
			<h2>{title}</h2>
			{blog.map((blog) => (
				<div className="blog-preview" key={blog.id}>
					<Link to={`/blogs/${blog._id}`} className="blog-link">
						<h2 >Platform: {blog.venue}</h2>
						<p >{blog.organiser}</p>
						<p > Event duration: {blog.start_time}</p>
						<p>{blog.date}</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default BlogList;
