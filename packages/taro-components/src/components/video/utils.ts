export const formatTime = (time: number): string => {
  if (time === null) return ''
  const sec = Math.round(time / 1000 % 60)
  const min = Math.floor((time - sec) / 1000 / 60)
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
}

export const calcDist = (x: number, y: number): number => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

export const normalizeNumber = (number: number): number => {
  return Math.max(-1, Math.min(number, 1))
}

/**
 * @returns: {requestFullscreen: 'requestFullscreen', exitFullscreen: 'exitFullscreen', ...}
 */
export const screenFn = (function () {
  let val
  const fnMap = [
    [
      'requestFullscreen',
      'exitFullscreen',
      'fullscreenElement',
      'fullscreenEnabled',
      'fullscreenchange',
      'fullscreenerror'
    ],
    // New WebKit
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitFullscreenElement',
      'webkitFullscreenEnabled',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    // Old WebKit
    [
      'webkitRequestFullScreen',
      'webkitCancelFullScreen',
      'webkitCurrentFullScreenElement',
      'webkitCancelFullScreen',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozFullScreenElement',
      'mozFullScreenEnabled',
      'mozfullscreenchange',
      'mozfullscreenerror'
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'msFullscreenElement',
      'msFullscreenEnabled',
      'MSFullscreenChange',
      'MSFullscreenError'
    ]
  ]
  var defaultIOSMap = [
    'webkitEnterFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ]
  let i = 0
  const l = fnMap.length
  const ret = {}
  // This for loop essentially checks the current document object for the property/methods above.
  for (; i < l; i++) {
    val = fnMap[i]
    if (val && val[1] in document) {
      for (i = 0; i < val.length; i++) {
        ret[fnMap[0][i]] = val[i]
      }
      return ret
    }
  }
  if (!ret[fnMap[0][0]]) {
    // when there is no any APIs be set.

    // In IOS, there is no 'webkitEnterFullscreen' property `in document` but video can use it for fullscreen.
    // ref: https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1633500-webkitenterfullscreen
    for (i = 0; i < defaultIOSMap.length; i++) {
      ret[fnMap[0][i]] = defaultIOSMap[i]
    }
  }
  // If it doesn't find any of them, this whole function returns {}
  // and the fn variable is set to this returned value.
  return ret
})()
