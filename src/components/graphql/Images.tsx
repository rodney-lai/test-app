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
import { useQuery, gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

export const GET_IMAGES = gql`
  query {
    images {
      title
      linkUrl
      imgTitle
      imgUrl
    }
  }
`

interface ImageData {
  title: string
  linkUrl: string
  imgTitle: string
  imgUrl: string
}

interface ImagesData {
  images: ImageData[]
}

const useStyles = makeStyles(() => ({
  gridList: {
    width: "100%",
    height: "100%",
    overflow: 'hidden',
  },
}));

const Images = (props: {show: boolean}) => {
  const { loading, error, data } = useQuery<ImagesData>(GET_IMAGES)
  const classes = useStyles();

  if (props.show) {
    if (loading) {
      return(<div style={{padding:"15px"}}>Loading... <img src="https://img.rodneylai.com/waiting.gif" alt="waiting" title="waiting" /></div>)
    } else if (error) {
      return(<div style={{padding:"15px"}}>Error</div>)
    } else if (data) {
      var images: ImageData[] = [...data.images]

      for(let i = images.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = images[i]
        images[i] = images[j]
        images[j] = temp
      }

      return(
        <GridList cellHeight={250} className={classes.gridList} cols={8}>
          {images.map((image:any) => (
            <GridListTile key={image.linkUrl + image.imgUrl} cols={image.imgUrl.includes("pan") ? 4 : 2}>
              <a href={image.linkUrl} target="_blank" rel="noopener noreferrer"><img src={image.imgUrl} alt={image.title} title={image.title} /></a>
              <GridListTileBar title={image.imgTitle.replace("Panarama","")} subtitle={image.title.replace(" Photos","").replace(" Videos","")} />
            </GridListTile>
          ))}
        </GridList>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}

export default Images
