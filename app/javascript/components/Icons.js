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


export {
	Back,
	Cross,
	Info,
	Plus,
	ZoomOut
}
