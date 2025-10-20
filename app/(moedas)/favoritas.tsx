import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Moeda } from '../../src/types/Moeda';
import { ItemMoeda } from '../../src/components/ItemMoeda';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritaEvents } from '../../src/events/favoritaEvent';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100';
const MOEDAS_FAVORITAS_IDS = 'moedas_favoritas_ids';

export default function FavoritasScreen() {

    const listarMoedas = () => {
        setIsLoading(true);
        setError(null);
        AsyncStorage.getItem(MOEDAS_FAVORITAS_IDS)
            .then((res) => {
                const idsFavoritas: string[] = res ? JSON.parse(res) : [];

                // Não há favoritas
                if (idsFavoritas.length === 0) {
                    setMoedas([]);
                    setIsLoading(false);
                    return;
                }

                // busca as moedas e filtra as favoritas
                fetch(URL)
                    .then((data) => data.json())
                    .then((todasMoedas: Moeda[]) => {
                        const filtradas = todasMoedas.filter((m) => idsFavoritas.includes(m.id));
                        setMoedas(filtradas);
                    })
                    .catch((err) => setError(err.message))
                    .finally(() => setIsLoading(false));
            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message);
                setIsLoading(false);
            });
    };

    const [moedas, setMoedas] = useState<Moeda[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Para primeira vez que carrega a tela
    useEffect(() => {
        listarMoedas();
    }, []);


    // Para quando estrelinha de favoritos é pressionada
    useEffect(() => {
        // ouvir evento e recarregar lista
        const subscription = favoritaEvents.addListener('favoritos:changed', listarMoedas);

        // limpar quando desmontar
        return () => subscription.remove();
    }, [])


    if (isLoading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <ActivityIndicator size="large" />
                <Text style={globalStyles.subtitulo}>Carregando moedas...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.subtitulo}>Falha ao carregar moedas.</Text>
                <Text style={globalStyles.subtitulo}>{error}</Text>
            </SafeAreaView>
        );
    }

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