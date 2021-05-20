import React, { useEffect, useRef, useState } from 'react'
import classNames from "classnames"

import { splitIntoLayers } from '../utils'

import HexGrid from './HexGrid'
import HexWrapper from './HexWapper'
import { Cross, Info, Plus } from './Icons'
import { Badge, TextBadge } from './Badge'
import { minZoomLevel } from '../constants'

const Home = ({allHexes, lastTileOrderPosition}) => {

  if (document && document.body) {
    document.body.classList.add("overflow-auto")
  }

	const [zoomLevel, setZoomLevel] = useState(minZoomLevel)

	const tiles = splitIntoLayers([...allHexes])

  const NumberOfLayers = tiles.length
  const LayerWithMostTiles = [...tiles].sort((a,b) => (
    b.length - a.length
  ))[0]

  const hexWrapperRef = useRef(null)

	let setupFocusedHexOrder = null
	if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexOrder = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexOrder, setFocusedHexOrder] = useState(setupFocusedHexOrder)
  const focusedHex = useRef(null)

  const [moreInfoShown, updateMoreInfoShown] = useState(false)
  const [infoBlockShown, setInfoBlockShown] = useState(!focusedHexOrder)

  useEffect(() => {
    if (!!focusedHexOrder) {
      setInfoBlockShown(false)
    }
  }, [focusedHexOrder])

	return (
    <>
      <HexWrapper
        ref={hexWrapperRef}
        minWidth={`${NumberOfLayers * 7 + 6}em`}
        minHeight={`${(LayerWithMostTiles.length - 1) * 6 + 14}em`}
      >
        <HexGrid
          lastTileOrderPosition={lastTileOrderPosition}
          tiles={tiles}
          hexWrapperRef={hexWrapperRef}
          focusedHex={focusedHex}
          focusedHexOrder={focusedHexOrder}
          setFocusedHexOrder={setFocusedHexOrder}
					zoomLevel={zoomLevel}
					setZoomLevel={setZoomLevel}
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
            <TextBadge href="/new"><Plus className="w-5 h-5 -ml-1 mr-2" /> Add a hexagon</TextBadge>
            <Badge onClick={() => setInfoBlockShown(false)}>
              <Cross className="w-6 h-6" />
            </Badge>
          </div>
        </div>
        :
        <div className="fixed bottom-0 right-0 mb-8 mr-8 flex">
          <Badge href="/new">
            <Plus className="w-6 h-6" />
          </Badge>
          <Badge
            className="ml-4"
            onClick={() => setInfoBlockShown(true)}
          >
            <Info className="w-6 h-6" />
          </Badge>
        </div>
      }
    </>
	)
}

export default Home
