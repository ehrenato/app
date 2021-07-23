import React, { useState, useEffect } from 'react';
import { Text, View, Button, BackHandler, Alert } from 'react-native';
import { css } from '../../assets/css/Css';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Profile, Consult, About, } from '../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import List from './List';


export default function AreaRestrita({ navigation }) {

    const Tab = createMaterialBottomTabNavigator();


    //Função para alertar sobre sair do app
        useEffect(() => {
            const backAction = () => {
                Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                    {
                        text: "Não",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Sim", onPress: () => {
                        navigation.navigate('Login');
                        BackHandler.exitApp();
                        }
                    }
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, []);


    return (

        <Tab.Navigator
            barStyle={css.area__tab}
        >
            <Tab.Screen
                name="Inicio"

                component={List}
                options={{
                    tabBarIcon: () => (
                        <Icon name="home" size={26} color='#006600' />
                    )
                }}
            />
            <Tab.Screen
                name="Perfil"

                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <Icon name="users" size={20} color='#006600' />
                    )
                }}
            />
            <Tab.Screen
                name="Consulta"
                component={Consult}
                options={{
                    tabBarIcon: () => (
                        <Icon name="search" size={20} color='#006600' />
                    )
                }}
            />
            <Tab.Screen
                name="Sobre"
                component={About}
                options={{
                    tabBarIcon: () => (
                        <Icon name="question" size={20} color='#006600' />
                    )
                }}
            />
        </Tab.Navigator>
    );
}