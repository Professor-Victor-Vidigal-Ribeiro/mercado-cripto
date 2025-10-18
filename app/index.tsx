import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';

export default function App() {
    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.titulo}>💰Mercado Cripto💰</Text>
            <Text style={globalStyles.subtitulo}>
                App de Cotações de Criptomoedas
            </Text>
        </SafeAreaView>
    );
}
