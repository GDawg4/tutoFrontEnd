import React, { useCallback } from "react";
import { Alert, Button, Linking } from "react-native";

const OpenLink = ({ url, title }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={title} onPress={handlePress} />;
};

export default OpenLink;