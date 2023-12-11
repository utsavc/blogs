export async function loginUser(creds) {
  try {
    const response = await fetch("http://localhost/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: creds.username,
        password: creds.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error.message);
    console.log(error);
    throw error;
  }
}

export async function postBlog(blogs) {
  const endpoint = "http://localhost/api/create_blog.php";
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        title: blogs.title,
        content: blogs.content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function editBlog(blogs) {
  const id = blogs.id;
  const endpoint = `http://localhost/api/edit_blog.php?id={id}`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({blogs}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function registerUser(creds) {
  const endpoint = "http://localhost/api/register.php";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: creds.username,
        password: creds.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    // console.log("Error:", error.message);
    // console.log(error);
    throw error;
  }
}

export async function getSingleBlog(id) {
  const endpoint = "http://localhost/api/get_blog.php?id=" + id;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error", errorData.message);
      throw {
        message: errorData.message,
        statusText: errorData.statusText,
        status: errorData.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBlog(id) {
  const endpoint = `http://localhost/api/delete_blog.php?id=${id}`;
  const token = localStorage.getItem("token");
  
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    // Check if the status code indicates an error
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Caught Error:", error);
    throw error;
  }
}



export async function allBlogs() {
  const endpoint = "http://localhost/api/get_all_blogs.php";
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      throw {
        message: errorData.message,
        statusText: response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
