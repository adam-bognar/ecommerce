import { ArrowRight } from "lucide-react"

type Props = {}

const CallToAction = (props: Props) => {
  return (
    <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied customers and find your perfect products today.</p>
            <button className={"flex items-center m-auto bg-white text-black rounded-lg py-3 px-6 font-medium cursor-pointer hover:bg-gray-300"} >
              Explore Our Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </section>
  )
}

export default CallToAction