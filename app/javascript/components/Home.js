import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import Panzoom from '@panzoom/panzoom'

import { minPageHeight, minPageWidth, panScrollAndZoom } from '../utils'

import HexGrid from './HexGrid'
import HexWrapper from './HexWapper'
import HexLabel from './HexLabel'
import { Cross, Info, Plus, ZoomOut } from './Icons'
import { Badge, TextBadge } from './Badge'
import { minZoomLevel, defaultZoomLevel, maxZoomLevel } from '../constants'
import Tooltip from './Tooltip'

const Home = ({allHexes, lastHexOrderPosition}) => {

  useEffect(() => {
		if (document && document.body) {
			document.body.classList.add('overflow-auto')
		}
	}, [])

	const [zoomLevel, setZoomLevel] = useState(minZoomLevel)

	const hexes = [...allHexes]

  const hexWrapperRef = useRef(null)

	let setupFocusedHexOrder = null
	if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexOrder = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexOrder, setFocusedHexOrder] = useState(setupFocusedHexOrder)
  const focusedHex = useRef(null)

  const focusedHexInfo = allHexes.flat().find(hex => hex.order === focusedHexOrder)

  const [moreInfoShown, updateMoreInfoShown] = useState(false)
  const [infoBlockShown, setInfoBlockShown] = useState(!focusedHexOrder)

  useEffect(() => {
    if (!!focusedHexOrder) {
      setInfoBlockShown(false)
    }
  }, [focusedHexOrder])

  const [panzoom, setPanzoom] = useState(null)

	useEffect(() => {

    const panzoom = Panzoom(hexWrapperRef.current, {
      minScale: 1,
      maxScale: maxZoomLevel,
      origin: '0 0'
    })

    hexWrapperRef.current.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

    setPanzoom(panzoom)

		if (document && window && (!!focusedHexOrder || !!lastHexOrderPosition)) {
			let hex
			if (focusedHex.current) {
				hex = focusedHex.current
			} else if (focusedHexOrder) {
				hex = document.querySelector(`svg#id-${focusedHexOrder}`)
			}

			let lastHex
			if (lastHexOrderPosition) {
				lastHex = document.querySelector(`svg#id-${lastHexOrderPosition}`)
			}

			if (panzoom) {

				if (hex){
          panScrollAndZoom({panzoom, hex})
				} else {
					panzoom.zoom(defaultZoomLevel)
					setTimeout(() => {
						panzoom.pan(0,0)
					})
				}
			}

		}
	}, [focusedHexOrder, lastHexOrderPosition])


  useEffect(() => {
    if (infoBlockShown && panzoom) {
      setFocusedHexOrder(null)
      window.history.pushState("", "", window.location.origin)
      panzoom.zoom(defaultZoomLevel)
      setTimeout(() => {
        panzoom.pan(0,0)
      })
    }
  }, [panzoom, infoBlockShown])


  useEffect(() => {
    window.document.body.classList.add('bg-gray-100')
  }, [])

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
          panzoom={panzoom}
        />
      </HexWrapper>
      {infoBlockShown ?
        <div className={classNames(
          "fixed bottom-0 left-0",
          "overflow-scroll",
          "text-blueGray-800 w-screen",
          "bg-white shadow sm:rounded-tl-16xl",
          "p-8 sm:max-w-xs sm:top-auto sm:left-auto sm:right-0",
          "max-h-screen"
        )}>
          <h1 className="text-2xl font-black mb-2">Ever So Hexy</h1>
          <p className="mb-3">An experimental collaborative art project by <a href="https://twitter.com/Josh_Harrington" className="font-bold">@Josh_Harrington</a> and <a href="https://twitter.com/samlester" className="font-bold">@samlester</a></p>
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
            <TextBadge className="w-full justify-center" onClick={() => setInfoBlockShown(false)}>View hexagons</TextBadge>
            <p className="w-full text-center mt-4 w-3/4 text-sm text-gray-400">Add your own hexagon using a desktop browser</p>
          </div>
        </div>
        :
        <div className={classNames(
          "fixed top-0 p-8 w-full",
          "flex justify-end sm:justify-between",
          "sm:top-auto sm:bottom-0 sm:right-0",
          "pointer-events-none"
        )}>
            {focusedHexInfo &&
              <div className="sm:mr-16">
                <Tooltip className="pointer-events-auto" content="Zoom out">
                  <Badge
                    className="mr-auto"
                    onClick={() => {
                      panzoom.zoom(defaultZoomLevel)
                      setTimeout(() => {
                        panzoom.pan(0,0)
                      })
                      setFocusedHexOrder(null)
                      window.history.pushState("", "", window.location.origin)
                    }}
                  >
                    <ZoomOut className="w-6 w-6" />
                  </Badge>
                </Tooltip>
              </div>
            }
          <HexLabel
            focusedHexInfo={focusedHexInfo}
          />
          <div className="ml-auto flex gap-x-4">
            <Tooltip content="Create Hexagon" className="pointer-events-auto !hidden sm:!flex">
              <Badge href="/new">
                <Plus className="w-6 h-6" />
              </Badge>
            </Tooltip>
            <Tooltip content="Show info" className="pointer-events-auto ml-auto">
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
