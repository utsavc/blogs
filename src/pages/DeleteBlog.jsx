import { useLoaderData } from "react-router-dom";
import { deleteBlog } from "../api/api";
import { requireAuth } from "../utils/utils";

export async function deleteLoader({ request, params }) {
  const id = params.id;
  const res=await requireAuth(request)
  if(res){
      return await requireAuth(request);
  }
  try {
    const data = await deleteBlog(id);
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}
export default function DeleteBlog() {
  const res = useLoaderData();
  return (
    <>
      <h1> {res.message} </h1>
    </>
  );
}
