import { Form, redirect, useActionData } from "react-router-dom";
import { postBlog } from "../api/api";
import { requireAuth } from "../utils/utils";

export async function createBlogsLoader({request}){
    const res=await requireAuth(request)
    if(res){
        return await requireAuth(request);
    }
    return ""
}

export async function blogPostAction({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  try {
    const data = await postBlog({ title, content });
    return redirect("/blogs");
  } catch (error) {
    return error.message
  }
}

export default function CreateBlog() {
  const data = useActionData();
  console.log(data);
  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-lg-10 offset-1">
            <h3>Create Blog</h3>
            <Form method="post" replace>
              <div className="mt-3">
                <label htmlFor="title">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
              </div>

              <div className="mt-3">
                <label htmlFor="title">Blog Title</label>
                <textarea
                  name="content"
                  id="content"
                  className="form-control"
                ></textarea>
              </div>

              <div className="mt-3">
                <button className="btn btn-primary">Post Blog</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
