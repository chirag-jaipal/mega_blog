import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import blogService from "../appwrite/blog";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      blogService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          }
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
