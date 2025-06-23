import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SongItem({ title, artist }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  artist: {
    fontSize: 14,
    color: '#666'
  }
});