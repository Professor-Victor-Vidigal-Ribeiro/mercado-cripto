import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';

const urlSimplePrice = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

export default function Exemplo2Screen() {

    const [precoBitcoin, setPrecoBitcoin] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);


    const atualizarPrecoBitcoin = () => {
        fetch(urlSimplePrice)
            .then(rest => rest.json())
            .then(data => data.bitcoin.usd)
            .then(data => setPrecoBitcoin(data))
            .then(() => setError(false))
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        const intervalo = setInterval(() => {
            atualizarPrecoBitcoin();
        }, 10000);

        return () => clearInterval(intervalo);
    }, []);


    if (isLoading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.texto}>Carregando...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.texto}>Ocorreu um erro ao atualizar a cotação</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.texto}>$ {precoBitcoin}</Text>
        </SafeAreaView>
    );
}