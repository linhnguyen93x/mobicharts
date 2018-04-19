import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-datepicker'

export interface TimeProps {
  onDateChange: (date: string) => any
}

interface TimeState {
  selectedTime: string
}

export class TimePicker extends React.Component<TimeProps, TimeState> {
  state = { selectedTime: moment().format('DD/MM/YYYY') }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 8 }}
          onPress={() =>
            this.setState({
              selectedTime: moment(this.state.selectedTime, 'DD/MM/YYYY')
                .subtract(1, 'days')
                .format('DD/MM/YYYY')
            }, () => this.props.onDateChange(this.state.selectedTime))
          }
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={25}
            color={'#75746F'}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{ paddingHorizontal: 8 }}
          onPress={() =>
            this.setState({
              selectedTime: moment(this.state.selectedTime, 'DD/MM/YYYY')
                .add(1, 'days')
                .format('DD/MM/YYYY')
            }, () => this.props.onDateChange(this.state.selectedTime))
          }
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color={'#75746F'}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
