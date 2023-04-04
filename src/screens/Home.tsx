import {useEffect, useState} from 'react';
import {Text, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import {NavigationType} from 'src/types/NavigationType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {qrCodeInterface} from 'src/types/UtilTypes';
import FastImage from 'react-native-fast-image';
import {SyncImg} from 'src/assets/images';
import ResetModal from 'src/components/ResetModal';
import {qrCodes} from 'src/config/config';

const Home = ({navigation}: NavigationType) => {
  const [scannedAmount, setScannedAmount] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    initializeCodes();
  }, []);

  const initializeCodes = async () => {
    const codes = await AsyncStorage.getItem('qr_codes');
    if (!codes) {
      AsyncStorage.setItem('qr_codes', JSON.stringify(qrCodes));
    } else {
      let count: number = 0;
      const qrCodes: [] = JSON.parse(codes);
      qrCodes.map((qrCode: qrCodeInterface) => {
        if (qrCode.consumed === 1) count = count + 1;
      });
      setScannedAmount(count);
    }
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <ResetModal
        visible={modalVisible}
        visibleHandler={() => setModalVisible(!modalVisible)}
      />
      <Text style={localStyles.topTxt}>Scanned: {scannedAmount}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={localStyles.syncBtn}>
        <FastImage
          source={SyncImg}
          resizeMode={FastImage.resizeMode.contain}
          style={localStyles.syncImg}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('QrScanner')}
        style={localStyles.btn}>
        <Text style={localStyles.btnLbl}>Scan QR Code</Text>
      </TouchableOpacity>
      <Text style={localStyles.bottomTxt}>Made with ❤️ by Mishen</Text>
    </SafeAreaView>
  );
};

export default Home;

export const localStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
  },
  btnLbl: {
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
  },
  topTxt: {
    position: 'absolute',
    fontFamily: fonts.REGULAR,
    fontSize: 20,
    color: colors.DARK,
    top: 20,
  },
  bottomTxt: {
    position: 'absolute',
    fontFamily: fonts.REGULAR,
    fontSize: 16,
    color: colors.DARK,
    bottom: 20,
  },
  syncBtn: {position: 'absolute', top: 20, right: 20},
  syncImg: {width: 30, height: 30},
});
