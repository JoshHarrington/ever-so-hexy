import React, { useState, Fragment, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { maxZoomLevel, minZoomLevel } from '../constants'
import { debounce, zoomAndScroll } from '../utils'

import Hex from './Hex'
import DraftHex from './DraftHex'

const HexGrid = ({
	tiles,
	newHexOrder,
	lastTileOrderPosition,
	setPageReady,
	hexWrapperRef,
	focusedHexOrder,
	setFocusedHexOrder,
	focusedHex,
	zoomLevel,
	setZoomLevel,
	children
}) => {

	useEffect(() =>  {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual"
		}
	},[]);

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
		if (document && window && !!lastTileOrderPosition) {
			const lastTile = document.querySelector(`svg#id-${lastTileOrderPosition}`)
			zoomAndScroll({
				elementProps: lastTile ? lastTile.getBoundingClientRect() : null,
				hexSizePercentage: 20,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [lastTileOrderPosition, setPageReady])

	useEffect(() => {
		if (document && window && !!focusedHexOrder) {
			const focusedHexEl = focusedHex.current ? focusedHex.current : document.querySelector(`svg#id-${focusedHexOrder}`)
			zoomAndScroll({
				elementProps: focusedHexEl ? focusedHexEl.getBoundingClientRect() : null,
				hexSizePercentage: 50,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [focusedHexOrder, setPageReady])

	return (
		<>
			{tiles.map((l, li) => {
				return <Fragment key={li}>{l.map((t, ti) => {

					if (Object.keys(t).length !== 0 && t.order !== newHexOrder) {
						if (!t.draft && t.trixels !== null) {
							return <Hex
								onClick={
									(e) => {
										if (document && window) {
											if (!focusedHexOrder || (focusedHexOrder && focusedHexOrder !== t.order)) {
												setFocusedHexOrder(t.order)
												window.history.pushState("", "", window.location.origin + `#${t.order}`)
											} else {
												setZoomLevel(minZoomLevel)
												setFocusedHexOrder(null)
												window.history.pushState("", "", window.location.origin)
											}
										}
									}
								}
								ref={t.order === focusedHexOrder ? focusedHex : undefined}
								order={t.order}
								trixels={t.trixels}
								focusedHexOrder={focusedHexOrder}
								newHexPage={!!newHexOrder}
								key={`${li}-${ti}`}
								className={classNames(
									`absolute transform`
								)}
							/>
						} else {
							return <DraftHex
								key={`${li}-${ti}`}
								order={t.order}
							/>
						}
					}
				})}</Fragment>
			})}
			{children}
    </>
	)
}

export default HexGrid
