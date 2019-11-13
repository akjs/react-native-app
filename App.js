import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useGet } from '@brightleaf/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Header, ListItem, Overlay } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink'

const Item = ({ title, }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.linkTitle}>{title}</Text>
    </View>
  );
}
const renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    leftAvatar={{
      source: item.avatar_url && { uri: item.avatar_url },
      title: item.name[0]
    }}
    bottomDivider
    chevron
  />
)

export default function App() {

  const { data, loading, getUrl } = useGet('https://kev-pi.herokuapp.com/api/me')
  useEffect(() => {
    getUrl()
  }, [])
  const [url, setUrl] = useState('')


  return (
    <View style={styles.container}>
      <Header
        placement="center"
        centerComponent={{ text: 'Kevin Isom', style: { color: '#fff', fontSize: 32,
        padding: 5,
        marginBottom: 5,} }}
        rightComponent={{ icon: 'ios-flash', color: '#fff' ,type:'ionicon'}}
      />
      <Overlay
        onBackdropPress={() => setUrl('')}
        isVisible={url !== ''}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
      >
        <View>
          <View style={{ marginTop: 50 }}>
            <Hyperlink linkDefault={true}>{url}</Hyperlink>
            <Button
              title="Close"
              onPress={() => {
                setUrl('')
              }}
            />
          </View>
        </View>
      </Overlay>
      {loading && <ActivityIndicator size="large" />}
      <View style={styles.social}>
        <ListItem
          key={'twitter'}
          leftAvatar={<Ionicons name="logo-twitter" size={32} color="#1ba9f8" />}
          title={data.twitter && data.twitter.user}
          subtitle="Twitter"
          bottomDivider
          onPress={() => {
            setUrl(data.twitter.url)
          }}
        />
        <ListItem
          key={'linkedin'}
          leftAvatar={<Ionicons name="logo-linkedin" size={32} color="#0077ba" />}
          title={data.linkedin && data.linkedin.user}
          subtitle="LinkedIn"
          bottomDivider
          onPress={() => {
            setUrl(data.linkedin.url)
          }}
        />
        <ListItem
          key={'github'}
          leftAvatar={<Ionicons name="logo-github" size={32} color="#000000" />}
          title={data.github && data.github.user}
          subtitle="GitHub"
          bottomDivider
          onPress={() => {
            setUrl(data.linkedin.url)
          }}
        />
      </View>
      <FlatList
        style={styles.list}
        data={data.links || []}
        renderItem={({ item }) => <ListItem style={styles.item} title={item.name} subtitle={item.details} bottomDivider chevron/>}
        keyExtractor={item => item.url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 32,
    padding: 5,
    margin: 5,
  },
  linkTitle: {
    fontSize: 22,
  },
  list: {
    width: '100%',
  },
  social: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '100%',

  },
  item: {

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
