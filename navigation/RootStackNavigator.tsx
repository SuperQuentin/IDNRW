import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
    Login: { initials?: string }
}

const root = createStackNavigator<RootParamList>()

export default root