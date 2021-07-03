import React from 'react'
import moment from 'moment'
import { countries } from 'country-data'
import classNames from 'classnames'

const HexLabel = ({focusedHexInfo}) => {

  function getFlagEmoji(countryCode) {

    const codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);

  }

	return (
    <>
      {focusedHexInfo &&
        <ul className={classNames(
          "bullet-seperator fixed",
          "text-blueGray-800 bg-white shadow",
          "py-5 px-6 font-bold left-0 bottom-0",
          "w-full text-center",
          "sm:py-3.5 sm:static sm:ml-auto",
          "sm:w-auto sm:rounded-16xl")}>
          {!focusedHexInfo.draft ?
            <>
              <li className="inline-block">#{focusedHexInfo.order}</li>
              <li className="inline-block">{moment(focusedHexInfo.created_at).fromNow()}</li>
              {focusedHexInfo.country_code &&
                <li className="country block sm:inline-block">
                  {countries[focusedHexInfo.country_code].name}
                  <span className="pl-2 text-xl leading-none relative top-0.5">
                    {getFlagEmoji(focusedHexInfo.country_code)}
                    </span>
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
