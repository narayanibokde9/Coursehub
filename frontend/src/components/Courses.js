import React, { useState, useEffect } from "react";

function Courses() {
	const [course, setCourse] = useState([]);

	useEffect(() => {
		fetch(`/courses`)
			.then((res) => res.json())
			.then((jsonRes) => setCourse(jsonRes));
	}, []);

	return (
		<div>
			<div class="card-header align-text-center">
				<div class="wrapper mb-3">
					<div>ALL COURSES</div>
				</div>
			</div>
			{course.map((course) => {
				return (
					<div key={course.id}>
						<div class="card">
							<div class="row">
								<div class="col-md-4">
									<img
										src={course.images}
										alt=""
										class="img-fluid mt-4 mb-4 ms-2"
										width="230"
										height="160"
									/>
								</div>
								<div class="col-md-8">
									<div class="card-body">
										<h5>
											<strong>{course.title} </strong>
										</h5>
										<h6>{course.instructor} </h6>

										<p class="card-text">
											<small class="text-muted">
												Offered By: {course.offered_by}{" "}
											</small>
											<small class="text-muted">
												Course Type: {course.courseType}{" "}
											</small>
										</p>
										<a class="btn btn-primary" href="/courses/{course._id}">
											View Course {course.title}{" "}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Courses;
