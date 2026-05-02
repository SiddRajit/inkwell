import { Heart } from "lucide-react"
import { useState } from "react"

interface LikeButtonProps {
  likeCount: number
}

const LikeButton = ({ likeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false)

  return (
    <button
      onClick={() => setLiked((prev) => !prev)}
      className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-rose-500"
    >
      <Heart size={14} className={liked ? "fill-rose-500 text-rose-500" : ""} />
      <span className="text-xs">{liked ? likeCount + 1 : likeCount}</span>
    </button>
  )
}

export default LikeButton
