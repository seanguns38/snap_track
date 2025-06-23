// NEW: Simple stub implementation for testing until OCR is wired up
export const parseImage = async (req, res) => {
    // Stub: return a fixed song list
    const songs = [
      { title: 'Test Song', artist: 'Test Artist' }
    ];
    res.json({ songs });
  };
  
  export const addToPlaylist = async (req, res) => {
    // Stub: simulate successful addition
    res.json({ success: true });
  };