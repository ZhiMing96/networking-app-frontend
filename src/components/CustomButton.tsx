import React from 'react';
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

interface Props {
  btnText: string;
  additionalBtnStyles: ViewStyle | TextStyle | ImageStyle;
  additionalTextStyles: ViewStyle | TextStyle | ImageStyle;
  onPressHandler: <T>() => T;
}

const CustomButton = (props: Props) => {
  const styles = StyleSheet.create({
    btn: {
      width: 100,
      padding: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 10,
      borderColor: 'grey',
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'flex-end',
      ...props.additionalBtnStyles,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'dimgrey',
      ...props.additionalTextStyles,
    },
  });
  return (
    <Pressable onPress={props.onPressHandler} style={styles.btn}>
      <Text style={styles.text}>{props.btnText}</Text>
    </Pressable>
  );
};

export default CustomButton;
