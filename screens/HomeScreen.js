import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { sortBy } from 'lodash'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import { WebBrowser } from 'expo'
import { connect } from 'react-redux'
import * as storeActions from '../store/action'
import * as uiActions from '../saga/action'
import { url, demoUsers } from '../config'

import { MonoText } from '../components/StyledText'
import Auction from '../components/Auction'
import Countdown from '../components/Countdown'
import Bid from '../components/Bid'
import { RkButton } from 'react-native-ui-kitten'

const renderCountdown = onTimeup => auction => {
    if (auction.state === 'opened') {
        return <Countdown endTime={auction.startTime + auction.duration * 1000} onTimeup={() => onTimeup(auction)} />
    }
    return null
}
class DetailScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={{ paddingTop: 30 }}>
                            <Button onPress={() => this.props.navigation.goBack()} title="Close this auction" />
                            <Auction
                                auction={this.props.auction}
                                header
                                renderCountdown={renderCountdown(() => this.props.onTimeup(this.props.auction))}
                            />
                        </View>
                    )}
                    data={this.props.bids}
                    keyExtractor={({ id }) => String(id)}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                { padding: 8 },
                                item.user === this.props.user
                                    ? { alignItems: 'flex-end' }
                                    : { alignItems: 'flex-start' },
                            ]}
                        >
                            <Bid bid={item} myBid={item.user === this.props.user} />
                        </View>
                    )}
                />
            </View>
        )
    }
}

const ConnectedDetailScreen = connect(
    ({ auctions, bids, user }, { navigation: { getParam } }) => {
        const auctionId = getParam('id')
        return {
            auction: auctions.filter(auction => auction.id === auctionId)[0],
            bids: bids.filter(bid => bid.auctionId === auctionId),
            user,
        }
    },
    {
        onTimeup: auction =>
            uiActions.emitToSocket({
                type: 'auction.update',
                payload: { id: auction.id, auction: { state: 'closed', endTime: Date.now() } },
            }),
    },
)(DetailScreen)

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
                {!this.props.user && (
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 12,
                            marginTop: 30,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        {demoUsers.map(user => (
                            <RkButton
                                style={{ alignSelf: 'center' }}
                                rkType="small circle outline"
                                key={user}
                                onPress={() => this.props.onUserSelect(user)}
                            >
                                {user}
                            </RkButton>
                        ))}
                    </View>
                )}
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {this.props.auctions.map(auction => (
                        <Auction
                            key={auction.id}
                            auction={auction}
                            renderCountdown={renderCountdown(() => this.props.onTimeup(auction))}
                            onPress={() => this.props.navigation.navigate('Detail', { id: auction.id })}
                        />
                    ))}
                    <TouchableOpacity
                        onPress={() =>
                            this.props.onGetAuctions({
                                type: 'auction.update',
                                payload: { id: 1, auction: { state: 'opened', startTime: Date.now() } },
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
    ({ auctions, user }) => ({
        auctions: sortBy(auctions, 'id'),
        user,
    }),
    {
        auctionReceive: storeActions.auctionReceive,
        onGetAuctions: uiActions.emitToSocket,
        onUserSelect: storeActions.userReceive,
        onTimeup: auction =>
            uiActions.emitToSocket({
                type: 'auction.update',
                payload: { id: auction.id, auction: { state: 'closed', endTime: Date.now() } },
            }),
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
