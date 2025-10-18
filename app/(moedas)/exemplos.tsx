import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';

const urlSimplePrice = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const urlList = 'https://api.coingecko.com/api/v3/coins/list';

export default function App() {

    const [precoBitcoin, setPrecoBitcoin] = useState('');

    useEffect(() => {
        const intervalo = setInterval(() => {
            fetch(urlSimplePrice)
                .then(resposta => resposta.json())
                .then(data => data.bitcoin.usd)
                .then(data => { setPrecoBitcoin(data); console.log('deu certo'); })
                .catch(data => { 'deu erro'; console.log('erro') });
        }, 20000);

        return () => clearInterval(intervalo);
    }, []);



    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.texto}>$ {precoBitcoin}</Text>
        </SafeAreaView>
    );
}