import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login, { loginAction, loginLoader } from './pages/Login';
import Register, { registerAction, registerLoder } from './pages/Register';
import Blogs, { blogsLoader } from './pages/Blogs';
import BlogOutlet from './Outlet/BlogOutlet';
import CreateBlog, { blogPostAction, createBlogsLoader } from './pages/CreateBlog';
import NotFound from './pages/NotFound';
import BlogDetails, { blogDetailsLoader } from './pages/BlogDetails';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import DeleteBlog, { deleteLoader } from './pages/DeleteBlog';
import BlogEdit, { blogEditAction, blogEditLoader } from './pages/BlogEdit';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route index element={<Login />} action={loginAction} />
    <Route path='login' element={<Login />} action={loginAction} loader={loginLoader} />
    <Route path='register' element={<Register />} action={registerAction} loader={registerLoder} />
    <Route path='blogs' element={<BlogOutlet />}>
      <Route index element={<Blogs />}   loader={blogsLoader}/>
      <Route path=":id" element={<BlogDetails/>} loader={blogDetailsLoader}/>
      <Route path=":id/edit" element={<BlogEdit/>} loader={blogEditLoader} action={blogEditAction}/>
      <Route path=":id/delete" element={<DeleteBlog/>} loader={deleteLoader}/>
      <Route path="create" element={<CreateBlog />} action={blogPostAction} loader={createBlogsLoader} />
    </Route>

    <Route path='*' element={<NotFound/>}/>


  </Route>

))
root.render(<RouterProvider router={router} />);

