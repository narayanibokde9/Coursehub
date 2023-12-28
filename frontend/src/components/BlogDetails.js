import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./usefetch";
import "./CSS/Admin.css";
import { useEffect } from "react";

const BlogDetails = () => {
	// const [blog, setBlog] = useState();

	const { id } = useParams();
	const { data: blog, error, isPending } = useFetch("/admin/blogs/" + id);
	const navigate = useNavigate();

	const handleClick = () => {
		fetch(`/admin/blogs/${id}`, {
			method: "DELETE",
		}).then(() => {
			navigate("/blogs");
            console.log(id + "deleted")
		});
	};

	// useEffect(() => {
	// 	fetch(`/admin/blogs/${_id}`)
	// 		.then((res) => res.json())
	// 		.then((jsonRes) => setBlog(jsonRes));
	// }, []);

	return (
		<div className="blog-details">
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blog && (
				<article className="blog-details-content">
					<h2>Platform: {blog.venue}</h2>
					<p>
						Is this course paid or free?
						<br />
						{blog.organiser}
					</p>
					<p>
						About:
						<br />
						{blog.description}
					</p>
					<p>
						Event date:
						<br />
						{blog.date}
					</p>
					<p>
						What's the duration of the event?
						<br />
						{blog.start_time}{" "}
					</p>
					<button onClick={handleClick}>delete</button>
				</article>
			)}
		</div>
	);
};

export default BlogDetails;
