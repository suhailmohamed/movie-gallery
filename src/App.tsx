import { Sidebar } from './components/sidebar/Sidebar'
import ericHoffman from './assets/eric_hoffman.png'
import { IconHeart } from './components/icons/IconHeart'
import { IconList } from './components/icons/IconList'
import { IconLogout } from './components/icons/IconLogout'
import { IconMovie } from './components/icons/IconMovie'
import { IconPlaylist } from './components/icons/IconPlaylist'
import { IconSearch } from './components/icons/IconSearch'
import { IconSetting } from './components/icons/IconSetting'
import { IconTvShow } from './components/icons/IconTvShow'
import { IconWatchLater } from './components/icons/IconWatchLater'
import { IconDayMode } from './components/icons/IconDayMode'
import { IconDotsVertical } from './components/icons/IconDotsVertical'
import { Card } from './components/card/Card'
import { Fragment, useRef, useState } from 'react'
import { IconClose } from './components/icons/IconClose'
import { MovieData } from './api/MovieData'
import Fuse from 'fuse.js'
import { ExpandedCard } from './components/card/ExpandedCard'
import { MobileHeader } from './components/mobileheader/MobileHeader'
import { toast, Toaster } from 'react-hot-toast'
import chunk from 'lodash.chunk'
import { Transition } from '@headlessui/react'
import { useIsMobile } from './hooks/useIsMobile'
import { useIsTablet } from './hooks/useIsTablet'

const navigationLink = [
  {
    links: [
      { icon: IconSearch, name: 'Discover', href: '#', current: true },
      { icon: IconPlaylist, name: 'Playlist', href: '#', current: false },
      { icon: IconMovie, name: 'Movie', href: '#', current: false },
      { icon: IconTvShow, name: 'TV Shows', href: '#', current: false },
      { icon: IconList, name: 'My List', href: '#', current: false }
    ]
  },
  {
    links: [
      { icon: IconWatchLater, name: 'Watch Later', href: '#', current: false },
      { icon: IconHeart, name: 'Recomended', href: '#', current: false }
    ]
  },
  {
    links: [
    { icon: IconSetting, name: 'Settings', href: '#', current: false },
    { icon: IconLogout, name: 'Logout', href: '#', current: false }
  ]
  }
]


