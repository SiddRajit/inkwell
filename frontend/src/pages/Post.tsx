import { useParams } from "@tanstack/react-router"

const Post = () => {
  const { postId } = useParams({ from: "/post/$postId" })
  return <div>Post ID - {postId}</div>
}

export default Post
