import React, { useState, Fragment, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { maxZoomLevel, minZoomLevel } from '../constants'
import { debounce, zoomAndScroll } from '../utils'

import HexOuter from './HexOuter'

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
						return <HexOuter
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
							focusedHexOrder={focusedHexOrder}
							newHexPage={!!newHexOrder}
							key={`${li}-${ti}`}
							className={classNames(
								`absolute transform`
							)}
						>
							{(!t.draft && t.trixels !== null) ?
								t.trixels.map((tr, i) => <path
									fill={tr.colour}
									d={tr.d}
									key={i}
								></path>)
							: <>
								<path fillRule="evenodd" clipRule="evenodd" d="M78.75 0.711426L156.75 45.7114V135.711L78.75 180.711L0.75 135.711V45.7114L78.75 0.711426Z" fill="#E5E7EB"/>
								<path d="M58.966 97C62.1659 97 64.9047 94.3151 64.9318 90.9726C64.9047 87.6849 62.1659 85 58.966 85C55.6577 85 52.9731 87.6849 53.0002 90.9726C52.9731 94.3151 55.6577 97 58.966 97ZM78.6803 97C81.8802 97 84.619 94.3151 84.6461 90.9726C84.619 87.6849 81.8802 85 78.6803 85C75.372 85 72.6874 87.6849 72.7145 90.9726C72.6874 94.3151 75.372 97 78.6803 97ZM98.3675 97C101.567 97 104.306 94.3151 104.333 90.9726C104.306 87.6849 101.567 85 98.3675 85C95.0592 85 92.3746 87.6849 92.4017 90.9726C92.3746 94.3151 95.0592 97 98.3675 97Z" fill="#94A3B8"/>
							</>}
						</HexOuter>
					}
				})}</Fragment>
			})}
			{children}
    </>
	)
}

export default HexGrid
