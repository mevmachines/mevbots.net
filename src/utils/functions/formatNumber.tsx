export const formatNumber = (
  value: string | number,
  type: string,
  decimalPart: number = 4,
): string => {
  let changedValue = ''

  const suffixes = ['', 'K', 'M', 'B', 'T']

  let suffixNum = 0

  switch (type) {
    case 'abbreviate': {
      value = Number(value)

      while (Math.abs(value) >= 1000) {
        value /= 1000
        suffixNum++
      }

      const fixeds = suffixNum ? 2 : 0

      let roundedValue = value.toFixed(fixeds)

      if (suffixNum > 0) {
        roundedValue += suffixes[suffixNum]
      }

      changedValue = roundedValue

      break
    }

    case 'abbreviateWithoutDecimals': {
      value = Number(value)

      while (value >= 1000) {
        value /= 1000
        suffixNum++
      }

      let roundedValue = value.toFixed(0)

      if (suffixNum > 0) {
        roundedValue += suffixes[suffixNum]
      }

      changedValue = roundedValue

      break
    }

    case 'abbreviateInUSD': {
      value = Number(value)

      if (value < 1) {
        changedValue = '$' + value.toFixed(2)
        break
      }

      while (value >= 1000) {
        value /= 1000
        suffixNum++
      }

      const fixeds = suffixNum ? 2 : 0

      let roundedValue = value.toFixed(fixeds)

      if (suffixNum > 0) {
        roundedValue += suffixes[suffixNum]
      }

      changedValue = '$' + roundedValue

      break
    }

    case 'formatSmallNumber': {
      value = Number(value)

      if (value === 0) {
        changedValue = '0.00'
        break
      }

      if (value < 0) {
        changedValue = '-' + formatNumber(Math.abs(value), 'formatSmallNumber')
        break
      }

      if (value < 0.01) {
        const strValue = value.toFixed(20)

        const match = strValue.match(/\.0*[1-9]/)

        if (match) {
          const zerosCount = match[0].length - 2
          const significantPart = value.toFixed(zerosCount + 2)
          changedValue = significantPart
        } else {
          changedValue = '0.00'
        }
        break
      }

      const [integerPart, decimalPart] = value.toString().split('.')

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      const roundedDecimalPart = decimalPart
        ? decimalPart.slice(0, 2).padEnd(2, '0')
        : '00'

      changedValue = `${formattedInteger}.${roundedDecimalPart}`

      break
    }

    case 'formatSmallBigInt': {
      const num = Number(value)

      const normalized = num.toLocaleString('fullwide', {
        useGrouping: false,
        maximumFractionDigits: 8,
      })

      const [integerPart, decimalPartValue] = normalized.split('.')

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      changedValue = decimalPartValue
        ? `${formattedInteger}.${decimalPartValue}`
        : formattedInteger

      break
    }

    case 'chartAbbreviate': {
      value = Number(value)
      if (value <= 0) return '0'

      let newValue

      if (value >= 1000) {
        while (value >= 1000) {
          value /= 1000
          suffixNum++
        }
        newValue = value.toFixed()
      } else {
        if (value < 10) {
          newValue = value.toFixed(2)
        } else if (value < 50) {
          newValue = value.toFixed(1)
        } else if (value > 100) {
          newValue = Math.floor(value / 10) * 10
        } else {
          newValue = value.toFixed()
        }
      }

      if (suffixNum > 0) {
        newValue += suffixes[suffixNum]
      }

      changedValue = '' + newValue
      break
    }

    case 'format': {
      value = String(value)

      const [integerPart, decimalPart] = value.split('.')

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      const roundedDecimalPart = decimalPart
        ? decimalPart.slice(0, 2).padEnd(2, '0')
        : ''

      changedValue = roundedDecimalPart
        ? `${formattedInteger}.${roundedDecimalPart}`
        : formattedInteger

      break
    }

    case 'formatPriceShort': {
      value = String(value)

      const [integerPart, decimalPart] = value.split('.')

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      const roundedDecimalPart =
        decimalPart && +formattedInteger > 1000
          ? decimalPart.slice(0, 2).padEnd(2, '0')
          : ''

      changedValue = roundedDecimalPart
        ? `${formattedInteger}.${roundedDecimalPart}`
        : formattedInteger

      break
    }

    case 'formatAPR': {
      value = Number(value)

      if (value >= 1000000) {
        changedValue = (value / 1000000).toFixed(1) + 'M'
      } else if (value >= 10000) {
        changedValue = (value / 1000).toFixed(1) + 'K'
      } else {
        changedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }

      break
    }

    case 'formatWithoutDecimalPart': {
      value = String(value)

      changedValue = value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

      break
    }

    case 'formatWithLongDecimalPart': {
      value = String(value)

      const [integerPartSecond, decimalPartSecond] = value.split('.')

      const roundedDecimalPartSecond = decimalPartSecond
        ? parseFloat(`0.${decimalPartSecond}`).toFixed(decimalPart).slice(2)
        : ''

      const formattedIntegerSecond = integerPartSecond.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' ',
      )

      const formattedValueSecond = roundedDecimalPartSecond
        ? `${formattedIntegerSecond}.${roundedDecimalPartSecond}`
        : formattedIntegerSecond

      changedValue = formattedValueSecond

      break
    }
    case 'formatUSD': {
      value = Number(value)

      const sign = value < 0 ? '-$' : '$'

      changedValue =
        sign +
        formatNumber(Math.abs(value), 'formatWithLongDecimalPart', decimalPart)

      break
    }
    default:
      break
  }

  return changedValue
}
