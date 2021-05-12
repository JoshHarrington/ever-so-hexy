import React, { useEffect, useRef, useState } from 'react'
import classNames from "classnames"

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

	let setupFocusedHexId = null
	if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexId = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexId, setFocusedHexId] = useState(setupFocusedHexId)

  const [moreInfoShown, updateMoreInfoShown] = useState(false)
  const [infoBlockShown, setInfoBlockShown] = useState(!focusedHexId)

  useEffect(() => {
    if (!!focusedHexId) {
      setInfoBlockShown(false)
    }
  }, [focusedHexId])

	return (
    <>
      <HexWrapper
        ref={hexWrapperRef}
        minWidth={`${NumberOfLayers * 7 + 6}em`}
        minHeight={`${(LayerWithMostTiles.length - 1) * 6 + 14}em`}
      >
        <HexGrid
          lastTileId={lastTileId}
          tiles={tiles}
          hexWrapperRef={hexWrapperRef}
          focusedHexId={focusedHexId}
          setFocusedHexId={setFocusedHexId}
        />
      </HexWrapper>
      {infoBlockShown ?
        <div className="fixed bottom-0 right-0 bg-white shadow rounded-tl-16xl p-8 max-w-xs w-full">
          <h1 className="text-2xl font-bold mb-2">Ever So Hexy</h1>
          <p className="mb-5">An experimental collaborative art project by <a href="#na" className="font-bold">@Josh_Harrington</a> and <a href="#na" className="font-bold">@samlester</a></p>
          { moreInfoShown ?
            <div>
              <p>This is some more detail on the project</p>
            </div>
              :
            <button
              onClick={() => updateMoreInfoShown(true)}
              className="text-teal-600 font-bold"
            >More information</button>
          }
          <hr className="my-5" />
          <div className="flex items-center justify-between">
            <a
              href="/new"
              className={classNames(
                "border-0 border-solid shadow py-2 px-4 text-white rounded-full",
                "bg-teal-600 hover:bg-teal-700",
                "focus:outline-none mr-3",
                "flex items-center"
              )}
            >+ Add a hexagon</a>
            <button
              onClick={() => setInfoBlockShown(false)}
              className="px-4 py-2 bg-transparent border-0"
            >X</button>
          </div>
        </div>
        :
        <div className="fixed bottom-0 right-0 mb-8 mr-8 flex">
      <a
        href="/new"
            className={classNames(
              "border-0 border-solid shadow py-2 px-4 rounded-full",
              "focus:outline-none text-teal-600 bg-white w-12 h-12",
              "flex items-center justify-center"
            )}
          >+</a>
          <button
            onClick={() => setInfoBlockShown(true)}
            className={classNames(
              "border-0 border-solid shadow py-2 px-4 rounded-full",
              "focus:outline-none text-teal-600 bg-white w-12 h-12",
              "flex items-center justify-center ml-4"
            )}
          >i</button>
        </div>
      }
    </>
	)
}

export default Home
