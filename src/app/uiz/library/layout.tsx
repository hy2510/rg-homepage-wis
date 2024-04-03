'use client'

import { useScreenMode } from '@/ui/context/StyleContext'
import BookSearchBar from '@/ui/modules/library-book-search-bar/BookSearchBar'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const isPC = useScreenMode() === 'pc'
  return (
    <div className="container compact">
      {isPC && <BookSearchBar />}
      {children}
    </div>
  )
}
