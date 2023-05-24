import React from 'react'
import { BsGlobe } from 'react-icons/bs'
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from 'react-icons/fa'
import { MdPhoneIphone } from 'react-icons/md'
import { SiNintendo } from 'react-icons/si'

import { Platforms } from '@/types/Games'

export const GamePlatforms = ({ platforms }: { platforms: Platforms[] }) => {
  const iconMap = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    ios: FaApple,
    android: FaAndroid,
    linux: FaLinux,
    nintendo: SiNintendo,
    mac: MdPhoneIphone,
    web: BsGlobe,
  }

  return (
    <div className='my-4 flex flex-row gap-3'>
      {platforms.map((platform) => (
        <div key={platform.id}>
          {iconMap[platform.slug] && (
            <div className='text-xl text-gray-500'>
              {React.createElement(iconMap[platform.slug])}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
