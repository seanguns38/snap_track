// Mock OCR Service - In production, this would integrate with Google Vision API or similar
export interface ExtractedSong {
  title: string;
  artist: string;
  confidence: number;
  originalText: string;
}

export class OCRService {
  static async extractTextFromImage(imageUri: string): Promise<string> {
    // Simulate OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock extracted text that might come from social media comments
    const mockTexts = [
      `1. Blinding Lights - The Weeknd
      2. Watermelon Sugar - Harry Styles
      3. Levitating - Dua Lipa
      4. Good 4 U - Olivia Rodrigo
      5. Stay - The Kid LAROI & Justin Bieber`,
      
      `🎵 My playlist recommendations:
      - Anti-Hero by Taylor Swift
      - As It Was - Harry Styles
      - Heat Waves by Glass Animals
      - unholy - Sam Smith ft. Kim Petras
      - Flowers - Miley Cyrus`,
      
      `Songs to check out:
      Bad Habit - Steve Lacy
      About Damn Time by Lizzo
      Music For a Sushi Restaurant - Harry Styles
      Glimpse of Us - Joji`
    ];
    
    return mockTexts[Math.floor(Math.random() * mockTexts.length)];
  }

  static parseSongsFromText(text: string): ExtractedSong[] {
    const songs: ExtractedSong[] = [];
    
    // Common patterns for song listings
    const patterns = [
      /(\d+\.?\s*)?(.+?)\s*[-–—]\s*(.+)/g, // "1. Song - Artist" or "Song - Artist"
      /(\d+\.?\s*)?(.+?)\s*by\s+(.+)/gi,   // "Song by Artist"
      /(\d+\.?\s*)?(.+?)\s*-\s*(.+)/g,     // "Song - Artist"
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const title = match[2]?.trim().replace(/^[🎵🎶♪♫\-–—\s]*/, '');
        const artist = match[3]?.trim();
        
        if (title && artist && title.length > 1 && artist.length > 1) {
          // Calculate confidence based on various factors
          let confidence = 0.7;
          
          // Higher confidence for cleaner formatting
          if (match[1]) confidence += 0.1; // Has numbering
          if (title.length > 3) confidence += 0.1;
          if (artist.length > 3) confidence += 0.1;
          if (!title.includes('?') && !artist.includes('?')) confidence += 0.1;
          
          songs.push({
            title,
            artist,
            confidence: Math.min(confidence, 1.0),
            originalText: match[0],
          });
        }
      }
    }

    // Remove duplicates based on title and artist similarity
    const uniqueSongs = songs.filter((song, index, self) => 
      index === self.findIndex(s => 
        s.title.toLowerCase() === song.title.toLowerCase() && 
        s.artist.toLowerCase() === song.artist.toLowerCase()
      )
    );

    return uniqueSongs.slice(0, 10); // Limit to 10 songs max
  }

  static async processImage(imageUri: string): Promise<ExtractedSong[]> {
    try {
      const extractedText = await this.extractTextFromImage(imageUri);
      return this.parseSongsFromText(extractedText);
    } catch (error) {
      console.error('OCR processing failed:', error);
      return [];
    }
  }
}