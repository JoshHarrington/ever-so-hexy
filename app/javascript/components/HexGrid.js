import React, { useState, Fragment, useEffect, useRef } from 'react'

import { maxZoomLevel, minZoomLevel } from '../constants'

import { debounce } from '../utils'
import DraggyHex from './DraggyHex'

import Hex from './Hex'

const classNames = require('classnames')

const HexGrid = ({tiles, newHexId, currentColour, setPageReady, csrfToken}) => {

	useEffect(()=>  {
		if ("scrollRestoration" in window.history) {
				window.history.scrollRestoration = "manual"
			}
},[]);
	const [focusedHexId, setFocusedHexId] = useState(newHexId ? newHexId : null)

	const focusedHex = useRef(null)

  const [zoomLevel, setZoomLevel] = useState(minZoomLevel)

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


	if (document) {
		document.querySelector("html").style.fontSize = `${zoomLevel * screenSizeZoomIncrease * 100}%`
	}

  useEffect(() => {
    if (zoomLevel === minZoomLevel) {
      document.body.classList.remove("overflow-hidden")
      document.body.classList.add("overflow-auto")
    } else {
      document.body.classList.remove("overflow-auto")
      document.body.classList.add("overflow-hidden")
    }
  }, [zoomLevel])

  useEffect(() => {
		if (window && document && focusedHexId) {

			let focusedHexProps = focusedHex.current.getBoundingClientRect()

			const svgWidth = focusedHexProps.width
			const svgHeight = focusedHexProps.height

			const widthRatio = windowWidth.current / svgWidth
			const heightRatio = windowHeight.current / svgHeight

			const zoomLevelFromOrientation = (widthRatio >= heightRatio ? heightRatio : widthRatio ) * 0.8

			setZoomLevel(zoomLevelFromOrientation >= minZoomLevel ? zoomLevelFromOrientation : minZoomLevel)

			const svgLeftOffset = focusedHexProps.left
			const svgTopOffset = focusedHexProps.top

			const svgHalfWidth = svgWidth / 2
			const svgHalfHeight = svgHeight / 2

			const xScrollPosition = Math.round(((svgLeftOffset + svgHalfWidth + window.scrollX) * zoomLevelFromOrientation - (windowWidth.current / 2)))
			const yScrollPosition = Math.round(((svgTopOffset + svgHalfHeight + window.scrollY) * zoomLevelFromOrientation - (windowHeight.current / 2)))

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
  }, [focusedHexId, setPageReady]);

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
							trixels={t}
							csrfToken={csrfToken}
							className={classNames(
								`absolute transform`
							)}
							style={{
								transform: `translate(${leftTransform}rem, ${topTransform}rem)`,
								width: '6.6rem'
							}}
							currentColour={currentColour}
						/>
					} else {
						return <Hex
							onClick={
								!newHexId ?
								(e) => {
									if (document && window) {
										if (!focusedHexId) {
											setFocusedHexId(t.id)
										} else {
											setFocusedHexId(null)
											setZoomLevel(minZoomLevel)
										}
									}
								} :
								undefined
							}
							ref={t.id === focusedHexId ? focusedHex : undefined}
							id={t.id}
							trixels={t}
							focusedHexId={focusedHexId}
							key={`${li}-${ti}`}
							className={classNames(
								`absolute transform`,
								{"cursor-pointer": !newHexId}
							)}
							style={{
								transform: `translate(${leftTransform}rem, ${topTransform}rem)`,
								width: '6.6rem'
							}}
						/>
					}
				})}</Fragment>
			})}
    </>
	)
}

export default HexGrid
