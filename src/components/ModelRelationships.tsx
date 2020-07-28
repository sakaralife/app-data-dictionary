import React, { useState } from "react"
import { useModelDetail } from "../utils/fetchers"
import { usePathNames } from "../utils/routes"
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderControls,
  PageMasterDetail,
  PageMaster
} from "../components-generalized/Page"
import { ModelRelationshipsCustomizer } from "./ModelRelationshipsCustomizer"
import {
  ILookmlModelExplore,
  ILookmlModelExploreJoins
} from "@looker/sdk/dist/sdk/models"
import { ExploreDetail } from "./ExploreDetail"
import { JoinDetail } from "./JoinDetail"
import { ModelGraph } from "./ModelGraph"
import Measure from "react-measure"
import styled from "styled-components"

const UnpaddedMaster = styled(PageMaster)`
  padding: 0;
`

export const ModelRelationships: React.FC = () => {
  const { modelName } = usePathNames()
  const modelDetail = useModelDetail(modelName)
  const [selectedExplore, setSelectedExplore] = useState<ILookmlModelExplore>()
  const [selectedJoin, setSelectedJoin] = useState<ILookmlModelExploreJoins>()
  const [graphDimensions, setGraphDimensions] = useState<{
    width: number
    height: number
  }>({ width: 500, height: 500 })
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Relationships</PageHeaderTitle>
        <PageHeaderControls>
          <ModelRelationshipsCustomizer />
        </PageHeaderControls>
      </PageHeader>
      <PageMasterDetail>
        <Measure
          bounds
          onResize={contentRect => {
            setGraphDimensions(contentRect.bounds)
          }}
        >
          {({ measureRef }) => (
            <UnpaddedMaster ref={measureRef}>
              <ModelGraph
                width={graphDimensions.width}
                height={graphDimensions.height}
                model={modelDetail}
                setSelectedExplore={setSelectedExplore}
                setSelectedJoin={setSelectedJoin}
              />
            </UnpaddedMaster>
          )}
        </Measure>

        {selectedExplore && (
          <ExploreDetail
            explore={selectedExplore}
            model={modelDetail.model}
            onClose={() => setSelectedExplore(undefined)}
          />
        )}
        {selectedJoin && (
          <JoinDetail
            join={selectedJoin}
            onClose={() => setSelectedJoin(undefined)}
          />
        )}
      </PageMasterDetail>
    </Page>
  )
}