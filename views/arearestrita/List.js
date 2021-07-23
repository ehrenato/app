import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Redirect } from 'react-native';
import { css } from '../../assets/css/Css';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import { root } from '../../src/routes/config';

function List({ navigation }) {

    const [toggle, setToggle] = useState(false);
    const isToggle = () => setToggle(!toggle);
    const [todos, setTodos] = useState([]);
    const [nome, setNome] = useState([]);
    const [id_proc, setIdPro] = useState([]);

    useEffect(() => {
        fetch(root.urlRoot + 'List')
            .then(res => res.json())
            .then((data) => {
                setTodos(data.arr)
                setNome(data.nome)
            })
            .catch(console.log)
    }, []);

    async function sendForm() {
        await fetch(root.urlRoot + 'Mensagem?id_processo=' + id_proc, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
    sendForm();

    async function Verifica() {

        if (id_proc === null) {
            console.log("erro")
        } else {
            sendForm();
            navigation.navigate('Mensagens');
        }
    }

    // async function redi() {
    //     navigation.navigate('Mensagens');
    // }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title='Novidades' navigation={navigation} />
            <ScrollView>

                {todos.map((todo, index) => (

                    <TouchableOpacity style={css.list__button} key={index}
                        onPress={() => Verifica(setIdPro(todo.processo_id))} >
                        <Text style={css.list__buttonText}>
                            Título: {todo.texto} {'\n'}
                            Data: {todo.data} {'\n'}
                            Número: {todo.numero} {'\n'}
                            Descrição: {todo.descricao} {'\n'}
                            Tipo: {todo.tp_novidade} {'\n'}
                        </Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    )
}

export default List
