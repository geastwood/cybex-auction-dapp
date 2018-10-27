import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { sortBy } from 'lodash'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import { WebBrowser } from 'expo'
import { connect } from 'react-redux'
import * as storeActions from '../store/action'
import * as uiActions from '../saga/action'
import { url } from '../config'

import { MonoText } from '../components/StyledText'
import Auction from '../components/Auction'

class DetailScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={{ paddingTop: 30 }}>
                            <Button onPress={() => this.props.navigation.goBack()} title="Close this auction" />
                            <Auction auction={this.props.auction} header />
                        </View>
                    )}
                    data={this.props.bids}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => <Text style={{ fontSize: 30 }}>{item.price}</Text>}
                />
            </View>
        )
    }
}

const ConnectedDetailScreen = connect(({ auctions, bids }, { navigation: { getParam } }) => {
    const auctionId = getParam('id')
    return {
        auction: auctions.filter(auction => auction.id === auctionId)[0],
        bids: bids.filter(bid => bid.auctionId === auctionId),
    }
})(DetailScreen)

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
                            onPress={() => this.props.navigation.navigate('Detail', { id: auction.id })}
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
        Detail: {
            screen: ConnectedDetailScreen,
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
