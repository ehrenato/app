import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import {Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonSuccess} from '../../assets/css/Css';

export const List = () => {
    return(
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Listar Usuários</Titulo>
                <BotaoAcao>
                    <Link to="/">
                        <ButtonSuccess>Cadastrar</ButtonSuccess>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            <table>
                <tr>
                    <th>teste</th>
                </tr>
            </table>
        </Container>
    )
}