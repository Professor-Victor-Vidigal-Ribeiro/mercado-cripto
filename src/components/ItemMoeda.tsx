import { View, Text, StyleSheet, Image } from 'react-native';
import type { Moeda } from '../../types/Moeda';

type Props = {
    item: Moeda;
    index: number;
}

export function ItemMoeda({ item, index }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={{ uri: item.image }} style={styles.icon} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
            </View>
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
});