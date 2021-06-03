import React, { useEffect, useRef, useState } from 'react'
import classNames from "classnames"

const HexLabel = ({focusedHexInfo}) => {

  console.log(focusedHexInfo)

	return (
    <>
      {focusedHexInfo ?
        <div className="fixed bottom-0 text-blueGray-800 bg-white shadow rounded-16xl p-6">{focusedHexInfo.location}</div>
        :
        <div>No Hex</div>
      }
    </>
	)
}

export default HexLabel
