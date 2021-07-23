import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Text, View } from 'react-native';
import { css } from '../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { root } from '../src/routes/config';


export default function Login({ navigation }) {
    
    const [display, setDisplay] = useState('none');
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState([]);
    const [login, setLogin] = useState([]);

        useEffect(() => {
            verifyLogin();
        }, []);

    //Verifica se o usuário já possui algum login
    async function verifyLogin() {
        let router = await AsyncStorage.getItem('userData');
        let json = await JSON.parse(router);
        if (json !== null) {
            setUser(json.name);
            setPassword(json.password);
            setLogin(true);
        }
    }

    //Envio do formulário de login
    async function sendForm() {
        let router = await fetch(root.urlRoot + 'login?login=' + user + '&password=' + password, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        });

        let json = await router.json();

        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 3000);
        } else {
            navigation.navigate('AreaRestrita');
        }
    }

    return (
        <KeyboardAvoidingView
            style={[css.container, css.darkbg]}>
            <View style={css.login__form, css.container}>
                <View style={css.login__img}>
                    <Image source={require('../assets/img/logo_idema.png')} />
                </View>
                <TextInput style={css.login__input} placeholder='Usuário:' onChangeText={text => setUser(text)} />
                <TextInput style={css.login__input} placeholder='Senha:' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                    <Text style={css.login__buttonText}>Entrar</Text>
                </TouchableOpacity>
                {/* <View>
                    <View>
                        <Text style={css.login__msg}>Usuário ou senha inválidos!</Text>
                    </View>
                </View> */}
            </View>
        </KeyboardAvoidingView>
    );
}