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
import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import WebCam from './WebCam'

const server = setupServer(
  rest.get('https://img.rodneylai.com/webcam.json', (req, res, ctx) => {
    return res(ctx.json({
      "key":"theKey",
      "dateCreated":"theDateCreated"
    }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const now = 1599956873663

test('webcam component when show = true', async () => {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementation(() =>
      new Date(now).valueOf()
    )
  const { container } = render(<WebCam show={true} now={now} />)
  await waitFor(() => screen.getByText(/theDateCreated/i))
  expect(container).toMatchSnapshot()
})

test('webcam component when show = false', () => {
  const { container } = render(<WebCam show={false} now={now} />)
  expect(container).toMatchSnapshot()
})
