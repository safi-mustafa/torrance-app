import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Navigation from './navigation';
import UpdateNeeded from './components/UpdateNeeded';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={'light'} />
      <Toast />
      <StatusBar />
      <UpdateNeeded />
    </SafeAreaProvider>
  );
}
