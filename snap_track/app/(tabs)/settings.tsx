import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Music, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, AlignJustify as Spotify, Apple } from 'lucide-react-native';

export default function SettingsScreen() {
  const [spotifyConnected, setSpotifyConnected] = useState(true);
  const [appleMusicConnected, setAppleMusicConnected] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoAddEnabled, setAutoAddEnabled] = useState(false);

  const handleSpotifyConnect = () => {
    if (spotifyConnected) {
      Alert.alert(
        'Disconnect Spotify',
        'Are you sure you want to disconnect your Spotify account?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disconnect', style: 'destructive', onPress: () => setSpotifyConnected(false) },
        ]
      );
    } else {
      setSpotifyConnected(true);
      Alert.alert('Success', 'Spotify account connected successfully!');
    }
  };

  const handleAppleMusicConnect = () => {
    if (appleMusicConnected) {
      Alert.alert(
        'Disconnect Apple Music',
        'Are you sure you want to disconnect your Apple Music account?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disconnect', style: 'destructive', onPress: () => setAppleMusicConnected(false) },
        ]
      );
    } else {
      setAppleMusicConnected(true);
      Alert.alert('Success', 'Apple Music account connected successfully!');
    }
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingRow = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: { 
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          {icon}
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1F2937', '#111827']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your account and preferences</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Account Section */}
          <SettingSection title="Account">
            <SettingRow
              icon={<User size={20} color="#EC4899" />}
              title="Profile"
              subtitle="Manage your profile information"
              onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}
            />
          </SettingSection>

          {/* Music Services Section */}
          <SettingSection title="Music Services">
            <SettingRow
              icon={<Music size={20} color="#1DB954" />}
              title="Spotify"
              subtitle={spotifyConnected ? 'Connected' : 'Not connected'}
              onPress={handleSpotifyConnect}
              rightElement={
                <View style={styles.connectionStatus}>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: spotifyConnected ? '#10B981' : '#6B7280' }
                  ]} />
                  <Text style={styles.connectionText}>
                    {spotifyConnected ? 'Connected' : 'Connect'}
                  </Text>
                </View>
              }
            />
            <SettingRow
              icon={<Music size={20} color="#FA233B" />}
              title="Apple Music"
              subtitle={appleMusicConnected ? 'Connected' : 'Not connected'}
              onPress={handleAppleMusicConnect}
              rightElement={
                <View style={styles.connectionStatus}>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: appleMusicConnected ? '#10B981' : '#6B7280' }
                  ]} />
                  <Text style={styles.connectionText}>
                    {appleMusicConnected ? 'Connected' : 'Connect'}
                  </Text>
                </View>
              }
            />
          </SettingSection>

          {/* Preferences Section */}
          <SettingSection title="Preferences">
            <SettingRow
              icon={<Bell size={20} color="#F59E0B" />}
              title="Notifications"
              subtitle="Enable push notifications"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#374151', true: '#EC4899' }}
                  thumbColor="white"
                />
              }
            />
            <SettingRow
              icon={<Music size={20} color="#8B5CF6" />}
              title="Auto-add songs"
              subtitle="Automatically add high-confidence matches"
              rightElement={
                <Switch
                  value={autoAddEnabled}
                  onValueChange={setAutoAddEnabled}
                  trackColor={{ false: '#374151', true: '#EC4899' }}
                  thumbColor="white"
                />
              }
            />
          </SettingSection>

          {/* Support Section */}
          <SettingSection title="Support">
            <SettingRow
              icon={<HelpCircle size={20} color="#06B6D4" />}
              title="Help & Support"
              subtitle="FAQs and contact information"
              onPress={() => Alert.alert('Help', 'Help center coming soon!')}
            />
            <SettingRow
              icon={<Shield size={20} color="#10B981" />}
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              onPress={() => Alert.alert('Privacy', 'Privacy policy coming soon!')}
            />
          </SettingSection>

          {/* Logout Section */}
          <SettingSection title="">
            <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logout', 'Logout functionality coming soon!')}>
              <LogOut size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </SettingSection>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>SongSnap v1.0.0</Text>
            <Text style={styles.appInfoText}>Made with ❤️ for music lovers</Text>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  settingRow: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  connectionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
});