import { TIME_PERIODS, CURRENCIES } from 'constants/index'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { FlexView } from '@accurat/react-components'
import { AreaChart } from './AreaChart'

@inject('state')
@observer
export class View extends React.Component {
  render() {
    const {
      state: { data, changeTimePeriod, selectedTimePeriod, changeCurrency, selectedCurrency },
    } = this.props

    return (
      <FlexView
        column
        vAlign="center"
        hAlign="center"
        className="w-100 h-100 transition"
        style={{ backgroundColor: selectedCurrency.bgColor }}
      >
        <div className="absolute top-2 left-2 f2 fw7" style={{ color: selectedCurrency.color }}>
          {selectedCurrency.label}
        </div>
        <div className="w-100 h-50 h-75-ns">
          <AreaChart data={data} currency={selectedCurrency} />
        </div>
        <div className="flex items-center absolute left-2 bottom-2">
          {TIME_PERIODS.map((timePeriod, i) => {
            function toggleTimePeriod() {
              changeTimePeriod(timePeriod)
            }

            return (
              <span
                className={`white f5 mr2 pointer
                  ${timePeriod.id === selectedTimePeriod.id ? 'fw7 bb' : ''}
                `}
                style={{ color: '#808080' }}
                key={i}
                onClick={toggleTimePeriod}
              >
                {timePeriod.label}
              </span>
            )
          })}
          <div className="flex flex-wrap ml4">
            {CURRENCIES.map((currency, i) => {
              function toggleCurrency() {
                changeCurrency(currency)
              }

              return (
                <span
                  className={`f5 mv2 mv0-ns mr2 pointer ${
                    currency.id === selectedCurrency.id ? 'fw7 bb' : ''
                  }`}
                  style={{ color: currency.color }}
                  key={i}
                  onClick={toggleCurrency}
                >
                  {currency.id}
                </span>
              )
            })}
          </div>
        </div>
      </FlexView>
    )
  }
}
