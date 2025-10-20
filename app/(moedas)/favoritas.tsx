import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global';
import { Text } from 'react-native';
import { useState, useEffect } from 'react';

export default function Exemplo1Screen() {

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.texto}>moedas favoritas</Text>
        </SafeAreaView>
    );
}