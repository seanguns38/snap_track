import * as SecureStore from 'expo-secure-store';

export interface CaptureHistory {
  id: string;
  date: string;
  imageUri: string;
  extractedText: string;
  songs: Array<{
    title: string;
    artist: string;
    matched: boolean;
    addedToSpotify: boolean;
    addedToAppleMusic: boolean;
  }>;
  totalFound: number;
  totalAdded: number;
}

export class StorageService {
  private static readonly HISTORY_KEY = 'songsnap_history';
  private static readonly SPOTIFY_TOKEN_KEY = 'spotify_token';
  private static readonly APPLE_MUSIC_TOKEN_KEY = 'apple_music_token';
  private static readonly SETTINGS_KEY = 'app_settings';

  // History Management
  static async saveCapture(capture: CaptureHistory): Promise<void> {
    try {
      const existingHistory = await this.getHistory();
      const updatedHistory = [capture, ...existingHistory].slice(0, 50); // Keep last 50 captures
      
      await SecureStore.setItemAsync(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save capture history:', error);
    }
  }

  static async getHistory(): Promise<CaptureHistory[]> {
    try {
      const historyJson = await SecureStore.getItemAsync(this.HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Failed to load capture history:', error);
      return [];
    }
  }

  static async deleteCapture(captureId: string): Promise<void> {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter(capture => capture.id !== captureId);
      await SecureStore.setItemAsync(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to delete capture:', error);
    }
  }

  static async clearHistory(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  // Token Management
  static async saveSpotifyToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.SPOTIFY_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save Spotify token:', error);
    }
  }

  static async getSpotifyToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(this.SPOTIFY_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to load Spotify token:', error);
      return null;
    }
  }

  static async saveAppleMusicToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.APPLE_MUSIC_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save Apple Music token:', error);
    }
  }

  static async getAppleMusicToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(this.APPLE_MUSIC_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to load Apple Music token:', error);
      return null;
    }
  }

  static async clearTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.SPOTIFY_TOKEN_KEY);
      await SecureStore.deleteItemAsync(this.APPLE_MUSIC_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  // Settings Management
  static async saveSettings(settings: Record<string, any>): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  static async getSettings(): Promise<Record<string, any>> {
    try {
      const settingsJson = await SecureStore.getItemAsync(this.SETTINGS_KEY);
      return settingsJson ? JSON.parse(settingsJson) : {};
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }

  // Statistics
  static async getStatistics(): Promise<{
    totalCaptures: number;
    totalSongsFound: number;
    totalSongsAdded: number;
    averageMatchRate: number;
  }> {
    try {
      const history = await this.getHistory();
      
      const stats = {
        totalCaptures: history.length,
        totalSongsFound: history.reduce((sum, capture) => sum + capture.totalFound, 0),
        totalSongsAdded: history.reduce((sum, capture) => sum + capture.totalAdded, 0),
        averageMatchRate: 0,
      };

      if (stats.totalSongsFound > 0) {
        stats.averageMatchRate = (stats.totalSongsAdded / stats.totalSongsFound) * 100;
      }

      return stats;
    } catch (error) {
      console.error('Failed to calculate statistics:', error);
      return {
        totalCaptures: 0,
        totalSongsFound: 0,
        totalSongsAdded: 0,
        averageMatchRate: 0,
      };
    }
  }
}