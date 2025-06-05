import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/la.png')} // ✅ Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>Use the Tasks tab to manage your to-dos.</Text>

        {/* ✅ Touchable icon to navigate */}
        <TouchableOpacity onPress={() => router.push('/tasks')} style={styles.button}>
          <Image
            source={require('../assets/images/la.png')} // ✅ You can use another icon/image here if desired
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Go to Tasks</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)', // Optional overlay to make text readable
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
  },
});
