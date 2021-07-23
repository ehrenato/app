import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Input, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from './../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from "./../assets/components/MenuAreaRestrita";
import { KeyboardAvoidingView } from 'react-native';
import { root } from '../src/routes/config';
export default function Rastreio({ navigation }) {

    async function sendForm() {
        let response = await fetch(root.urlRoot + 'rastreio?name=' + nome + '&password=' + password, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                document: documento,
                process: processos,
                name: nome,
                cpf: cpf,
                rg: rg,
                email: email,
                motivation: motivacao

            })
        });
        let json = await response.json();
        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('AreaRestrita');
        }
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title='Externo' navigation={navigation} />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={[css.container, css.darkbg]}>

                <ScrollView>

                    <View style={css.externo__form, css.container}>

                        <View style={[css.consultText]}>
                            <Text style={[css.consult__label]}>Preenchar os dados para a consulta.</Text>
                            <TextInput
                                style={css.consult__input}
                                label='teste'
                                placeholder='Enviar Documento...' onChangeText={text => setDocumento(text)} errorMessage={errorDocumento} />
                        </View>

                        <View style={[css.consultText]}>

                            <TextInput
                                style={css.consult__input}
                                placeholder='Processos:' onChangeText={text => setProcessos(text)} errorProcessos={errorProcessos} />
                        </View>

                        <View style={[css.consultText]}>

                            <TextInput
                                style={css.consult__input}
                                placeholder='Nome do interessado:' onChangeText={text => setNome(text)} errorMessage={errorNome} />
                        </View>


                        <View style={[css.consultText]}>

                            <TextInput
                                style={css.consult__input}
                                placeholder='CPF do interessado:' onChangeText={value => {
                                    setCpf(value)
                                    setErrorCpf(null)
                                }}
                                type={'cpf'} keyboardType="number-pad" returnKeyType="done" value={cpf} ref={(ref) => cpfField = ref} errorMessage={errorCpf} />
                        </View>

                        <View style={[css.consultText]}>
                            <TextInput
                                style={css.consult__input}
                                placeholder='RG do interessado:' onChangeText={text => setRg(text)} keyboardType="number-pad" errorMessage={errorRg} />
                        </View>

                        <View style={[css.consultText]}>

                            <TextInput
                                style={css.consult__input}
                                placeholder='E-Mail do interessado:' onChangeText={value => {
                                    setEmail(value)
                                    setErrorEmail(null)
                                }} keyboardType="email-address" errorMessage={errorEmail} />
                        </View>
                        <View style={[css.consultText]}>

                            <TextInput
                                style={css.consult__input}
                                placeholder='Motivação:' onChangeText={text => setMotivacao(text)} errorMessage={errorMotivacao} />
                        </View>

                        <TouchableOpacity style={css.externo__button} onPress={() => sendForm()}>
                            <Text style={css.externo__buttonText}>Enviar</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </View>
    );
}

