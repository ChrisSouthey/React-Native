import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import BrowseScreen, { BrowseStackParamList } from './screens/CatalogScreen'
import CollectionScreen, { CollectionStackParamList } from './screens/CollectionScreen'
import ItemModal from './screens/ItemModel'
import { CollectionProvider, useCollection } from './CollectionContext'
import { GearItem } from './types'

type TabParamList = { BrowseTab: undefined; CollectionTab: undefined }

const BrowseStack = createStackNavigator<BrowseStackParamList>()
const CollectionStack = createStackNavigator<CollectionStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const TAB_ICONS: Record<keyof TabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
    BrowseTab: { active: 'albums', inactive: 'albums-outline' },
    CollectionTab: { active: 'bookmark', inactive: 'bookmark-outline' }
}

type IconProps = { color: string; size: number; focused: boolean }

function iconFactory(routeName: keyof TabParamList) {
    return ({ color, size, focused }: IconProps) => {
        const names = TAB_ICONS[routeName]
        return <Ionicons name={focused ? names.active : names.inactive} size={size} color={color} />
    }
}

function catalogScreenOptions({ route }: { route: RouteProp<Record<string, object | undefined>, string> }): BottomTabNavigationOptions {
    const name = route.name as keyof TabParamList
    return {
        headerShown: false,
        tabBarIcon: iconFactory(name),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#000' }
    }
}

function BrowseStackScreen() {
    return (
        <BrowseStack.Navigator>
            <BrowseStack.Screen name="Browse" component={BrowseScreen} options={{ title: 'Browse' }} />
            <BrowseStack.Screen name="ItemModal" component={ItemModal} options={{ presentation: 'modal', headerShown: false }} />
        </BrowseStack.Navigator>
    )
}

function CollectionStackScreen() {
    return (
        <CollectionStack.Navigator>
            <CollectionStack.Screen name="Collection" component={CollectionScreen} options={{ title: 'Collection' }} />
            <CollectionStack.Screen name="ItemModal" component={ItemModal} options={{ presentation: 'modal', headerShown: false }} />
        </CollectionStack.Navigator>
    )
}

function LabelBrowse() { return <Text>Browse</Text> }
function LabelCollection() { return <Text>Collection</Text> }

function TabsInner() {
    const { list } = useCollection()
    const badge = list.length > 0 ? list.length : undefined
    return (
        <Tab.Navigator screenOptions={catalogScreenOptions}>
            <Tab.Screen name="BrowseTab" component={BrowseStackScreen} options={{ tabBarLabel: LabelBrowse }} />
            <Tab.Screen name="CollectionTab" component={CollectionStackScreen} options={{ tabBarLabel: LabelCollection, tabBarBadge: badge }} />
        </Tab.Navigator>
    )
}

export function CatalogTabs() {
    return (
        <CollectionProvider>
            <TabsInner />
        </CollectionProvider>
    )
}
