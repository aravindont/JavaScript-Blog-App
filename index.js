const blogPosts = document.querySelector(".read-blogs");
const titleInput = document.querySelector(".post-title");
const postDetailsInput = document.querySelector(".post-body");
const uploadButton = document.querySelector(".uploadBtn");
const postsNum = document.querySelector(".posts-number");
let posts = [];

// create new post
const uploadPost = async () => {
  if (titleInput.value === "") {
    alert("please give title");
    return;
  }
  if (postDetailsInput.value === "") {
    alert("please give post Details");
    return;
  }

  uploadButton.textContent = "uploading...";
  uploadButton.disabled = true;
  blogPosts.innerHTML = "<h2>updating posts....</h2>";
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: titleInput.value,
      body: postDetailsInput.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      posts.unshift(json);
    })
    .then(() => {
      showPosts();
    });
  titleInput.value = "";
  postDetailsInput.value = "";
  uploadButton.textContent = "add posts";
  uploadButton.disabled = false;
};

//
uploadButton.addEventListener("click", () => {
  uploadPost();
});

//get all posts
const getPosts = async () => {
  blogPosts.innerHTML = "<h2>Getting posts....</h2>";
  await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => posts.push(...data))
    .then(() => {
      showPosts();
    });
};

// show/render posts
function showPosts() {
  blogPosts.innerHTML = null;
  postsNum.innerHTML = `(${posts.length})`;
  posts.forEach((post) => {
    const createPost = document.createElement("div");
    createPost.setAttribute("class", "blog-post-div");
    createPost.setAttribute("id", post.id);
    createPost.innerHTML = `
                  <h3 class="post-title">
                 Title : ${post.title}
                  </h3>
                  <p>Id: ${post.id}</p>
                  <p class="post-para">
                  ${post.body}
                  </p>
                  <button class='delete-post-btn' onclick="deletePost(${post.id})">Delete Post</button>
              
        `;

    blogPosts.append(createPost);
  });
}

getPosts();

// delete post
function deletePost(id) {
  posts = posts.filter((post) => {
    return post.id !== id;
  });

  showPosts();
}
