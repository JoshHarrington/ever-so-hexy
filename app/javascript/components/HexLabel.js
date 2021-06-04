import React, { useEffect, useRef, useState } from 'react'
import classNames from "classnames"
import moment from 'moment'
import { countries } from 'country-data'

const HexLabel = ({focusedHexInfo}) => {

  function getFlagEmoji(countryCode) {

    const codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
      
  }

  console.log(focusedHexInfo);

	return (
    <>
      {focusedHexInfo &&
        <ul className="fixed bottom-8 left-8 text-blueGray-800 bg-white shadow rounded-16xl py-4 px-6 font-bold">
          {!focusedHexInfo.draft ?
            <>
              <li className="inline-block">#{focusedHexInfo.order}</li>
              <li className="inline-block pl-4">{moment(focusedHexInfo.created_at).fromNow()}</li>
              {focusedHexInfo.country_code &&
                <li className="inline-block pl-4">
                  {countries[focusedHexInfo.country_code].name}
                  <span className="pl-2 text-xl leading-none relative top-0.5">{getFlagEmoji(focusedHexInfo.country_code)}</span>
                </li>
              }
            </>
          :
            <li className="inline-block">Someone is working on this tile…</li>
          }
        </ul>
      }
    </>
	)
}

export default HexLabel
