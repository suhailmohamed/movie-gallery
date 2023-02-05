import { Sidebar } from './components/sidebar/Sidebar'
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
import { useRef, useState } from 'react'
import { IconClose } from './components/icons/IconClose'
import { MovieData } from './api/MoviewData'
import Fuse from 'fuse.js'
import { FullDetailCard } from './components/card/FullDetailCard'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState([0, 1])
  const [showFullDetailsCard, setShowFullDetailsCard] = useState(false)

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
                    ${isExpanded ? ' bg-[#1A2536]  lg:w-4/5 xl:w-[567px]' : ' w-14 cursor-pointer pointer-events-none'}
                  `}
                  onClick={() => {
                    setIsExpanded(true)
                    inputRef.current?.focus()
                  }}
                >
                  <IconSearch 
                    className={`absolute left-4 w-[23px] h-[23px] text-[#D4D7DD] ${isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`} 
                  />

                  <input
                    ref={inputRef}
                    type="search"
                    name="search"
                    id="search"
                    className={`bg-transparent w-full h-[55px] pl-[51px] pr-11 outline-none placeholder:text-[#7B828E] placeholder:text-lg lg:placeholder:text-[19px] placeholder:font-normal placeholder:transition-opacity placeholder:delay-150 placeholder:duration-500 text-lg lg:text-[21px] lg:leading-[44px] text-white font-semibold border-0
                      ${isExpanded ? ' placeholder:opacity-100' : ' placeholder:opacity-0'}
                    `}
                    placeholder="Title, Movies, Keyword"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsExpanded(false)
                      }
                    }}
                    value={searchQuery}
                  />

                  <button
                    type='button'
                    onClick={() => {
                      setSearchQuery('')
                      setIsExpanded(false)
                      inputRef.current?.focus()
                    }}
                    className={`absolute right-5 transition-opacity focus:outline-none ${isExpanded ? ' opacity-100 delay-200 duration-500' : ' opacity-0 delay-75'}`}
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
                    <div key={index.toString()} className="flex flex-col gap-6">
                      {result.map(( movie, i) => {
                        return (
                          <Transition 
                            key={i.toString()}
                            as={'div'}
                            show={showFullDetailsCard && selectedIndex[0] === index && selectedIndex[1] === i}
                            enter='transform transition duration-[400ms]'
                            enterFrom='opacity-0 scale-y-10'
                            enterTo='opacity-100 scale-y-100'
                            leave='transform duration-200 transition ease-in-out'
                            leaveFrom='opacity-100 scale-y-100'
                            leaveTo='opacity-0 scale-y-95'
                          >
                            <FullDetailCard 
                              poster={movie.Images}
                              title={movie.Title}
                              rating={movie.imdbRating}
                              releasedYear={movie.Year}
                              runTime={movie.Runtime}
                              directorName={movie.Director}
                              language={movie.Language}
                              plot={movie.Plot}
                            />
                          </Transition>
                        )
                      })}


                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-[26px]">
                        {result.map((movie, i) => {
                          return (
                            <Card 
                              key={i.toString()}
                              title={movie.Title}
                              poster={movie.Poster}
                              onClick={() => {
                                setSelectedIndex([index, i])
                                setShowFullDetailsCard(true)
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
