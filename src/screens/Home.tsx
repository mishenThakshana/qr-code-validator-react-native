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

export const qrCodes: qrCodeInterface[] = [
  {code: 'ae71ab00-027d-4c59-b560-4164bf4e3828', consumed: 0},
  {code: 'dc442473-9aa2-44f9-91bd-6d70f69467d2', consumed: 0},
  {code: '39162558-7db8-4512-9791-22993fbaa0f1', consumed: 0},
  {code: '8b568e95-deb9-43eb-bebe-d4adbc5334ad', consumed: 0},
  {code: '78d3c7b4-713d-4d69-8336-2f3e4faf93f6', consumed: 0},
  {code: '0586510f-bc54-40c0-b90c-0d934a8901e2', consumed: 0},
  {code: '0d99d3ea-1719-4951-ba65-e354fcd66b92', consumed: 0},
  {code: '8538cb0f-ec96-45a7-ad68-93c35849d912', consumed: 0},
  {code: '9a78fa30-480d-4b46-89ac-593bd615bae8', consumed: 0},
  {code: '5443f8ae-df2a-42bc-bcbe-03f8c9ccb3f3', consumed: 0},
  {code: '9e545a65-250a-4dd4-82d4-265074b374d5', consumed: 0},
  {code: 'ffd97f1b-3494-4251-923d-9d27141d0474', consumed: 0},
  {code: '9b5d8382-59e7-4c77-ac16-d194afcd205b', consumed: 0},
  {code: '397c721a-7f47-4806-8090-39206782c1c5', consumed: 0},
  {code: '62e32f4a-0fcf-423f-a756-c8bafb93d4e7', consumed: 0},
  {code: 'bb513a44-fffd-4433-bbdc-602ea4fdc7a4', consumed: 0},
  {code: 'c78c91bd-bd25-4463-989b-015351a6bf4c', consumed: 0},
  {code: '20b9fac7-3563-4af9-8961-2570fa843043', consumed: 0},
  {code: 'b628f94a-526e-4605-abf0-fa3c94a268f7', consumed: 0},
  {code: '5ad4f079-9e4e-4b2e-9653-4eab451e5f45', consumed: 0},
];

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
