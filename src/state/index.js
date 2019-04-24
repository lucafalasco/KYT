import { CURRENCIES, TIME_PERIODS } from 'constants/index'
import { types as t, flow } from 'mobx-state-tree'
import { DateTime } from 'luxon'
import { autorun } from 'mobx'
import api from '../api'

const currencyModel = t.model({
  id: t.string,
  label: t.string,
  color: t.string,
  bgColor: t.string,
})
const timePeriodModel = t.model({
  id: t.string,
  label: t.string,
})

export const StateModel = t
  .model('State', {
    selectedCurrency: currencyModel,
    selectedTimePeriod: timePeriodModel,
    data: t.frozen(),
  })
  // .views(self => {})
  .actions(self => {
    const fetchData = flow(function * () {
      const data = yield api.fetchData(self.selectedTimePeriod.id, self.selectedCurrency.id)
      self.data = data.slice(0, 300).map(d => ({
        x: DateTime.fromISO(d.time),
        y: parseFloat(d.price),
      }))
    })

    const changeTimePeriod = timePeriod => {
      self.selectedTimePeriod = timePeriod
    }

    const changeCurrency = currency => {
      self.selectedCurrency = currency
    }

    return {
      changeTimePeriod,
      changeCurrency,
      fetchData,
    }
  })
  .actions(self => {
    function afterCreate() {
      self.fetchData()
    }
    return { afterCreate }
  })

export const State = StateModel.create({
  selectedCurrency: CURRENCIES[0],
  selectedTimePeriod: TIME_PERIODS[0],
})

autorun(() => State.fetchData(State.selectedTimePeriod.id, State.selectedCurrency.id))
