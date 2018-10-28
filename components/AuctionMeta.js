import * as React from 'react'
import { View, Image, Text } from 'react-native'
import { RkButton } from 'react-native-ui-kitten'

const styles = {
    container: {
        padding: 8,
    },
}
const auctionButtonText = {
    listed: 'Listed',
    opened: 'Started',
    closed: 'Closed',
}

const AuctionMeta = ({ auction, highestPrice }) => (
    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <RkButton rkType="small circle outline">{auctionButtonText[auction.state]}</RkButton>
        <Text>
            Price(min/highest): ${auction.minimiumBidPrice}/${highestPrice}
        </Text>
    </View>
)

export default AuctionMeta
