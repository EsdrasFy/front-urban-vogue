import React, { useState } from 'react'

function Variations() {
    const [selectColor, setSelectColor] = useState("")
  return (
    <div className="flex gap-2 mt-4">
            <p>Variations:</p>
            <ul className="flex gap-3">
              <li className="cursor-pointer">
                <span
                  className="text-sm border-[1px] border-solid bg-custom-grayThree px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink "
                  onClick={() => setSelectColor("Blue")}
                >
                  Blue
                </span>
              </li>
              <li className="cursor-pointer">
                <span
                  className="text-sm border-[1px] border-solid bg-custom-grayThree px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink "
                  onClick={() => setSelectColor("Red")}
                >
                  Red
                </span>
              </li>
              <li className="cursor-pointer">
                <span
                  className="text-sm border-[1px] border-solid bg-custom-grayThree px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink "
                  onClick={() => setSelectColor("Orange")}
                >
                  Orange
                </span>
              </li>
            </ul>
          </div>
  )
}

export default Variations