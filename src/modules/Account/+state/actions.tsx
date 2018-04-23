import { ActionCreator } from 'react-redux'

import { TCheckAuth, TCheckAuthFail, TCheckAuthSuccess } from './actionTypes'
import { CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS } from './constants'

export const checkAuthAction: ActionCreator<TCheckAuth> = (token: string) => ({
    type: CHECK_AUTH_REQUEST,
    token
})

export const checkAuthSuccessAction: ActionCreator<TCheckAuthSuccess> = (userProfile) => ({
    type: CHECK_AUTH_SUCCESS,
    payload: userProfile
})

export const checkAuthFailAction: ActionCreator<TCheckAuthFail> = () => ({
    type: CHECK_AUTH_SUCCESS
})
