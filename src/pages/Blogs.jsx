import { NavLink, useLoaderData } from "react-router-dom";
import { requireAuth } from "../utils/utils";
import { allBlogs } from "../api/api";

export async function blogsLoader({ request }) {
  const res = await requireAuth(request);
  if (res) {
    return await requireAuth(request);
  } else {
    const data = await allBlogs();
    return data;
  }
}

export default function () {
  const data = useLoaderData();
  console.log(data)
  const blogData=data.map(blogs=>(
    <div key={blogs.id}>
    {blogs.title} <NavLink to={`${blogs.id}`}>View..</NavLink>
    </div>
  ))

  

  return (
    <>
      <div className="container-fluid p-5">
        <h4>Blog Lists</h4>
        {blogData}
      </div>
    </>
  );
}
