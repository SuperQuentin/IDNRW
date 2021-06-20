import { ToastAndroid } from "react-native";

export const onSuccessToast = () => {
  ToastAndroid.showWithGravity(
    "Mise à jour !",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};

export const onNotPermittedToast = () => {
  ToastAndroid.showWithGravity(
    "Vous n'avez pas les permissions",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};

export const onErrorToast = () => {
  ToastAndroid.showWithGravity(
    "Une erreur c'est produite",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};
