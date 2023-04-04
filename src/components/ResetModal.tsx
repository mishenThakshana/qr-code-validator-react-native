import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {FC, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import {qrCodes} from 'src/screens/Home';
import {NavigationHook} from 'src/types/NavigationType';

interface ResetModalInterface {
  visible: boolean;
  visibleHandler: () => void;
}

const ResetModal: FC<ResetModalInterface> = ({
  visible,
  visibleHandler,
}): JSX.Element => {
  const navigation: NavigationHook = useNavigation();
  const [code, setCode] = useState<string>();

  const resetQrCodes = () => {
    if (code === '0001') {
      AsyncStorage.removeItem('qr_codes');
      AsyncStorage.setItem('qr_codes', JSON.stringify(qrCodes));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      Alert.alert('Successfully Resetted', 'Qr Codes resetted successfully');
    } else {
      Alert.alert('Invalid code', 'Provided code is invalid');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => visibleHandler()}>
      <View style={localStyles.modalContainer}>
        <View style={localStyles.modalFormContainer}>
          <TextInput
            onChangeText={setCode}
            placeholder="Enter admin code"
            style={localStyles.modalInput}
            placeholderTextColor="#a9a9a9"
            keyboardType="number-pad"
            value={code}
            secureTextEntry
            selectionColor={colors.PRIMARY}
            maxLength={4}
          />
          <TouchableOpacity onPress={resetQrCodes} style={localStyles.btn}>
            <Text style={localStyles.btnLbl}>Reset Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              })
            }
            style={[
              localStyles.btn,
              {backgroundColor: 'red', paddingVertical: 10},
            ]}>
            <Text style={localStyles.btnLbl}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResetModal;

export const localStyles = StyleSheet.create({
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLbl: {
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFormContainer: {
    width: '70%',
    height: '30%',
    backgroundColor: colors.LIGHT,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20,
    gap: 5,
  },
  modalInput: {
    borderWidth: 0.8,
    borderColor: '#a9a9a9',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: colors.DARK,
    fontSize: 16,
  },
});
