// Music Service Integration - Handles Spotify and Apple Music APIs
export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  uri: string;
  previewUrl?: string;
  imageUrl?: string;
}

export interface MatchResult {
  query: {
    title: string;
    artist: string;
  };
  matches: Track[];
  confidence: number;
  matched: boolean;
}

export class MusicService {
  private static spotifyToken: string | null = null;
  private static appleMusicToken: string | null = null;

  // Mock Spotify API integration
  static async searchSpotify(title: string, artist: string): Promise<Track[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response based on popular songs
    const mockTracks: Record<string, Track> = {
      'blinding lights the weeknd': {
        id: 'spotify:track:0VjIjW4GlULA3XF6mKAJKJ',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        uri: 'spotify:track:0VjIjW4GlULA3XF6mKAJKJ',
        previewUrl: 'https://example.com/preview',
        imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      },
      'watermelon sugar harry styles': {
        id: 'spotify:track:6UelLqGlWMcVH1E5c4H7lY',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        album: 'Fine Line',
        uri: 'spotify:track:6UelLqGlWMcVH1E5c4H7lY',
        imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      },
      'levitating dua lipa': {
        id: 'spotify:track:463CkQjx2Zk1yXoBuierM9',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        uri: 'spotify:track:463CkQjx2Zk1yXoBuierM9',
        imageUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
      },
    };

    const searchKey = `${title} ${artist}`.toLowerCase();
    const exactMatch = mockTracks[searchKey];
    
    if (exactMatch) {
      return [exactMatch];
    }

    // Fuzzy matching for similar titles
    const fuzzyMatches = Object.entries(mockTracks).filter(([key]) => {
      const titleMatch = key.includes(title.toLowerCase()) || title.toLowerCase().includes(key.split(' ')[0]);
      const artistMatch = key.includes(artist.toLowerCase()) || artist.toLowerCase().includes(key.split(' ').pop() || '');
      return titleMatch || artistMatch;
    });

    return fuzzyMatches.map(([, track]) => track);
  }

  // Mock Apple Music API integration
  static async searchAppleMusic(title: string, artist: string): Promise<Track[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock similar to Spotify but with Apple Music IDs
    const mockTracks: Record<string, Track> = {
      'blinding lights the weeknd': {
        id: 'applemusic:track:1488408531',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        uri: 'applemusic:track:1488408531',
        imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      },
    };

    const searchKey = `${title} ${artist}`.toLowerCase();
    const exactMatch = mockTracks[searchKey];
    
    return exactMatch ? [exactMatch] : [];
  }

  // Match songs across services
  static async matchSongs(songs: Array<{title: string, artist: string}>): Promise<MatchResult[]> {
    const results: MatchResult[] = [];
    
    for (const song of songs) {
      const spotifyMatches = await this.searchSpotify(song.title, song.artist);
      const appleMusicMatches = await this.searchAppleMusic(song.title, song.artist);
      
      const allMatches = [...spotifyMatches, ...appleMusicMatches];
      const confidence = allMatches.length > 0 ? 0.9 : 0.3;
      
      results.push({
        query: song,
        matches: allMatches,
        confidence,
        matched: allMatches.length > 0,
      });
    }
    
    return results;
  }

  // Add songs to Spotify playlist
  static async addToSpotifyPlaylist(tracks: Track[], playlistId?: string): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful addition
      console.log(`Added ${tracks.length} tracks to Spotify playlist`);
      return true;
    } catch (error) {
      console.error('Failed to add tracks to Spotify:', error);
      return false;
    }
  }

  // Add songs to Apple Music playlist
  static async addToAppleMusicPlaylist(tracks: Track[], playlistId?: string): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock successful addition
      console.log(`Added ${tracks.length} tracks to Apple Music playlist`);
      return true;
    } catch (error) {
      console.error('Failed to add tracks to Apple Music:', error);
      return false;
    }
  }

  // Get user's playlists
  static async getUserPlaylists(service: 'spotify' | 'apple'): Promise<Array<{id: string, name: string}>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockPlaylists = [
      { id: '1', name: 'My Playlist #1' },
      { id: '2', name: 'Liked Songs' },
      { id: '3', name: 'Discover Weekly' },
      { id: '4', name: 'Road Trip Mix' },
    ];
    
    return mockPlaylists;
  }
}