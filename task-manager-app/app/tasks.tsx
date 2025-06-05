import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/la.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome Home</Text>
          <Text style={styles.subtitle}>Use the Tasks tab to manage your to-dos.</Text>

          <TouchableOpacity
            onPress={() => router.push('/tasks')}
            style={styles.button}
          >
            <Image
              source={require('../assets/images/la.png')}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Go to Tasks</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,       // increased padding for overall spacing
    paddingTop: 60,    // more space at top
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,  // bigger gap below title
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 60,  // bigger gap below subtitle
  },
  button: {
    alignItems: 'center',
    marginTop: 50,     // more space before button
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 25,  // bigger space between icon and text
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
  },
});
