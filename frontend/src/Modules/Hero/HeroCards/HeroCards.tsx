import { Package } from "lucide-react";
import { Link } from "wouter";

type Props = {
    children: React.ReactNode,
    title: string,
    description: string,
}

export function HeroCard({ children, title, description }: Props) {
    return (
            <Link href={`/products`}>
            <div className="hover:cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start space-x-6">
                    <div className="bg-amber-300/10 p-4 rounded-xl">
                        {children}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                        <p className="text-neutral-300">{description}</p>
                    </div>
                </div>
            </div>
            </Link>
    )
}