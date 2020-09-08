/**
 *
 * Copyright (c) 2020 Rodney S.K. Lai
 * https://github.com/rodney-lai
 *
 * Permission to use, copy, modify, and/or distribute this software for
 * any purpose with or without fee is hereby granted, provided that the
 * above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

import * as React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

const WebCam = (props: {show: boolean}) => {
  const [info, setInfo] = useState({dateCreated:null})

  useEffect(() => {
    if (props.show) {
      fetch("https://img.rodneylai.com/webcam.json?ticks=" + (new Date()).getTime())
        .then(result => result.json())
        .then(result => setInfo(result))
    }
  }, [props.show])

  if (props.show) {
    return(
      <>
        <div><Typography variant="subtitle1">{info.dateCreated}</Typography></div>
        <div>
          <img src={"https://img.rodneylai.com/webcam.jpg?ticks=" + (new Date()).getTime()} alt="webcam" title="webcam" width="95%"/>
        </div>
      </>
    )
  } else {
    return null
  }
}

export default WebCam
