import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { css } from "../css/Css";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../../views/Home';

export default function MenuAreaRestritaVoltar(props) {

    async function back() {
        props.navigation.navigate('AreaRestrita');
    }

    return (
        <View style={css.area__menu}>
            <TouchableOpacity style={css.button__home2} onPress={() => back()}>
                <Icon name="chevron-left" size={20} color='black' />
            </TouchableOpacity>

            <Text style={css.area__titleVoltar}>{props.title}</Text>

        </View>
    );
}