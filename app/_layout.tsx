import { Drawer } from 'expo-router/drawer';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Drawer
                screenOptions={{
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#fff',
                    drawerActiveTintColor: '#f7931a',
                    drawerInactiveTintColor: '#ccc',
                    drawerStyle: { backgroundColor: '#1b1b1b' },
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{ title: 'Início' }}
                />
            </Drawer>
        </SafeAreaProvider>
    );
}
