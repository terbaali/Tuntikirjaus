import { Image, StyleSheet, Platform, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AddHoursModal  from '@/components/AddHoursModal';
import Test  from '@/components/Test';
import Lister  from '@/components/Lister';



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
        <ThemedText type="subtitle">LISÄÄ TUNTIKIRJAUS:</ThemedText>
        <AddHoursModal/>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tehdyt kirjaukset</ThemedText>        
        <Lister/>
         {
          //<Test/>
         }
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
