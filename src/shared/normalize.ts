import { PixelRatio, Platform } from 'react-native'

export const scale = (size: number, rate = 1) => {
  if (Platform.OS === 'ios') {
    return PixelRatio.getFontScale() * size * 0.4 * rate
  }
  return PixelRatio.getFontScale() * size
}
