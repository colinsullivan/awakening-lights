/**
 *  @file       RangeTester.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react'

import { MAX_PIXEL_ADDRESS } from './common/constants'


class RangeTester extends React.Component {
  render () {
    return <div className="row">
      <input type="number" name="startPixel" min="0" max={MAX_PIXEL_ADDRESS}/> 
      <input type="number" name="endPixel" min="0" max={MAX_PIXEL_ADDRESS}/> 
    </div>;
  }
}

export default RangeTester;
