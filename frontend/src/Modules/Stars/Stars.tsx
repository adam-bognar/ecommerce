import { Star } from "lucide-react"

type Props = {
    rating: number
}

const Stars = ({rating}: Props) => {
  return (
    <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                        ))}
                    </div>
  )
}

export default Stars