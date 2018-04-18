import { ActionCreator } from 'react-redux'

import { TCheckAuth, TCheckAuthSuccess } from './actionTypes'
import { CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS } from './constants'

export const checkAuthAction: ActionCreator<TCheckAuth> = () => ({
    type: CHECK_AUTH_REQUEST
})

export const checkAuthSuccessAction: ActionCreator<TCheckAuthSuccess> = (userProfile) => ({
    type: CHECK_AUTH_SUCCESS,
    payload: userProfile
})
