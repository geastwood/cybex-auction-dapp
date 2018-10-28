import * as React from 'react'
import { View, Image, Text } from 'react-native'
import { RkCard, RkText, RkButton, RkTheme } from 'react-native-ui-kitten'

const styles = {
    container: {
        padding: 8,
    },
    description: {
        fontSize: 18,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
}
const auctionButtonText = {
    listed: 'Listed',
    opened: 'Started',
    closed: 'Closed',
}

const Auction = ({ auction, onPress, renderCountdown = () => null, header = false }) => (
    <RkCard rkType="story">
        <Image rkCardImg source={{ uri: auction.image }} resizeMode="cover" style={{ height: 150 }} />
        <View
            style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
        >
            <Text style={styles.header}>{auction.name}</Text>

            <RkButton rkType="small circle success">{auction.type.toUpperCase()}</RkButton>
        </View>

        {header && <View style={{ flexDirection: 'row' }}>{renderCountdown(auction)}</View>}
        <View style={styles.container}>
            <Text numberOfLines={3} style={styles.description}>
                {auction.description}
            </Text>
        </View>
        {!header && (
            <View rkCardFooter>
                <RkButton rkType="large" onPress={onPress}>
                    {auctionButtonText[auction.state]}
                </RkButton>
                <RkButton rkType="large outline" onPress={onPress}>
                    Detail
                </RkButton>
            </View>
        )}
    </RkCard>
)

export default Auction
