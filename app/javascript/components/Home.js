import React, { useEffect, useRef, useState } from 'react'

import { minPageHeight, minPageWidth, splitIntoLayers } from '../utils'

import HexGrid from './HexGrid'
import HexWrapper from './HexWapper'
import HexLabel from './HexLabel'
import { Cross, Info, Plus, ZoomOut } from './Icons'
import { Badge, TextBadge } from './Badge'
import { minZoomLevel } from '../constants'
import Tooltip from './Tooltip'

const Home = ({allHexes, lastHexOrderPosition}) => {

  if (document && document.body) {
    document.body.classList.add("overflow-auto")
  }

	const [zoomLevel, setZoomLevel] = useState(minZoomLevel)

	const hexes = splitIntoLayers([...allHexes])

  const hexWrapperRef = useRef(null)

	let setupFocusedHexOrder = null
	if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexOrder = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexOrder, setFocusedHexOrder] = useState(setupFocusedHexOrder)
  const focusedHex = useRef(null)

  const focusedHexInfo = allHexes.find(hex => hex.order === focusedHexOrder);

  const [moreInfoShown, updateMoreInfoShown] = useState(false)
  const [infoBlockShown, setInfoBlockShown] = useState(!focusedHexOrder)

  useEffect(() => {
    if (!!focusedHexOrder) {
      setInfoBlockShown(false)
    }
  }, [focusedHexOrder])

  useEffect(() => {
    if (infoBlockShown) {
      setFocusedHexOrder(null)
      setZoomLevel(minZoomLevel)
      window.history.pushState("", "", window.location.origin)
    }
  }, [infoBlockShown])

	return (
    <>
      <HexWrapper
        ref={hexWrapperRef}
        minWidth={minPageWidth(hexes)}
        minHeight={minPageHeight(hexes)}
      >
        <HexGrid
          lastHexOrderPosition={lastHexOrderPosition}
          hexes={hexes}
          hexWrapperRef={hexWrapperRef}
          focusedHex={focusedHex}
          focusedHexOrder={focusedHexOrder}
          setFocusedHexOrder={setFocusedHexOrder}
					zoomLevel={zoomLevel}
					setZoomLevel={setZoomLevel}
        />
      </HexWrapper>
      {infoBlockShown ?
        <div className="fixed bottom-0 right-0 text-blueGray-800 w-full bg-white shadow sm:rounded-tl-16xl p-8 sm:max-w-xs">
          <h1 className="text-2xl font-black mb-2">Ever So Hexy</h1>
          <p className="mb-3">An experimental collaborative art project by <a href="#na" className="font-bold">@Josh_Harrington</a> and <a href="#na" className="font-bold">@samlester</a></p>
          { moreInfoShown ?
            <div>
              <p className="mb-3">This project is designed to be a more pleasant way of spending that spare couple of minutes in your day. It's meant to be a palette-cleanser for your mind!</p>

              <p className="mb-3">Create your own interesting shapes and patterns. Get inspired by other people creating fun hexagon designs. Find ways to link designs together in ways their creators didn't imagine.</p>

              <p>This is a calm and welcoming place to design whatever hexagon you want, bear in mind we'll be removing any hexagons which don't fit that mindset.</p>
            </div>
              :
            <button
              onClick={() => updateMoreInfoShown(true)}
              className="text-teal-600 font-bold"
            >More information</button>
          }
          <hr className="my-5" />
          <div className="flex items-center justify-between hidden sm:flex">
            <TextBadge href="/new"><Plus className="w-5 h-5 -ml-1 mr-2" /> Add a hexagon</TextBadge>

            <Tooltip content="Hide info">
              <Badge
                onClick={() => setInfoBlockShown(false)}
              >
                <Cross className="w-6 h-6" />
              </Badge>
            </Tooltip>
          </div>
          <div className="flex flex-wrap justify-center sm:hidden">
            <TextBadge className="w-full text-center" onClick={() => setInfoBlockShown(false)}>View hexagons</TextBadge>
            <p className="w-full text-center mt-4 w-3/4 text-sm text-gray-400">Add your own hexagon using a desktop browser</p>
          </div>
        </div>
        :
        <div className="fixed top-0 p-8 w-full flex justify-between sm:justify-end sm:top-auto sm:bottom-0 sm:right-0">
          {focusedHexInfo &&
            <Tooltip content="Zoom out" >
              <Badge
                className="mr-auto"
                onClick={() => {
                  setZoomLevel(minZoomLevel)
                  setFocusedHexOrder(null)
                  window.history.pushState("", "", window.location.origin)
                }}
              >
                <ZoomOut className="w-6 w-6" />
              </Badge>
            </Tooltip>
          }
          <HexLabel
            focusedHexInfo={focusedHexInfo}
          />
          <div className="flex gap-x-4">
            <Tooltip content="Create Hexagon">
              <Badge href="/new" className="invisible sm:visible">
                <Plus className="w-6 h-6" />
              </Badge>
            </Tooltip>
            <Tooltip content="Show info">
              <Badge
                onClick={() => setInfoBlockShown(true)}
              >
                <Info className="w-6 h-6" />
              </Badge>
            </Tooltip>
          </div>
        </div>
      }
    </>
	)
}

export default Home
