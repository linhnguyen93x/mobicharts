import { AsyncStorage } from 'react-native'

export interface ILocalStorage {
    getItem: (key: string) => any
    setItem: (key: string, value: any) => void
}

export const LocalStorage = {
    getItem: async (key: string) => {
        return JSON.parse(await AsyncStorage.getItem(key))
    },
    setItem: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    },
    removeJwt: async () => {
        AsyncStorage.removeItem('jwt')
    }
}
