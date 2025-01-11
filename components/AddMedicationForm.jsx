import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { Type, WhenToTake } from "../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { FormatDate, FormatDateForText } from "../service/ConvertDateTime";




export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log(formData);
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      {/* Type List */}
      <FlatList
        data={Type}
        horizontal
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Does Input */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Does Ex. 2, 5ml"
          onChangeText={(value) => onHandleInputChange("does", value)}
        />
      </View>

      {/* When to Take Dropdown */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and End Date */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.typeText}>
            {FormatDateForText(formData?.startDate) ?? "start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={new Date(formData?.startDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.typeText}>
            {FormatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endtDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={new Date(formData?.endtDate) ?? new Date()}
          />
        )}
      </View>

      {/* Set Reminder Input */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            style={styles.icon}
            name="timer-outline"
            size={24}
            color="black"
          />
          <Text style={styles.typeText}>{"Select Reminder Time"}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && <RNDateTimePicker
        mode="time"
        onChange={(event) => {
          setShowTimePicker(false);
        }}
        value={formData?.reminder??new Date()}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontsize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  textInput: {
    fontsize: 16,
    padding:10,

  },
  dateInputGroup:{
    flexDirection:'row',
    gap:10,
  }
});
