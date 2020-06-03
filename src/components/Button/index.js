import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


const Button = ({ label, onPress, disabled, remove = false }) => (
    <TouchableOpacity style={[styles.container, disabled ? styles.containerDisabled : styles.containerEnabled, remove ? styles.remove : '']} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
  	container: {
	    width: "100%",
	    alignItems: "center",
	    justifyContent: "center",
	    backgroundColor: '#428AF8',
	    marginBottom: 20,
	    paddingVertical: 12,
	    borderRadius: 4,
	    borderWidth: 2,
	    borderColor: "rgba(255,255,255,0.7)"
  	},
  	containerDisabled: {
      	opacity: 0.4
  	},
  	containerEnabled: {
      	opacity: 1
  	},
  	text: {
	    color: '#FFFFFF',
	    textAlign: "center",
	    height: 24
	},
	remove: {
		backgroundColor: '#F55E64'
	}
});

export default Button;