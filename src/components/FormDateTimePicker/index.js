import React from 'react'
import {View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FormDateTimePicker = props => {
    const { input, meta, handlePress, ...inputProps } = props;

    const handleChange = (date) => {
        this.setState({isDateTimePickerVisible: false, date : date});
        this.props.input.onChange(date);
    }

    return(
        <View>
            <DateTimePickerModal
                date={new Date(this.props.value)}
                isVisible={inputProps.isDatePickerVisible}
                mode="date"
                onConfirm={inputProps.onConfirm}
                onCancel={this.handleChange}
            />
        </View>
        )
}

export default FormDateTimePicker