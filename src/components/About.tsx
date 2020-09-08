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
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

var processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {createElement: React.createElement})

const About = (props: {show: boolean}) => {
  const [readmeMarkdown, setReadmeMarkdown] = useState('')

  useEffect(() => {
    fetch("https://test.rodneylai.com/api/README.md")
      .then(result => result.text())
      .then(result => setReadmeMarkdown(result))
  }, [])

  if (props.show) {
    return(
      <Typography style={{padding:"15px",textAlign:"left"}}>
        {processor.processSync(readmeMarkdown).result}
        <Typography></Typography>
      </Typography>
    )
  } else {
    return null
  }
}

export default About