import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, FlatList } from 'react-native';
import axios from 'axios';

export default function PreviewScreen({ route }) {
  const { uri } = route.params;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      const form = new FormData();
      form.append('image', {
        uri,
        name: 'screenshot.jpg',
        type: 'image/jpeg'
      });
      const { data } = await axios.post('http://localhost:4000/songs/parse', form);
      setSongs(data.songs);
    })();
  }, []);

  const addAll = async () => {
    await axios.post('http://localhost:4000/songs/add', { songs, service: 'spotify' });
    alert('Added to playlist!');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image source={{ uri }} style={{ width: '100%', height: 200 }} />
      <FlatList
        data={songs}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => <SongItem title={item.title} artist={item.artist} />}
      />
      <Button title="Add All to Spotify" onPress={addAll} />
    </View>
  );
}