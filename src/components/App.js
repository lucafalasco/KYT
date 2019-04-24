import React from 'react'
import { inject, observer } from 'mobx-react'
import { FlexView } from '@accurat/react-components'
import { View } from './View'

@inject('state')
@observer
export class App extends React.Component {
  render() {
    return (
      <FlexView vAlign="center" hAlign="center" className="fixed w-100 h-100 bg-rangoon">
        <View />
      </FlexView>
    )
  }
}
