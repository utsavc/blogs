import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { editBlog, getSingleBlog, postBlog } from "../api/api";

export async function blogEditLoader({ request, params }) {
  const id = params.id;
  const data = await getSingleBlog(id);
  return data;
}

export async function blogEditAction({ request, params }) {
  const id = params.id;
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  try {
    const data = await editBlog({ title,content,id});
    console.log(data)
    return data;
  } catch (error) {
    return error.message;
  }
}
export default function BlogEdit() {
  const data = useLoaderData();
  const dataAction = useActionData();
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
                  defaultValue={data.title}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="content">Blog Content</label>
                <textarea
                  name="content"
                  id="content"
                  className="form-control"
                  defaultValue={data.content}
                />
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
