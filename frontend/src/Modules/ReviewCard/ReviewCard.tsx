import Stars from "../Stars/Stars"


type Props = {
  rating: number,
  username: string,
  date: string,
  textReview: string
}

const ReviewCard = ({rating, username, date, textReview}: Props) => {
  return (
    <section className={"flex flex-col border border-gray-200 rounded-lg p-4 gap-1"}>
        <h1 className={"text-xl text-white font-bold"}>{username}</h1>
        <p className={"text-sm text-gray-400 mb-2"}>{date}</p>
        <Stars rating={rating}/>
        <p className={"text-lg text-white mt-2"}>{textReview}</p>
    </section>
  )
}

export default ReviewCard