import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image, Linking, Pressable } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SobreScreen() {
    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/avatar.png')}
                    style={styles.logo}
                />
                <View style={{ flex: 1 }}>
                    <Text style={globalStyles.titulo}>Mercado Cripto</Text>
                    <Text style={globalStyles.subtitulo}>Explorador de cotações com CoinGecko</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Sobre o App</Text>
                <Text style={globalStyles.texto}>
                    Este aplicativo foi desenvolvido para fins didáticos na disciplina de
                    Desenvolvimento de Software para Aplicações Móveis. Ele demonstra consumo de APIs,
                    navegação por Drawer e boas práticas com React Native + Expo.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Tecnologias</Text>
                <Text style={globalStyles.texto}>• React Native + Expo</Text>
                <Text style={globalStyles.texto}>• Expo Router (file-based routing)</Text>
                <Text style={globalStyles.texto}>• CoinGecko API (cotações em JSON)</Text>
            </View>

            <View style={styles.links}>
                <Pressable onPress={() => Linking.openURL('https://www.coingecko.com/en/api/documentation')}>
                    <Text style={styles.link}>Documentação da CoinGecko</Text>
                </Pressable>
                <Pressable onPress={() => Linking.openURL('mailto:victorvidigal@gmail.com')}>
                    <Text style={styles.link}>Contato do Professor</Text>
                </Pressable>
            </View>

            <Text style={styles.footer}>v1.0.0</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    logo: { width: 64, height: 64, borderRadius: 10, marginRight: 12 },
    card: {
        backgroundColor: '#1b1b1b',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        width: '100%',
    },
    sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 8 },
    links: { marginTop: 8, gap: 8 },
    link: { color: '#69b7ff', fontSize: 14, textDecorationLine: 'underline' },
    footer: { marginTop: 'auto', color: '#777', textAlign: 'center', fontSize: 12 },
});
