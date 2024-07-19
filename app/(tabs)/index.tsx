import { Image, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AddHoursModal  from '@/components/AddHoursModal';
import Test  from '@/components/Test';
import { getData, getAllData } from '@/components/AsyncStorage';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        {
        //<ThemedText type="title">Welcome!</ThemedText>
        }
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">TÄHÄN TUNTIKIRJAUKSEN LISÄYS:</ThemedText>
        <AddHoursModal/>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tähän  tehdyt kirjaukset</ThemedText>
        <ThemedText>
          Lisätään allekkain laatikoihin jokainen kirjaus
        </ThemedText>
        <ThemedText>{
          //getAllData().toString()
        //getAllData ? getAllData.toString() : null
        }</ThemedText>
        <Test/>
      </ThemedView> 
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
