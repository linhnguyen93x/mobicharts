import { PixelRatio, Platform } from 'react-native'

export const scale = (size: number) => {
  if (Platform.OS === 'ios') {
    return PixelRatio.getFontScale() * size * 0.4
  }
  return PixelRatio.getFontScale() * size
}
