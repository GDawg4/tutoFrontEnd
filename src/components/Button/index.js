import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from './styles';

// Componente custom de botón
// Se utiliza en casi toda la app
const Button = ({ label, onPress, disabled, remove = false }) => (
    <TouchableOpacity style={[styles.container, disabled ? styles.containerDisabled : styles.containerEnabled, remove ? styles.remove : '']} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
);

export default Button;