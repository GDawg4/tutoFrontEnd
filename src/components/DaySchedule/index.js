import React, { Fragment } from 'react';
//import '../DaySchedule/styles.css'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import Button from '../Button'
const DayScheduler = ({ArrayOfDay= [0,0,0,0,0,0,0,0,0,0,0,0,0,0], Day="L", Editable = false }) => {
  // event.length = 0
  // let cant = array.length
  const Buttons = ArrayOfDay.map( value => <Button label={value === 0 ? 'L' : 'O'}/>)
  return (
          <TableWrapper style={{flex:1}}>
            <Cols data={[Buttons]} heightArr={ArrayOfDay.map(i => i+30)} widthArr={ArrayOfDay.map(i => i+30)} textStyle={styles.text}>
              
            </Cols>
          </TableWrapper>

        
  );
};

const styles = StyleSheet.create({
});

export default DayScheduler