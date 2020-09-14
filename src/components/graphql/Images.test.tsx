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

import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Images, { GET_IMAGES } from './Images';

const mocks = [
  {
    request: {
      query: GET_IMAGES,
    },
    result: {
      data: {
        images: [{
          "imgUrl":"theImgUrl",
          "imgTitle":"theImgTitle",
          "title":"theTitle",
          "linkUrl":"theLinkUrl"
        }],
      },
    },
  },
];

it('renders without error when show = true', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Images show={true} />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
  expect(container).toMatchSnapshot()
})

it('renders without error when show = false', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Images show={false} />
    </MockedProvider>
  )
  expect(container).toMatchSnapshot()
})
