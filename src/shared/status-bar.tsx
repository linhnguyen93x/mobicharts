import { NativeModules, Platform } from 'react-native'

const { StatusBarManager } = NativeModules

export const getHeight = (): number => {
    return Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
}
