import * as React from 'react'
import { Animated, Platform, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  content: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: undefined,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class PersonalTab extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Thông tin cá nhân',
    header: null
  }

  AnimatedHeaderValue = new Animated.Value(0)

  renderScrollViewContent() {
    const data = Array.from({ length: 30 })
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    )
  }

  render() {
    const imageOpacity = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })
    const imageTranslate = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    })
    const headerTranslate = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp'
    })
    const titleScale = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp'
    })
    const titleTranslate = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT / 2, 0, -8],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {/* {this.renderScrollViewContent()} */}
          <View style={styles.scrollViewContent}>
          <Button
            onPress={() => this.props.dispatch({ type: 'Logout' })}
            style={styles.row}
            title="Đăng xuất"
          />
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri:
                'http://www.cs.trinity.edu/~mserrato/Other/Edit%20My%20Public%20Profile%20%20%20LinkedIn_files/photo_default_bg_topcard_v1.png'
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
        >
          <Text style={styles.title}>Your name</Text>
        </Animated.View>
      </View>
    )
  }
}

export default connect()(PersonalTab)
