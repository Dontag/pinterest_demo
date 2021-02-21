import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import unsplash from '../utilities/AppApi';
import AutoHeightImage from 'react-native-auto-height-image';
import { SharedElement } from 'react-navigation-shared-element';

let { height, width } = Dimensions.get('window')

export default class Dashboard extends Component {
    state = {
        pins: [],
        loading: false,
        index: 1,
        total_pages: null,
        refreshing: false,
        totalPages: 0
    }
    componentDidMount() {
        this.getNewPins(1)
    }

    onRefresh = () => {
        let { totalPages } = this.state
        this.setState({ refreshing: true });
        this.getNewPins(Math.floor(Math.random() * totalPages));
    }

    getNewPins = (page) => {
        let { pins } = this.state;
        let promises = [];
        let pinData = [];
        // let pins = ['ocean', 'design', 'cars', 'arts', 'Tokyo', 'dogs']
        let pinSearch = ['ocean', 'design']

        pinSearch.forEach((pinTerm) => {
            promises.push(
                this.getImages(pinTerm, page).then((res) => {
                    // console.log("data", res.data.total_pages)
                    let results = res.data.results;

                    pinData = pinData.concat(results);

                    pinData.sort((a, b) => {
                        return 0.5 - Math.random();
                    });

                })
            )

            this.getImages(pinTerm, page).then((res) => {
                let { totalPages } = this.state;
                let pages = res.data.total_pages;
                let setPages = totalPages + pages;
                this.setState({ totalPages: setPages / 2 })

            })
            Promise.all(promises).then(() => {
                let Data = [
                    ...pinData,
                    ...pins
                ]
                this.setState({ pins: Data, refreshing: false })
            })
        })


    }

    getImages = (term, page) => {
        return unsplash.get('https://api.unsplash.com/search/photos', {
            params: {
                query: term,
                page: page ? page : 1,
                order_by: "latest"
            }
        })
    }

    getImageDataOnSearch = (term) => {
        let { pins } = this.state;
        this.getImages.then((res) => {
            let results = res.data.results;

            let newPins = [
                ...results,
                ...pins,
            ]
            newPins.sort((a, b) => {
                return 0.5 - Math.random();
            })
            this.setState({
                pins: newPins
            })
        })
    };


    render() {
        let { pins, loading, refreshing } = this.state;
        if (loading) {
            return (
                <View style={[styles.__container, { alignItems: "center", justifyContent: "center" }]}>
                    <ActivityIndicator size={"large"} color={'#28527d'} />
                </View>
            )
        }
        return (
            <View style={styles.__container}>
                <View style={styles.__insideContainer}>
                    <ScrollView contentContainerStyle={styles.__scrollContentContainer} refreshControl={<RefreshControl
                        onRefresh={this.onRefresh}
                        refreshing={refreshing}
                    />} >
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.__posterContainer}>
                                {
                                    pins.filter((_, i) => i % 2 !== 0)
                                        .map((item, index) => {
                                            // console.log("Image--", item)
                                            return (
                                                <TouchableOpacity key={index} onPress={() => { this.props.navigation.navigate('Details', { image: item.urls?.regular, item: item, }) }} style={styles.__posterInnerContainer}>
                                                    <SharedElement id={`item.${item.id}.image`} style={styles.__posterImage}>
                                                        <AutoHeightImage
                                                            width={width / 2 - 15}
                                                            source={{ uri: item.urls?.regular }}
                                                            style={[styles.__posterImage, { backgroundColor: item.color }]}
                                                        />
                                                    </SharedElement>
                                                </TouchableOpacity>

                                            )
                                        })
                                }
                            </View>
                            <View>
                                {
                                    pins.filter((_, i) => i % 2 === 0)
                                        .map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} onPress={() => { this.props.navigation.navigate('Details', { image: item.urls?.regular, item: item, }) }} style={styles.__posterInnerContainer}>
                                                    <SharedElement id={`item.${item.id}.image`} style={styles.__posterImage}>
                                                        <AutoHeightImage
                                                            width={width / 2 - 15}
                                                            source={{ uri: item.urls?.regular }}
                                                            style={[styles.__posterImage, { backgroundColor: item.color }]}
                                                        />
                                                    </SharedElement>
                                                </TouchableOpacity>

                                            )
                                        })
                                }
                            </View>
                        </View>
                        <SharedElement id={"bg.element"}>
                            <View style={[styles.__contentCard, { transform: [{ translateY: height }] }]} />
                        </SharedElement>
                    </ScrollView>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    __container: {
        flex: 1
    },
    __insideContainer: {
        flex: 1
    },
    __scrollContentContainer: {
        paddingHorizontal: 10
    },
    __posterContainer: {
        marginRight: 10
    },
    __posterInnerContainer: {
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#656b70",
        marginVertical: 5,
        elevation: 10,
    },
    __posterImage: {
        width: width / 2 - 15,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    __contentCard: {
        width: width,
        backgroundColor: "#00000050",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})
