import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function MoedasLayout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#fff',
                    tabBarStyle: { backgroundColor: '#1b1b1b' },
                    tabBarActiveTintColor: '#f7931a',
                    tabBarInactiveTintColor: '#ccc',
                }}
            >

                <Tabs.Screen
                    name="listagem"
                    options={{
                        title: "Listagem",
                        tabBarIcon: ({ color, size }) => (<MaterialIcons name="list" size={size + 4} color={color} />)
                    }}
                />



                <Tabs.Screen
                    name="exemplos"
                    options={{
                        title: "Exemplos",
                        tabBarIcon: ({ color, size }) => (<MaterialIcons name="help" size={size + 4} color={color} />)
                    }}
                />

            </Tabs>
        </SafeAreaProvider>
    );
}