import { Search } from 'lucide-react'
import React from 'react'

type Props = {
  handleSearch: (e: any) => void
}

const MobileSearch = ({handleSearch}: Props) => {
  return (
    <div className="md:hidden flex flex-row p-4 pt-0 bg-gray-50">
          <button
            onClick={() => { }}
            className="border border-gray-300 rounded-lg p-3 hover:bg-gray-100 
                            active:bg-gray-150 cursor-pointer ml-2"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
  )
}

export default MobileSearch