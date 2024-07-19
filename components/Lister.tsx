import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { storeHours } from './AsyncStorage';
import { getData, getAllData } from '@/components/AsyncStorage';
import { Collapsible } from '@/components/Collapsible';

export default function Lister() {
  const [data, setData] = useState([1]);
  const ERROR = "An error occurred on getting data"
  const FINDING = "HAETAAN MUISTISTA TUNTIKIRJAUKSIA"
  const EMPTY = "EI LÖYTYNYT YHTÄÄN TUNTIKIRJAUSTA"


  useEffect(() => {
    (async () => {
      getAllData().then(res => {
        if (typeof res === 'undefined') {
          return Alert.alert(
            ERROR,
            res
          );
        }
        setData(res.length === 0 ? [] : res)
      });
    })();
  }, []);

  const handle = async () => {

  }

  return (
    <View>
      {
        data[0] === 1 ? <Text style={styles.modalHeaderText}>{FINDING}</Text> : 
        data.length === 0 ? <Text style={styles.modalHeaderText}>{EMPTY}</Text> : 

        data.map((item, index) => {
          return( 
            <Collapsible title={item.date}>
              <TouchableOpacity onPress={() => alert("joskus tähän tulee jotain")}>
              <View style={styles.textRow}>
                  <Text style={[styles.textArea, styles.hText]}>Lohko: </Text>
                  <Text style={styles.textArea}>{item.block}</Text>
                  
                </View>
                <View style={styles.textRow}>
                  <Text style={[styles.textArea, styles.hText]}>UR tunnit: </Text>
                  <Text style={styles.textArea}>{item.workHours}</Text>
                  <Text style={[styles.textArea, styles.hText]}>UKL tunnit: </Text>
                  <Text style={styles.textArea}>{item.uklHours}</Text>
                </View>
                {
                  item.uklHours !== 0 ? 
                    <View style={styles.textRow}>
                      <Text style={[styles.textArea, styles.hText]}>UKL tuntien selitys: </Text>
                      <Text style={styles.textArea}>{item.uklHoursDescription}</Text>
                    </View>
                    :
                    null
                }
              </TouchableOpacity>
            </Collapsible>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textArea: {
    marginRight: 10,
    //textAlignVertical: 'top',
  },
  hText: {
    fontWeight: 'bold',
  },
});

