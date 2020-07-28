import React from "react"
import { Link, LinkProps } from "@looker/components"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { Link as InternalLink } from "react-router-dom"

export { InternalLink }

export const ExternalLink: React.FC<Omit<LinkProps, "color">> = props => {
  return (
    <ExtensionContext.Consumer>
      {context => {
        return (
          <Link
            onClick={(...args) => {
              if (props.href) {
                context.extensionSDK.updateLocation(
                  props.href,
                  undefined,
                  props.target
                )
              }
              if (props.onClick) {
                props.onClick(...args)
              }
            }}
            {...props}
          />
        )
      }}
    </ExtensionContext.Consumer>
  )
}