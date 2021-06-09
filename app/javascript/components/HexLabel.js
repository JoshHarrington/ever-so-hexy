import React from 'react'
import moment from 'moment'
import { countries } from 'country-data'

const HexLabel = ({focusedHexInfo}) => {

  function getFlagEmoji(countryCode) {

    const codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);

  }

	return (
    <>
      {focusedHexInfo &&
        <ul className="bullet-seperator text-blueGray-800 bg-white shadow rounded-16xl py-4 px-6 font-bold mx-auto">
          {!focusedHexInfo.draft ?
            <>
              <li className="inline-block">#{focusedHexInfo.order}</li>
              <li className="inline-block">{moment(focusedHexInfo.created_at).fromNow()}</li>
              {focusedHexInfo.country_code &&
                <li className="inline-block">
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
