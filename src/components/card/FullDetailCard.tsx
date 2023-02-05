import { FC, useEffect, useState } from 'react'

export interface FullDetailCardProps {
  poster: string[]
  title: string
  rating: string
  releasedYear: string
  runTime: string
  directorName: string
  language: string
  plot: string
  showPoster: boolean
  onClickPlay: () => unknown
  onClickWatchTrailer: () => unknown
}

export const FullDetailCard: FC<FullDetailCardProps> = ({
    poster,
    title,
    rating,
    releasedYear,
    runTime,
    directorName,
    language,
    plot,
    showPoster = false,
    onClickPlay,
    onClickWatchTrailer
}: FullDetailCardProps) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [imdbRating, setImdbRating] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prev => (prev === poster.length - 1 ? 0 : prev + 1 ))
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setImdbRating(rating)
        }, 500)
    }, [rating]);
    
    return (
        <div className="bg-[#394B61] h-full flex flex-row rounded-[11px] overflow-hidden">
            <img 
                className={`w-40 sm:w-56 xl:w-[340px] h-full object-cover
                    ${showPoster ? 'fadeInOut' : ' opacity-0'}
                `}
                src={poster[imageIndex]}
                alt={title}
            />

            <div className="card-right-content flex-1 p-3.5 sm:p-6 xl:pl-11 xl:pr-11 xl:pt-8 xl:pb-6 space-y-3 xl:space-y-6">
                <h2 className="text-[#D4D7DD] text-base lg:text-3xl font-bold">{title}</h2>

                <div className="flex items-center gap-3">
                    <div className={`w-28 bg-[#283647] rounded-full h-2 ${rating === 'N/A' ? ' bg-[#283647]/50' : ''}`}>
                        <div 
                            style={{
                                width: `${(parseFloat(imdbRating) / 10 * 100)}%`
                            }}
                            className="bg-[#00E0FF] w-0 h-2 rounded-full transition-all ease-out duration-1000" 
                        />
                    </div>

                    <span className="text-white text-xs lg:text-base font-semibold">{parseFloat(rating) || 0}/10</span>
                </div>

                <div className="space-y-3 lg:space-y-4">
                    <ul className="max-w-[168px] sm:max-w-lg flex flex-col text-[#D4D7DD] text-xs lg:text-base font-semibold whitespace-nowrap space-y-1">
                        <li className="inline-flex items-center">
                            <span className="min-w-[92px] lg:min-w-[140px] inline-block">Year:</span> 
                            <span className="truncate">{releasedYear}</span>
                        </li>
                        <li className="inline-flex items-center">
                            <span className="min-w-[92px] lg:min-w-[140px] inline-block">Running Time:</span> 
                            <span className="truncate">{runTime}</span>
                        </li>
                        <li className="inline-flex items-center">
                            <span className="min-w-[92px] lg:min-w-[140px] inline-block">Directed by:</span> 
                            <span className="truncate">{directorName}</span>
                        </li>
                        <li className="inline-flex items-center">
                            <span className="min-w-[92px] lg:min-w-[140px] inline-block">language:</span> 
                            <span className="truncate">{language}</span>
                        </li>
                    </ul>
                    
                    <p className="line-clamp-2 font-normal text-xs lg:text-sm leading-[18px] text-white">{plot}</p>

                    <div className="flex items-center gap-2 lg:gap-4">
                        <button
                            type='button'
                            className="bg-[#00E0FF] lg:w-40 h-9 lg:h-10 inline-flex items-center justify-center px-2 sm:px-3 lg:px-5 text-xs lg:text-base text-black font-bold rounded-md focus:outline-none"
                            onClick={onClickPlay}
                        >
                            Play Movie  
                        </button>
                        <button
                            type='button'
                            className="bg-transparent lg:w-40 h-9 lg:h-10 inline-flex items-center justify-center px-2 sm:px-3 lg:px-5 text-xs lg:text-base text-[#00E0FF] font-bold border border-[#00E0FF] rounded-md focus:outline-none"
                            onClick={onClickWatchTrailer}
                        >
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
