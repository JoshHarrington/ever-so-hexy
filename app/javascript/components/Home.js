import React, { useRef } from 'react'

import { splitIntoLayers } from '../utils'

import HexGrid from './HexGrid'
import HexWrapper from './HexWapper'

const Home = ({allHexes, lastTileId}) => {

  if (document && document.body) {
    document.body.classList.add("overflow-auto")
  }

	const tiles = splitIntoLayers(allHexes)

  const NumberOfLayers = tiles.length
  const LayerWithMostTiles = [...tiles].sort((a,b) => (
    b.length - a.length
  ))[0]

  const hexWrapperRef = useRef(null)

	return (
    <>
      <HexWrapper
        ref={hexWrapperRef}
        width={`${NumberOfLayers * 7 + 6}rem`}
        height={`${(LayerWithMostTiles.length - 1) * 6 + 14}rem`}
      >
        <HexGrid
          lastTileId={lastTileId}
          tiles={tiles}
          hexWrapperRef={hexWrapperRef}
        />
      </HexWrapper>
      <a
        href="/new"
        className="fixed bottom-0 right-0 mr-8 mb-8 bg-gray-200 border-2 border-solid border-gray-400 shadow py-1 px-2 rounded text-lg"
      >New</a>
    </>
	)
}

export default Home
