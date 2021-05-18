import React, { useState, Fragment, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { maxZoomLevel, minZoomLevel } from '../constants'
import { debounce, zoomAndScroll } from '../utils'

import Hex from './Hex'

const HexGrid = ({
	tiles,
	newHexId,
	lastTileId,
	setPageReady,
	hexWrapperRef,
	focusedHexId,
	setFocusedHexId,
	focusedHex,
	zoomLevel,
	setZoomLevel,
	children
}) => {

	useEffect(()=>  {
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
			const focusedHexEl = focusedHex.current ? focusedHex.current : document.querySelector(`svg#id-${focusedHexId}`)
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

	return (
		<>
			{tiles.map((l, li) => {
				return <Fragment key={li}>{l.map((t, ti) => {
					const leftTransform = (li * 7) - (ti * 3.5)
					const topTransform = ti * 6

					if (Object.keys(t).length !== 0 && t[0].tile_id !== newHexId) {
						return <Hex
							onClick={
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
								}
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
			{children}
    </>
	)
}

export default HexGrid
