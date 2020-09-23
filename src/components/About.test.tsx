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
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import About, { GET_BUILD_DATE } from './About'

const mocks = [
  {
    request: {
      query: GET_BUILD_DATE,
    },
    result: {
      data: {
        version: {
          buildDate: "theAPIBuildDate"
        },
      },
    },
  },
]

const server = setupServer(
  rest.get('https://test.rodneylai.com/api/README.md', (req, res, ctx) => {
    return res(ctx.text('This is the readme'))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('./BuildDate', () => () => "theAppBuildDate")

test('about component when show = true', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <About show={true} />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
  await waitFor(() => screen.getByText(/API Build Date:/i))
  expect(container).toMatchSnapshot()
})

test('about component when show = false', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <About show={false} />
    </MockedProvider>
  )
  expect(container).toMatchSnapshot()
})
