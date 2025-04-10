import { MessageCircle, Star } from "lucide-react"
import { Product } from "../../Models"
import ReviewCard from "../ReviewCard/ReviewCard"
import Stars from "../Stars/Stars"

type Props = {
    product: Product
}

const Reviews = ({ product }: Props) => {

    const formatDate = (dateString: string) => {
        // Ensure we have a valid date string
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            return `${year}.${month}.${day}`;
        } catch (error) {
            console.error("Invalid date format:", dateString);
            return dateString;
        }
    }

    const reviews = product.reviews || []

    const avg = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0

    return (
        <div className={"mx-5"}>
            <article className={"container mx-auto bg-gradient-to-br from-neutral-800 to-neutral-700 shadow-lg rounded-xl overflow-hidden mb-12"}>
                <div className={"flex flex-col md:flex-row justify-between p-6 gap-2 md:gap-0"}>
                    <div className={"flex flex-row items-center "}>
                        <MessageCircle size={24} className={"mr-2 text-white"} />
                        <h1 className={"text-2xl text-white font-bold"}>Értékelések</h1>
                    </div>

                    <div className={"flex flex-row items-center "}>
                        <Stars rating={avg} />
                        <span className="text-md text-white font-bold">{avg} ({reviews.length} értékelés)</span>
                    </div>
                </div>
                <div class={"flex flex-col gap-4 mx-4 mb-4"}>
                    {reviews.map((review, index) => (
                        <ReviewCard rating={review.rating} username={review.username} textReview={review.textReview} date={formatDate(review.createdAt.toString())} />
                    ))}

                    <button class={"w-fit flex flex-row bg-gray-200 hover:bg-gray-300 py-3 px-5 rounded-xl gap-2 items-center justify-center hover:cursor-pointer"}>
                        <Star size={17} />
                        Írj véleményt
                    </button>
                </div>

            </article>
        </div>

    )
}

export default Reviews