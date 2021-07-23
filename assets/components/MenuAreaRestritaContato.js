import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { css } from "../css/Css";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../../views/Home';

export default function MenuAreaRestritaContato(props) {

    async function back() {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return (
        <View style={css.area__menuContato}>
            <TouchableOpacity style={css.button__home2} onPress={() => back()}>
                <Icon name="chevron-left" size={20} color='#006600' />
            </TouchableOpacity>

            <Text style={css.area__titleVoltar}>{props.title}</Text>

        </View>
    );
}