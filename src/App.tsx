import './App.css'
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
  return (
    <div className="App">
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar 
          navigationLink={navigationLink}
        />        
      </div>

      <div className="flex flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-white">Hello World</h1>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
