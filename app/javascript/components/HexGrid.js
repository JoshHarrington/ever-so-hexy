import React, { useState, Fragment, useEffect, useRef } from 'react'

import { maxZoomLevel, minZoomLevel } from '../constants'

import { debounce } from '../utils'
import DraggyHex from './DraggyHex'

import Hex from './Hex'

const classNames = require('classnames')

const zoomAndScroll = ({
	elementProps,
	hexSizePercentage,
	window,
	zoomLevel,
	setPageReady,
	setZoomLevel
}) => {
	const svgWidth = elementProps.width
	const svgHeight = elementProps.height

	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight

	const widthRatio = svgWidth / windowWidth
	/// get the decimal fraction of the width of the svg of the total width of the window
	const heightRatio = svgHeight / windowHeight
	/// get the decimal fraction of the height of the svg of the total height of the window

	const orientationRatioToSizeOn = heightRatio >= widthRatio ? heightRatio : widthRatio

	let percentageSizeOfHex = hexSizePercentage / 100

	const newZoomLevel = zoomLevel * (percentageSizeOfHex / orientationRatioToSizeOn)
	setZoomLevel(newZoomLevel)

	const svgLeftOffset = elementProps.left
	const svgTopOffset = elementProps.top

	const svgHalfWidth = svgWidth / 2
	const svgHalfHeight = svgHeight / 2

	const xScrollPosition = Math.round(((svgLeftOffset + svgHalfWidth + window.scrollX) * (newZoomLevel / zoomLevel) - (windowWidth / 2)))
	const yScrollPosition = Math.round(((svgTopOffset + svgHalfHeight + window.scrollY) * (newZoomLevel / zoomLevel) - (windowHeight / 2)))

	const timeout = setTimeout(() => {
		window.scrollTo({
			top: yScrollPosition,
			left: xScrollPosition
		})
		if (setPageReady) {
			setPageReady(true)
		}
	}, 1)

	return () => clearTimeout(timeout)
}

const HexGrid = ({
	tiles,
	newHexId,
	lastTileId,
	currentColour,
	setPageReady,
	csrfToken,
	hexWrapperRef,
	newTileTrixels,
	setNewTileTrixels,
	publishAllowed,
	focusedHexId,
	setFocusedHexId
}) => {

	useEffect(()=>  {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual"
		}
	},[]);

	const focusedHex = useRef(null)

  const [zoomLevel, setZoomLevel] = useState(minZoomLevel)
	const zoomLevelRef = useRef(zoomLevel)

	useEffect(() => {
		zoomLevelRef.current = zoomLevel
	}, [zoomLevel])

  const [screenSizeZoomIncrease, changeScreenSizeZoomIncrease] = useState(window ? (window.innerWidth > 1200 ? 1.5 : 1) : 1)

  useEffect(() => {
    const debouncedKeydownEventFn = debounce((e) => {
        if (e.ctrlKey || e.metaKey) {
          if (e.key === '-') {
            // Ctrl / Cmd + '-' (zoom out)
            setZoomLevel((Math.floor(zoomLevel) - 1) > minZoomLevel ? Math.floor(zoomLevel) - 1 : minZoomLevel)
          }
          if (e.key === '=') {
            // Ctrl / Cmd + '=' (zoom in)
            setZoomLevel((Math.floor(zoomLevel) + 1) <= maxZoomLevel ? Math.floor(zoomLevel) + 1 : maxZoomLevel)
          }
          if (e.key === '0') {
            // Ctrl / Cmd + '0' (reset zoom)
            setZoomLevel(minZoomLevel)
          }
        }
      }, 100, true)
    let keydownFnName = () => {}
    window.addEventListener('keydown', keydownFnName = (e) => {
      if ((e.ctrlKey || e.metaKey) &&
          (e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault()
      }
      debouncedKeydownEventFn(e)
    })
    return () => window.removeEventListener('keydown', keydownFnName)
  }, [zoomLevel]);

  const windowWidth = useRef(window ? window.innerWidth : null)
  const windowHeight = useRef(window ? window.innerHeight : null)

  useEffect(() => {
    const handleResize = debounce(
      () => {
        const getWindowWidth = window.innerWidth
        windowWidth.current = getWindowWidth
        windowHeight.current = window.innerHeight
        if (getWindowWidth > 1200) {
          changeScreenSizeZoomIncrease(1.5)
        } else {
          changeScreenSizeZoomIncrease(1)
        }
      },
      400,
      false
    )
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, []);

	useEffect(() => {
		if (hexWrapperRef.current) {
			hexWrapperRef.current.style.fontSize = `${zoomLevel * screenSizeZoomIncrease * 100}%`
	}
	}, [hexWrapperRef.current, zoomLevel, screenSizeZoomIncrease])

	useEffect(() => {
		if (document && window && !!lastTileId) {
			zoomAndScroll({
				elementProps: document.querySelector(`svg#id-${lastTileId}`).getBoundingClientRect(),
				hexSizePercentage: 20,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [lastTileId, setPageReady])

	useEffect(() => {
		if (document && window && !!focusedHexId) {
			const focusedHexEl = focusedHex.current || document.querySelector(`svg#id-${focusedHexId}`)
			zoomAndScroll({
				elementProps: focusedHexEl.getBoundingClientRect(),
				hexSizePercentage: 50,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [focusedHexId, setPageReady])

	useEffect(() => {
		if (document && window && !!newHexId) {
			zoomAndScroll({
				elementProps: document.querySelector(`svg#id-${newHexId}`).getBoundingClientRect(),
				hexSizePercentage: 70,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [newHexId, setPageReady])

	return (
		<>
			{tiles.map((l, li) => {
				return <Fragment key={li}>{l.map((t, ti) => {
					const leftTransform = (li * 7) - (ti * 3.5)
					const topTransform = ti * 6

					if (Object.keys(t).length === 0 ) {
						return null
					} else if (t[0].tile_id === newHexId) {
						return <DraggyHex
							key={`${li}-${ti}`}
							ref={t[0].tile_id === focusedHexId ? focusedHex : undefined}
							focusedHexId={focusedHexId}
							id={t[0].tile_id}
							trixels={newTileTrixels}
							setNewTileTrixels={setNewTileTrixels}
							csrfToken={csrfToken}
							publishAllowed={publishAllowed}
							className={classNames(
								`absolute transform`
							)}
							style={{
								transform: `translate(${leftTransform}em, ${topTransform}em)`,
								width: '6.6em',
								clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
							}}
							currentColour={currentColour}
						/>
					} else {
						return <Hex
							onClick={
								!newHexId ?
								(e) => {
									if (document && window) {
										if (!focusedHexId || (focusedHexId && focusedHexId !== t[0].tile_id)) {
											setFocusedHexId(t[0].tile_id)
											window.history.pushState("", "", window.location.origin + `#${t[0].tile_id}`)
										} else {
											setZoomLevel(minZoomLevel)
											setFocusedHexId(null)
											window.history.pushState("", "", window.location.origin)
										}
									}
								} :
								undefined
							}
							ref={t[0].tile_id === focusedHexId ? focusedHex : undefined}
							id={t[0].tile_id}
							trixels={t}
							focusedHexId={focusedHexId}
							newHexPage={!!newHexId}
							key={`${li}-${ti}`}
							className={classNames(
								`absolute transform`
							)}
							style={{
								transform: `translate(${leftTransform}em, ${topTransform}em)`,
								width: '6.6em',
								clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
							}}
						/>
					}
				})}</Fragment>
			})}
    </>
	)
}

export default HexGrid
