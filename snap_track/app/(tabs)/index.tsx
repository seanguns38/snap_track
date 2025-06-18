import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Upload, Sparkles, Music, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Song {
  title: string;
  artist: string;
  matched: boolean;
  confidence: number;
}

export default function CaptureScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedSongs, setExtractedSongs] = useState<Song[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to upload images.');
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      processImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permission needed', 'We need camera access to take photos.');
        return;
      }
    }
    setShowCamera(true);
  };

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      const mockSongs: Song[] = [
        { title: 'Blinding Lights', artist: 'The Weeknd', matched: true, confidence: 0.95 },
        { title: 'Watermelon Sugar', artist: 'Harry Styles', matched: true, confidence: 0.92 },
        { title: 'Levitating', artist: 'Dua Lipa', matched: true, confidence: 0.88 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', matched: true, confidence: 0.91 },
        { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', matched: false, confidence: 0.65 },
      ];
      
      setExtractedSongs(mockSongs);
      setIsProcessing(false);
    }, 2000);
  };

  const addToPlaylist = (service: 'spotify' | 'apple') => {
    const matchedSongs = extractedSongs.filter(song => song.matched);
    Alert.alert(
      'Success!',
      `Added ${matchedSongs.length} songs to your ${service === 'spotify' ? 'Spotify' : 'Apple Music'} playlist.`
    );
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back">
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cameraButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => {
                setShowCamera(false);
                // Simulate capture
                const mockUri = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg';
                setSelectedImage(mockUri);
                processImage(mockUri);
              }}
            >
              <Camera size={32} color="white" />
            </TouchableOpacity>
            <View style={styles.cameraButton} />
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1F2937', '#111827']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>SongSnap</Text>
            <Text style={styles.subtitle}>Capture songs, build playlists instantly</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                style={styles.actionButtonGradient}
              >
                <Camera size={32} color="white" />
                <Text style={styles.actionButtonText}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.actionButtonGradient}
              >
                <Upload size={32} color="white" />
                <Text style={styles.actionButtonText}>Upload Image</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Processing State */}
          {isProcessing && (
            <View style={styles.processingContainer}>
              <Sparkles size={24} color="#EC4899" />
              <Text style={styles.processingText}>Extracting songs...</Text>
            </View>
          )}

          {/* Selected Image */}
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            </View>
          )}

          {/* Extracted Songs */}
          {extractedSongs.length > 0 && (
            <View style={styles.songsContainer}>
              <Text style={styles.songsHeader}>Found Songs</Text>
              
              {extractedSongs.map((song, index) => (
                <View key={index} style={styles.songItem}>
                  <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songArtist}>{song.artist}</Text>
                  </View>
                  <View style={styles.songStatus}>
                    {song.matched ? (
                      <View style={styles.matchedBadge}>
                        <Text style={styles.matchedText}>✓</Text>
                      </View>
                    ) : (
                      <View style={styles.unmatchedBadge}>
                        <Text style={styles.unmatchedText}>?</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}

              {/* Add to Playlist Buttons */}
              <View style={styles.playlistButtons}>
                <TouchableOpacity
                  style={styles.playlistButton}
                  onPress={() => addToPlaylist('spotify')}
                >
                  <LinearGradient
                    colors={['#1DB954', '#1ED760']}
                    style={styles.playlistButtonGradient}
                  >
                    <Music size={20} color="white" />
                    <Text style={styles.playlistButtonText}>Add to Spotify</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playlistButton}
                  onPress={() => addToPlaylist('apple')}
                >
                  <LinearGradient
                    colors={['#FA233B', '#FF3B30']}
                    style={styles.playlistButtonGradient}
                  >
                    <Music size={20} color="white" />
                    <Text style={styles.playlistButtonText}>Add to Apple Music</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick Tips */}
          {!selectedImage && (
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsHeader}>💡 Quick Tips</Text>
              <Text style={styles.tipText}>• Capture clear text from social media comments</Text>
              <Text style={styles.tipText}>• Works best with "Song - Artist" format</Text>
              <Text style={styles.tipText}>• Review matches before adding to playlist</Text>
            </View>
          )}
        </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtonGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginTop: 8,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#374151',
    borderRadius: 12,
    marginBottom: 20,
  },
  processingText: {
    color: '#EC4899',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  imageContainer: {
    marginBottom: 20,
  },
  selectedImage: {
    width: width - 40,
    height: 200,
    borderRadius: 12,
  },
  songsContainer: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  songsHeader: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  songStatus: {
    marginLeft: 12,
  },
  matchedBadge: {
    backgroundColor: '#10B981',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchedText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  unmatchedBadge: {
    backgroundColor: '#F59E0B',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unmatchedText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  playlistButtons: {
    marginTop: 20,
  },
  playlistButton: {
    marginBottom: 12,
  },
  playlistButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  playlistButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  tipsHeader: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 8,
    lineHeight: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  cameraButton: {
    flex: 1,
    alignItems: 'center',
  },
  cameraButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  captureButton: {
    backgroundColor: '#EC4899',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});