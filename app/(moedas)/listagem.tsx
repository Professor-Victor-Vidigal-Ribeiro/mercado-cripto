import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Moeda } from '../../src/types/Moeda';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native';
import { ItemMoeda } from '../../src/components/ItemMoeda';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100';

export default function ListagemScreen() {

    const [moedas, setMoedas] = useState<Moeda[]>([]); // Esse <Moeda[]> é um cast
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const listarMoedas = () => {
        fetch(URL)
            .then(data => data.json())
            .then(data => setMoedas(data))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        listarMoedas();
    }, []);


    // enquanto está carregando, mostra um indicador de carregamento
    if (isLoading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <ActivityIndicator size="large" />
                <Text style={globalStyles.subtitulo}>Carregando moedas...</Text>
            </SafeAreaView>
        );
    }

    // se deu erro, mostra a mensagem de erro
    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.subtitulo}>Falha ao carregar moedas.</Text>
            </SafeAreaView>
        );
    }

    // se carregou com sucesso
    // MAIS SIMPLES
    // return (
    //     <SafeAreaView style={globalStyles.container}>

    //         <FlatList
    //             data={moedas}
    //             renderItem={({ item }) => (<Text style={globalStyles.texto}>{item.name}</Text>)}
    //         />

    //     </SafeAreaView>
    // );

    // RENDER ITEM COM COMPONENTE SEPARADO

    return (
        <SafeAreaView style={globalStyles.container}>

            <FlatList
                data={moedas}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <ItemMoeda item={item} index={index} />}
                style={styles.flatList}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    }
});