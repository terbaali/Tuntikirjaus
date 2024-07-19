import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { storeHours } from './AsyncStorage';

export default function AddHoursModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [block, setBlock] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [uklHours, setUklHours] = useState(0);
  const [uklHoursDescription, setUklHoursDescription] = useState('');
  /*
  const isPresented = router.canGoBack();
  {!isPresented && <Link href="../">Dismiss</Link>}
    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
  */

  const handleAddition = async () => {
    const data ={
      block: block,
      workHours: workHours,
      uklHours: uklHours,
      uklHoursDescription: uklHoursDescription
    };
    storeHours(date, data);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Ionicons name="add-circle-outline" size={60} color="green" style={{ marginBottom: -3 }} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>Kirjaa tunnit</Text>
            
            <View style={styles.inputRow}>
              <Text>Päiväys:</Text>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputRow}>
              <Text>Lohko:</Text>
              <TextInput
                style={styles.input}
                value={block}
                onChangeText={setBlock}
                placeholder="Mille lohkolle työ tehtiin"
              />
            </View>

            <View style={styles.inputRow}>
              <Text>Urakkatunnit:</Text>
              <TextInput
                style={styles.input}
                value={workHours}
                onChangeText={setWorkHours}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            <View style={styles.inputRow}>
              <Text>UKL tunnit:</Text>
              <TextInput
                style={styles.input}
                value={uklHours.toString()}
                onChangeText={(text) => setUklHours(Number(text))}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            {uklHours > 0 && (
              <View style={styles.uklInput}>
                <Text>Urakan keskeytystuntien selitys:</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={uklHoursDescription}
                  onChangeText={setUklHoursDescription}
                  multiline
                  numberOfLines={4}
                  placeholder="Kehitä joku uskottava meriselitys keskeytystunneille"
                />
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Peruuta</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]} 
                onPress={() => {
                  handleAddition()
                  setModalVisible(false);
                }}>
                  <Text style={styles.buttonText}>Tallenna</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    flex: 1,
  },
  uklInput: {
    height: 100,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

