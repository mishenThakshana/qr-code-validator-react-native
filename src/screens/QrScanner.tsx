import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LoaderModal from 'src/components/LoaderModal';
import {NavigationHook} from 'src/types/NavigationType';
import {qrCodeInterface} from 'src/types/UtilTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrScanner = (): JSX.Element => {
  const navigation: NavigationHook = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodes, setQrCodes] = useState<qrCodeInterface[]>([]);

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    const codes = await AsyncStorage.getItem('qr_codes');
    const localQrCodes: [] = JSON.parse(codes || '');
    setQrCodes(localQrCodes);
  };

  return (
    <>
      <LoaderModal state={loading} />
      <QRCodeScanner
        containerStyle={localStyles.container}
        cameraStyle={localStyles.camera}
        reactivate
        reactivateTimeout={5000}
        onRead={({data}) => {
          setLoading(true);
          setTimeout(() => {
            if (
              qrCodes.find((qrCode: qrCodeInterface) => qrCode.code === data)
            ) {
              const codeData: qrCodeInterface | any = qrCodes.find(
                (qrCode: qrCodeInterface) => qrCode.code === data,
              );
              if (codeData?.consumed === 1) {
                Alert.alert('Oops', 'Qr code already consumed');
              } else {
                codeData.consumed = 1;
                let newArr = qrCodes.filter(
                  (localCode: qrCodeInterface) =>
                    localCode.code !== codeData.code,
                );
                newArr.push(codeData);
                Alert.alert(
                  'Successfully scanned',
                  'Qr code validated successfully',
                );
                AsyncStorage.setItem('qr_codes', JSON.stringify(newArr));
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              }
            } else {
              Alert.alert('Oops', 'Invalid QR Code');
            }
            setLoading(false);
          }, 1500);
        }}
      />
    </>
  );
};

export default QrScanner;

export const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  camera: {
    flex: 1,
  },
});
