import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';
import AutoHeightImage from 'react-native-auto-height-image';
import * as Animatable from 'react-native-animatable';

let { height, width } = Dimensions.get('window')

class Details extends Component {
    render() {
        let { image, item } = this.props.route.params;
        console.log('image---', item.id)
        return (
            <View style={styles.__container} >
                <SharedElement id={`item.${item.id}.image`} style={[StyleSheet.absoluteFillObject]} >
                    <AutoHeightImage
                        width={100}
                        source={{ uri: image }}
                        style={[StyleSheet.absoluteFillObject, styles.__contentImage]}
                    />
                </SharedElement>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <SharedElement id={"bg.element"}>
                        <Animatable.View animation="fadeIn" easing={"ease-in-out"} delay={400} duration={500} style={[styles.__contentCard]}>
                            <Animatable.Text animation="fadeInUp" easing={"ease-in-out"} delay={600} duration={600} style={styles.__imageLabel}>
                                {item.alt_description ? item.alt_description : item.tags[1].title}
                            </Animatable.Text>
                            <Animatable.View animation="fadeInUp" easing={"ease-in-out"} delay={800} duration={600} style={styles.__userContent}>
                                <Image style={styles.__userProfileImage} source={{ uri: item.user.profile_image.large }} />
                                <Text style={styles.__userName}>
                                    {item.user.name}
                                </Text>
                            </Animatable.View>
                        </Animatable.View>
                    </SharedElement>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    __container: {
        flex: 1
    },
    __contentImage: {
        width: undefined,
        height: undefined,
        resizeMode: "cover",
    },
    __contentCard: {
        width: width,
        padding: 10,
        backgroundColor: "#00000075",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    __imageLabel: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase"
    },
    __userContent: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    __userProfileImage: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        borderRadius: 65,
        marginHorizontal: 5
    },
    __userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginHorizontal: 15
    },
})

Details.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;

    return [
        {
            id: `item.${item.id}.image`
        },
        {
            id: "bg.element"
        },
    ]
}
export default Details