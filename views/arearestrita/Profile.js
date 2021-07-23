import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Input, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import { root } from '../../src/routes/config';


function Profile({ navigation }) {

    const [todos, setTodos] = useState('')

    useEffect(() => {
        fetch(root.urlRoot + 'List')
            .then(res => res.json())
            .then((data) => {
                setTodos(data)
            })
            .catch(console.log)
    }, []);


    return (
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title='Perfil' navigation={navigation} />
            <ScrollView>

                <TouchableOpacity style={css.list__button}>
                    <Text style={css.list__buttonText}>ID: {todos.id}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={css.list__button}>
                    <Text style={css.list__buttonText}>NOME: {todos.nome}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.list__button}>
                    <Text style={css.list__buttonText}>LOGIN: {todos.login}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={css.list__button}>
                    <Text style={css.list__buttonText}>E-MAIL: {todos.email}</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

export default Profile