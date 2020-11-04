import React, { Fragment } from 'react';
//import '../DaySchedule/styles.css'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import DaySchedule from '../DaySchedule/index'

const WeekScheduler = ({
//     ArrayOfWeek=[[1,1,1,1,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
//     DaysOfWeek = ["L", "M", "M", "J", "V", "S", "D"] ,
//     Editable = false

                }) => {
  // event.length = 0
  // let cant = array.length
  return (
    <Fragment>
        {/*{console.log(ArrayOfWeek)}*/}
        {/*<Table style={{flexDirection: 'row'}} >*/}
        {/*    {ArrayOfWeek.map( (day, i) => {*/}
        {/*       return(*/}
        {/*        <DaySchedule ArrayOfDay={day} Day={DaysOfWeek[i]} key={i}/>*/}
        {/*       ) */}
        {/*    })}*/}

        {/*    */}
        {/*</Table>*/}
        
        {/*
        <table>
            <td>
            {
            ArrayOfWeek.map( (day, i) =>  {
             return(
             <td key={i}> 
                <DaySchedule ArrayOfDay={day} Day={DaysOfWeek[i]}></DaySchedule>
             </td>
             )
             })
            }
            </td>
        </table>  */ }
        
    </Fragment>
  );
};


export default WeekScheduler