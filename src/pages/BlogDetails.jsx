import { NavLink, useLoaderData } from "react-router-dom";
import { getSingleBlog } from "../api/api";

export async function blogDetailsLoader({ request, params }) {
  const id = params.id;
  const data = await getSingleBlog(id);
  return data;
}

export default function BlogDetails() {
    const data = useLoaderData()

    console.log(data)
  return (
    <>
    <div className="container mt-5">
        <h3>{data.title}</h3>
        <p>{data.content}</p>
        <NavLink to={`edit`} className="btn btn-sm btn-primary">Edit</NavLink>
        <NavLink to={`delete`} className="btn btn-sm btn-danger">Delete</NavLink>

    </div>
    
    </>
  )
}
