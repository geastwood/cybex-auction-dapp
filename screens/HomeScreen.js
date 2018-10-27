import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { sortBy } from 'lodash'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { WebBrowser } from 'expo'
import { connect } from 'react-redux'
import * as storeActions from '../store/action'
import * as uiActions from '../saga/action'
import { url } from '../config'

import { MonoText } from '../components/StyledText'
import Auction from '../components/Auction'

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
            </View>
        )
    }
}

class ListScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    componentWillMount() {
        fetch(`${url}/auction`)
            .then(d => d.json())
            .then(this.props.auctionReceive)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {this.props.auctions.map(auction => (
                        <Auction
                            key={auction.id}
                            auction={auction}
                            onPress={() => this.props.navigation.navigate('Modal')}
                        />
                    ))}
                    <TouchableOpacity
                        onPress={() =>
                            this.props.onGetAuctions({
                                type: 'auction.update',
                                payload: { id: 1, auction: { state: 'opened' } },
                            })
                        }
                    >
                        <Text>get auctions</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const ConnectedListScreen = connect(
    ({ auctions }) => ({
        auctions: sortBy(auctions, 'id'),
    }),
    {
        auctionReceive: storeActions.auctionReceive,
        onGetAuctions: uiActions.emitToSocket,
    },
)(ListScreen)

const RootNavigator = createStackNavigator(
    {
        Main: {
            screen: ConnectedListScreen,
        },
        Modal: {
            screen: ModalScreen,
        },
    },
    { mode: 'modal', headerMode: 'none' },
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
})

export default RootNavigator
