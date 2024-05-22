import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

export default function Rating({ rating = 0 }) {
    const fullStars = Math.floor(Number(rating)); // Chuyển đổi rating thành số
    const restStarPercentage = (Number(rating) - fullStars) * 100;

    return (
        <div className="text-base transform origin-right mt-4 ml-auto flex">
            {/* Render filled stars */}
            {[...Array(fullStars)].map((_, index) => (
                <div key={index} className="relative inline-block w-4 h-4">
                    <div className="star__lit" style={{ width: "100%" }}>
                        <FontAwesomeIcon className="block w-4 h-4 text-yellow-400" icon={fasStar} />
                    </div>
                    <FontAwesomeIcon className="block text-yellow-400 absolute top-0 left-0 w-full h-full" icon={farStar} />
                </div>
            ))}

            {/* Render partial star if needed */}
            {restStarPercentage > 0 &&
                <div className="relative inline-block w-4 h-4">
                    <div className="sabsolute left-0 w-full h-full overflow-hidden top-1" style={{ width: `${restStarPercentage}%` }}>
                        <FontAwesomeIcon className="block w-4 h-4 text-yellow-400" icon={fasStar} />
                    </div>
                    <FontAwesomeIcon className="block text-yellow-400 absolute top-0 left-0 w-full h-full" icon={farStar} />
                </div>
            }

            {/* Render remaining empty stars */}
            {[...Array(5 - fullStars - (restStarPercentage > 0 ? 1 : 0))].map((_, index) => (
                <div key={index + fullStars} className="relative inline-block w-4 h-4">
                    <div className="sabsolute left-0 w-full h-full overflow-hidden top-1" style={{ width: "0%" }}>
                        <FontAwesomeIcon className="block w-4 h-4 text-yellow-400" icon={fasStar} />
                    </div>
                    <FontAwesomeIcon className="block text-yellow-400 absolute top-0 left-0 w-full h-full" icon={farStar} />
                </div>
            ))}
        </div>
    )
}
