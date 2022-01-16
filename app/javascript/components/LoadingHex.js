import React from 'react'
const colors = require('tailwindcss/colors')

import Trixels from './Trixels'

const LoadingHex = () => {

  return (
    <svg
      id="loading-hex"
      viewBox="0 0 156 180"
      width="300px"
      className="opacity-30 w-64 h-72 relative flex-shrink-0 animate-pulse animate-stepped-spin max-w-[40vw]"
      style={{
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
      }}
    >
      <Trixels hex={{
        trixel_colour_a1: colors.emerald[500],
        trixel_colour_a2: colors.emerald[300],
        trixel_colour_a3: colors.emerald[300],
        trixel_colour_a4: colors.emerald[300],
        trixel_colour_a5: colors.emerald[300],
        trixel_colour_a6: colors.emerald[300],
        trixel_colour_a7: colors.emerald[300],
        trixel_colour_b1: colors.emerald[500],
        trixel_colour_b2: colors.emerald[500],
        trixel_colour_b3: colors.emerald[500],
        trixel_colour_b4: colors.emerald[300],
        trixel_colour_b5: colors.emerald[300],
        trixel_colour_b6: colors.emerald[300],
        trixel_colour_b7: colors.emerald[300],
        trixel_colour_b8: colors.emerald[300],
        trixel_colour_b9: colors.emerald[300],
        trixel_colour_c1: colors.emerald[500],
        trixel_colour_c2: colors.emerald[500],
        trixel_colour_c3: colors.emerald[500],
        trixel_colour_c4: colors.emerald[500],
        trixel_colour_c5: colors.emerald[500],
        trixel_colour_c6: colors.emerald[300],
        trixel_colour_c7: colors.emerald[300],
        trixel_colour_c8: colors.emerald[300],
        trixel_colour_c9: colors.emerald[300],
        trixel_colour_c10: colors.emerald[300],
        trixel_colour_c11: colors.emerald[300],
        trixel_colour_d1: colors.emerald[500],
        trixel_colour_d2: colors.emerald[500],
        trixel_colour_d3: colors.emerald[500],
        trixel_colour_d4: colors.emerald[500],
        trixel_colour_d5: colors.emerald[500],
        trixel_colour_d6: colors.emerald[400],
        trixel_colour_d7: colors.emerald[400],
        trixel_colour_d8: colors.emerald[400],
        trixel_colour_d9: colors.emerald[400],
        trixel_colour_d10: colors.emerald[400],
        trixel_colour_d11: colors.emerald[400],
        trixel_colour_e1: colors.emerald[500],
        trixel_colour_e2: colors.emerald[500],
        trixel_colour_e3: colors.emerald[500],
        trixel_colour_e4: colors.emerald[400],
        trixel_colour_e5: colors.emerald[400],
        trixel_colour_e6: colors.emerald[400],
        trixel_colour_e7: colors.emerald[400],
        trixel_colour_e8: colors.emerald[400],
        trixel_colour_e9: colors.emerald[400],
        trixel_colour_f1: colors.emerald[500],
        trixel_colour_f2: colors.emerald[400],
        trixel_colour_f3: colors.emerald[400],
        trixel_colour_f4: colors.emerald[400],
        trixel_colour_f5: colors.emerald[400],
        trixel_colour_f6: colors.emerald[400],
        trixel_colour_f7: colors.emerald[400]
      }} />
    </svg>
  )
}

export default LoadingHex