function App() {
  const isMobileDevice = useIsMobile()
  const isTablet = useIsTablet()
  // Sidebar Open State 
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Search Input Expanded State 
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  // Search Query State
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Card Component States 
  const [selectedIndex, setSelectedIndex] = useState([0, 0])
  const [showExpandedCard, setShowExpandedCard] = useState(false)


  // movies data 
  const movieList = MovieData

  const fuse = new Fuse(movieList, {
    includeMatches: true,
    includeScore: true,
    keys: ['Title', 'Director', 'Language', 'Year'],
    threshold: 0.3
  })
  const result = searchQuery ? fuse.search(searchQuery).map((each) => each.item) : movieList

  const chunkSize = isMobileDevice ? 2 : isTablet ? 3 : 5
  const resultChunk = chunk(result, chunkSize)
  
  return (
    <div className="App">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar 
          openSidebar={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          userDetails={{
            avatar: ericHoffman,
            name: 'Eric Hoffman'
          }}
          navigationLink={navigationLink}
        />        
      </div>

      <div className="flex flex-col lg:pl-64">
        <main className="flex flex-col flex-1 gap-3">
          <MobileHeader 
            openSidebar={() => setSidebarOpen(true)}
            onClickDayModeIcon={() => toast('Clicked Day Mode Icon')}
            onClickDotsVerticalIcon={() => toast('Clicked Dots Vertical Icon')}
          />

          <div className="flex flex-col gap-6 lg:gap-10 p-4 pb-12 lg:p-12">
            {/* Mobile Search Section Starts Here */}
            <div className="flex lg:hidden flex-1 items-center">
              <div className="group relative bg-[#1A2536] w-full flex flex-shrink-0 items-center rounded-lg transition-all delay-100 overflow-hidden">
                <IconSearch  className="absolute left-4 w-[23px] h-[23px] text-[#D4D7DD] pointer-events-none" />

                <input
                  ref={inputRef}
                  type="search"
                  name="search"
                  id="search"
                  className="bg-transparent w-full h-[55px] pl-[51px] pr-11 text-lg placeholder:text-[#7B828E] placeholder:font-normal placeholder:transition-opacity placeholder:delay-150 placeholder:duration-500 text-white font-semibold border-0 outline-none"
                  placeholder="Title, Movies, Keyword"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />

                {searchQuery && (
                  <button
                    type='button'
                    onClick={() => {
                      setSearchQuery('')
                      inputRef.current?.focus()
                    }}
                    className="absolute right-5 transition-opacity focus:outline-none"
                  >
                    <span className="sr-only">Clear Input Field</span>
                    <IconClose className="w-4 h-4 text-[#D4D7DD]" />
                  </button>
                )}
              </div>
            </div>
            {/* Mobile Search Section Ends Here */}

            {/* Tablet & Desktop Search Section Starts Here */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex flex-1 items-center">
                <div className={`group relative flex flex-shrink-0 items-center rounded-lg transition-all delay-100 overflow-hidden
                    ${isSearchExpanded ? ' bg-[#1A2536]  lg:w-4/5 xl:w-[567px]' : ' w-14 cursor-pointer pointer-events-none'}
                  `}
                  onClick={() => {
                    setIsSearchExpanded(true)
                    inputRef.current?.focus()
                  }}
                >
                  <IconSearch 
                    className={`absolute left-4 w-[23px] h-[23px] text-[#D4D7DD] ${isSearchExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`} 
                  />

                  <input
                    ref={inputRef}
                    type="search"
                    name="search"
                    id="search"
                    className={`bg-transparent w-full h-[55px] pl-[51px] pr-11 outline-none placeholder:text-[#7B828E] placeholder:text-lg lg:placeholder:text-[19px] placeholder:font-normal placeholder:transition-opacity placeholder:delay-150 placeholder:duration-500 text-lg lg:text-[21px] lg:leading-[44px] text-white font-semibold border-0
                      ${isSearchExpanded ? ' placeholder:opacity-100' : ' placeholder:opacity-0'}
                    `}
                    placeholder="Title, Movies, Keyword"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsSearchExpanded(false)
                      }
                    }}
                    value={searchQuery}
                  />

                  <button
                    type='button'
                    onClick={() => {
                      setSearchQuery('')
                      setIsSearchExpanded(false)
                      inputRef.current?.focus()
                    }}
                    className={`absolute right-5 transition-opacity focus:outline-none ${isSearchExpanded ? ' opacity-100 delay-200 duration-500' : ' opacity-0 delay-75'}`}
                  >
                    <span className="sr-only">Clear Input Field</span>
                    <IconClose className="w-4 h-4 text-[#D4D7DD]" />
                  </button>
                </div>
                
                <div className="flex items-center gap-[25px] ml-auto">
                  <button 
                    type='button' 
                    className="group focus:outline-none"
                    onClick={() => toast('Clicked Day Mode Icon')}
                  >
                    <span className="sr-only">Icon Day mode</span>
                    <IconDayMode className="w-6 h-6 text-[#D4D7DD] group-hover:text-[#D4D7DD]/80 transition-colors" />
                  </button>

                  <button 
                    type='button' 
                    className="group focus:outline-none"
                    onClick={() => toast('Clicked Dots Vertical Icon')}
                  >
                    <span className="sr-only">Icon Dots vertical</span>
                    <IconDotsVertical className="w-6 h-6 text-[#D4D7DD] group-hover:text-[#D4D7DD]/80 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
            {/* Tablet & Desktop Search Section Starts Here */}

            {resultChunk.length ? (
              <>
                {resultChunk.map((result , index)  => {
                  return (
                    <div key={index.toString()} className="flex flex-col gap-6 scroll-pt-0.5">
                      {result.map(( movie, i) => {
                        if(selectedIndex[0] === index && selectedIndex[1] === i) {
                          return (
                            <Transition 
                              key={i.toString() + index.toString()}
                              as={Fragment}
                              show={showExpandedCard}
                              enter="transition-opacity duration-75"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div id="cover" className="relative h-72 lg:h-[388px] scroll-mt-6">
                                <div className="expanded-card-wrapper w-full absolute top-2/4 -translate-y-2/4 transform transition-all duration-700">
                                  <ExpandedCard 
                                    poster={movie.Images}
                                    title={movie.Title}
                                    rating={movie.imdbRating}
                                    releasedYear={movie.Year}
                                    runTime={movie.Runtime}
                                    directorName={movie.Director}
                                    language={movie.Language}
                                    plot={movie.Plot}
                                    onClickPlay={() => toast(`Play ${movie.Title} movie`)}
                                    onClickWatchTrailer={() => toast(`Watch ${movie.Title} movie trailer`)}
                                  />
                                </div>
                              </div>
                            </Transition>
                          )
                        }
                        return null
                      })}


                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-[26px]">
                        {result.map((movie, i) => {
                          return (
                            <Card 
                              key={i.toString() + index.toString()}
                              title={movie.Title}
                              poster={movie.Poster}
                              onClick={() => {
                                setSelectedIndex([index, i])
                                if(selectedIndex[0] === index && selectedIndex[1] === i) {
                                  setShowExpandedCard(!showExpandedCard)
                                } else {
                                  setShowExpandedCard(true)
                                }
                                setTimeout(() => {
                                  document.querySelector("#cover")?.scrollIntoView({behavior: 'smooth', block: 'center'});
                                }, 100)
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })} 
              </>
            ) : (
              <p className="text-white text-lg lg:text-[21px] leading-[44px] font-semibold">
                No results found for your search.
              </p>
            )}
          </div>
        </main>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
