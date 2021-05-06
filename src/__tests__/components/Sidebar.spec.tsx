/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React from 'react'
import {mockCurrentExplore, mockCurrentModel, mockModels} from "../MockData/MockData"
import { assertSnapshot } from "@looker/components-test-utils"
import { ILookmlModelExplore } from '@looker/sdk/lib/3.1/models'

import { Sidebar } from '../../components/Sidebar'

jest.mock('react-router', () => {
  return {
    useHistory: jest.fn(() => {
      push: () => {}
    })
  }
})

jest.mock("../../components/ExploreList", () => ({
  ExploreList: () => "ExploreList"
}))

jest.mock("@looker/components", () => ({
  FieldSelect: () => "FieldSelect",
  Flex: () => "Flex",
  FlexItem: () => "FlexItem",
  Heading: () => "Heading",
  InputSearch: () => "InputSearch",
  theme: {colors: {ui2:"#282828"}},
}))

it('renders correctly', () => {
    assertSnapshot(<Sidebar
      currentExplore={mockCurrentExplore as ILookmlModelExplore}
      currentModel={mockCurrentModel}
      loadingExplore={null}
      models={mockModels}
      search={''}
      setSearch={() => {}}
    />)
})
