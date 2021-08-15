import React from 'react'

const Back = ({className, size}) => (
	<svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.6667 18.3333L5 11.6667L11.6667 5" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M26.3333 20.3332V16.9998C26.3333 15.5853 25.7714 14.2288 24.7712 13.2286C23.771 12.2284 22.4145 11.6665 21 11.6665H5" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M15.6668 26.9998L21.0002 26.9998C22.4146 26.9998 23.7712 26.4379 24.7714 25.4377C25.7716 24.4375 26.3335 23.081 26.3335 21.6665L26.3335 17.6665" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

const Cross = ({className, size}) => (
	<svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M24 8L8 24" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M8 8L24 24" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

const Info = ({className, size}) => (
	<svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27Z" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M16 21.3333V16" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M16 10.6665H16.0133" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

const Plus = ({className, size}) => (
	<svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 6V26" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M6 16H26" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

const ZoomOut = ({className, size}) => (
	<svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.33325 18.6665H13.3333V26.6665" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M26.6667 13.3335H18.6667V5.3335" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M18.6667 13.3333L28.0001 4" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M4 27.9998L13.3333 18.6665" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
)

const HexCentre = ({className, size}) => (
	<svg width={size} height={size} viewBox="0 0 36 38" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M28 22.7009V14.2991C27.9996 13.9308 27.9071 13.569 27.7315 13.2501C27.556 12.9312 27.3037 12.6664 27 12.4823L20 8.2814C19.696 8.09705 19.3511 8 19 8C18.6489 8 18.304 8.09705 18 8.2814L11 12.4823C10.6963 12.6664 10.444 12.9312 10.2685 13.2501C10.0929 13.569 10.0004 13.9308 10 14.2991V22.7009C10.0004 23.0692 10.0929 23.431 10.2685 23.7499C10.444 24.0688 10.6963 24.3336 11 24.5177L18 28.7186C18.304 28.9029 18.6489 29 19 29C19.3511 29 19.696 28.9029 20 28.7186L27 24.5177C27.3037 24.3336 27.556 24.0688 27.7315 23.7499C27.9071 23.431 27.9996 23.0692 28 22.7009Z" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M2 27.4443V33.0554C2 33.6077 2.44772 34.0554 3 34.0554H8.61111" stroke="currentColor" strokeWidth="2.67" strokeLinecap="round"/>
		<path d="M36 8.55566V2.94455C36 2.39227 35.5523 1.94455 35 1.94455H29.3889" stroke="currentColor" strokeWidth="2.67" strokeLinecap="round"/>
		<path d="M2 8.55566V2.94455C2 2.39227 2.44772 1.94455 3 1.94455H8.61111" stroke="currentColor" strokeWidth="2.67" strokeLinecap="round"/>
		<path d="M36 27.4443V33.0554C36 33.6077 35.5523 34.0554 35 34.0554H29.3889" stroke="currentColor" strokeWidth="2.67" strokeLinecap="round"/>
	</svg>
)


export {
	Back,
	Cross,
	Info,
	Plus,
	ZoomOut,
	HexCentre
}
