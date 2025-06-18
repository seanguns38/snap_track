import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Music, Trash2, ExternalLink } from 'lucide-react-native';

interface HistoryItem {
  id: string;
  date: string;
  songsFound: number;
  songsAdded: number;
  service: 'spotify' | 'apple' | 'both';
  imagePreview: string;
  songs: Array<{
    title: string;
    artist: string;
    added: boolean;
  }>;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    songsFound: 8,
    songsAdded: 7,
    service: 'spotify',
    imagePreview: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
    songs: [
      { title: 'Blinding Lights', artist: 'The Weeknd', added: true },
      { title: 'Watermelon Sugar', artist: 'Harry Styles', added: true },
      { title: 'Levitating', artist: 'Dua Lipa', added: true },
    ],
  },
  {
    id: '2',
    date: '2024-01-14T15:45:00Z',
    songsFound: 5,
    songsAdded: 5,
    service: 'both',
    imagePreview: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    songs: [
      { title: 'Good 4 U', artist: 'Olivia Rodrigo', added: true },
      { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', added: true },
    ],
  },
  {
    id: '3',
    date: '2024-01-13T20:15:00Z',
    songsFound: 12,
    songsAdded: 10,
    service: 'apple',
    imagePreview: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    songs: [
      { title: 'Anti-Hero', artist: 'Taylor Swift', added: true },
      { title: 'As It Was', artist: 'Harry Styles', added: true },
      { title: 'Heat Waves', artist: 'Glass Animals', added: false },
    ],
  },
];

export default function HistoryScreen() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'spotify':
        return '#1DB954';
      case 'apple':
        return '#FA233B';
      case 'both':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  const getServiceName = (service: string) => {
    switch (service) {
      case 'spotify':
        return 'Spotify';
      case 'apple':
        return 'Apple Music';
      case 'both':
        return 'Both Services';
      default:
        return 'Unknown';
    }
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
    >
      <View style={styles.historyHeader}>
        <View style={styles.historyInfo}>
          <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
          <Text style={styles.historySongs}>
            {item.songsAdded}/{item.songsFound} songs added
          </Text>
        </View>
        <View style={[styles.serviceBadge, { backgroundColor: getServiceColor(item.service) }]}>
          <Text style={styles.serviceBadgeText}>{getServiceName(item.service)}</Text>
        </View>
      </View>

      {selectedItem?.id === item.id && (
        <View style={styles.historyDetails}>
          <Text style={styles.detailsHeader}>Songs from this capture:</Text>
          {item.songs.map((song, index) => (
            <View key={index} style={styles.songDetail}>
              <View style={styles.songDetailInfo}>
                <Text style={styles.songDetailTitle}>{song.title}</Text>
                <Text style={styles.songDetailArtist}>{song.artist}</Text>
              </View>
              <View style={[
                styles.songDetailStatus,
                { backgroundColor: song.added ? '#10B981' : '#6B7280' }
              ]}>
                <Text style={styles.songDetailStatusText}>
                  {song.added ? '✓' : '✗'}
                </Text>
              </View>
            </View>
          ))}
          
          <View style={styles.historyActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ExternalLink size={16} color="#EC4899" />
              <Text style={styles.actionButtonText}>View Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash2 size={16} color="#EF4444" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1F2937', '#111827']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your song capture history</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>152</Text>
            <Text style={styles.statLabel}>Songs Added</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Captures</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Match Rate</Text>
          </View>
        </View>

        {/* History List */}
        <FlatList
          data={mockHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.historyListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#EC4899',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  historyList: {
    flex: 1,
  },
  historyListContent: {
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 4,
  },
  historySongs: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  serviceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  serviceBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  historyDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
  },
  detailsHeader: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 12,
  },
  songDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  songDetailInfo: {
    flex: 1,
  },
  songDetailTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  songDetailArtist: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  songDetailStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songDetailStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  historyActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
});