import {FC} from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import colors from 'src/constants/colors';

interface LoaderInterface {
  state: boolean;
}

const LoaderModal: FC<LoaderInterface> = ({state}) => {
  return (
    <Modal animationType="fade" visible={state} transparent={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator size={50} color={colors.PRIMARY} />
      </View>
    </Modal>
  );
};

export default LoaderModal;
