import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Moeda } from '../../src/types/Moeda';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

type Props = {
    item: Moeda;
    index: number;
}

// Chave para armazenar as moedas favoritas no AsyncStorage
// O AsyncStorage é como um “pendrive” interno do app —
// ele serve para guardar dados simples no dispositivo,
// mesmo depois que o app é fechado.
const MOEDAS_FAVORITAS_IDS = 'moedas_favoritas_ids';


// Esse componente é um CARD de uma moeda
export function ItemMoeda({ item, index }: Props) {

    const [favorita, setFavorita] = useState(false);

    const toogleFavoritar = () => {
        //1- busca os favoritos salvos no AsyncStorage
        // tem que instalar npx expo install @react-native-async-storage/async-storage
        AsyncStorage.getItem(MOEDAS_FAVORITAS_IDS)
            .then(res => {
                const ids_favoritas = res ? JSON.parse(res) : [];

                //2- verifica se a moeda já está favoritada. Se já estava, remove dos favoritos
                if (ids_favoritas.includes(item.id)) {
                    const ids_favoritas_atualizado = ids_favoritas.filter((id) => id !== item.id);
                    AsyncStorage.setItem(MOEDAS_FAVORITAS_IDS, JSON.stringify(ids_favoritas_atualizado))
                        .then(() => setFavorita(false));
                }
                //3- se não estava favoritada, adiciona aos favoritos
                else {
                    const ids_favoritas_atualizado = [...ids_favoritas, item.id]; // utilizando operador spread (...). 'Espalha' os itens do array antigo em um novo array, e adiciona o novo id no final
                    AsyncStorage.setItem(MOEDAS_FAVORITAS_IDS, JSON.stringify(ids_favoritas_atualizado))
                        .then(() => setFavorita(true));
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        //verifica se a moeda está favoritada ao montar o componente
        AsyncStorage.getItem(MOEDAS_FAVORITAS_IDS)
            .then(res => {
                const ids_favoritas = res ? JSON.parse(res) : [];
                if (ids_favoritas.includes(item.id)) {
                    setFavorita(true);
                }
            })
            .catch(err => console.log(err));
    })


    return (
        <View style={styles.card}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={{ uri: item.image }} style={styles.icon} />
            <View style={styles.flex1}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
            </View>

            <TouchableOpacity onPress={toogleFavoritar}>
                <MaterialIcons
                    name="star-rate"
                    size={24}
                    color="#555"
                    style={[styles.estrela, favorita && styles.favorita]} />
            </TouchableOpacity>

            <Text style={styles.price}>${item.current_price}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1b1b1b',
        padding: 12,
        borderRadius: 10,
        marginVertical: 4,
        width: '100%',
    },
    rank: { color: '#aaa', width: 28, textAlign: 'center' },
    icon: { width: 32, height: 32, borderRadius: 8, marginRight: 10 },
    name: { color: '#fff', fontWeight: '600' },
    symbol: { color: '#aaa', fontSize: 12 },
    price: { color: '#f7931a', fontWeight: 'bold' },
    flex1: { flex: 1 },
    estrela: { marginHorizontal: 12 },
    favorita: { color: '#f7931a' }
});