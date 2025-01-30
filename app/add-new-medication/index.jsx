import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedicationHeader from '../../components/AddMedicationHeader'
import AddNewMedicationForm from '../../components/AddMedicationForm'


export default function AddNewMedication() {
  return (
    <ScrollView>
      <AddMedicationHeader/>

      <AddNewMedicationForm/>
    </ScrollView>
  )
}