import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { css } from '../../assets/css/Css';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestritaVoltar";
import { root } from '../../src/routes/config';

export default function Mensagens({ navigation }) {

    const [toggle, setToggle] = useState(false);
    const isToggle = () => setToggle(!toggle);
    const [todo, setTodo] = useState([])

    // async function teste(){
    //      fetch(root.urlRoot + 'Mensagens')
    //      .then(res => res.json())
    //         .then((data) => {
    //             setTodo(data)
    //         })
    //         .catch()
    // }

    useEffect(() => {
        let isMounted = true;
        fetch(root.urlRoot + 'Mensagens')
            .then(res => res.json())
            .then((data) => {
                if(isMounted){
                setTodo(data)
                }
            })
        return () => { isMounted = false };
    });

    // console.log(todo);
    // console.log(todo);

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title='Mensagens' navigation={navigation} />
            <ScrollView>


                {todo.map((todos, index) => (
                    <TouchableOpacity style={css.list__button} key={index} >
                        <Text style={css.list__buttonText}>
                            Título: {todos.titulo} {'\n'}
                        </Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    );
}
