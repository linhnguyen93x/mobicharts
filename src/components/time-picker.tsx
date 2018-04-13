import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'

export interface TimeProps {
  onDateChange: (date: string) => any
}

interface TimeState {
  selectedTime: Date | string
}

export class TimePicker extends React.Component<TimeProps, TimeState> {
  state = { selectedTime: new Date() }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={25} color={'#75746F'} />
        <DatePicker
          style={{ flex: 1, alignSelf: 'stretch' }}
          date={this.state.selectedTime}
          mode="date"
          androidMode="spinner"
          placeholder="select date"
          format="DD/MM/YYYY"
          confirmBtnText="Xác nhận"
          cancelBtnText="Hủy"
          customStyles={{
            dateInput: {
              marginLeft: 16,
              marginRight: 16,
              borderWidth: 0
            },
            dateText: {
              fontSize: 16,
              color: 'blue'
            }
            // ... You can check the source to find the other keys.
          }}
          showIcon={false}
          onDateChange={(date) => {
            this.setState({ selectedTime: date }, () => {
              this.props.onDateChange(date)
            })
          }}
        />
        <MaterialIcons
          name="keyboard-arrow-right"
          size={25}
          color={'#75746F'}
        />
      </View>
    )
  }
}
