import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';

const urlSimplePrice = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

export default function Exemplo1Screen() {

    const [precoBitcoin, setPrecoBitcoin] = useState('');

    useEffect(() => {
        const intervalo = setInterval(() => {
            fetch(urlSimplePrice)
                .then(res => res.json())
                .then(data => data.bitcoin.usd)
                .then(data => { setPrecoBitcoin(data); console.log('deu certo... caiu no then'); })
                .catch(data => { 'deu erro... caiu no catch'; console.log('erro') });
        }, 100000);

        return () => clearInterval(intervalo);
    }, []);



    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.texto}>$ {precoBitcoin}</Text>
        </SafeAreaView>
    );
}