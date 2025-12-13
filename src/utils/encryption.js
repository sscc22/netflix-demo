// Simple encryption/decryption utility for API Key
// Base64 encoding with custom salt for basic obfuscation

const SALT = 'netflix-demo-2024';

export const encryptApiKey = (apiKey) => {
  if (!apiKey) return '';
  
  try {
    // Simple XOR encryption with salt
    const encrypted = apiKey.split('').map((char, i) => {
      const saltChar = SALT.charCodeAt(i % SALT.length);
      return String.fromCharCode(char.charCodeAt(0) ^ saltChar);
    }).join('');
    
    // Base64 encode
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

export const decryptApiKey = (encryptedKey) => {
  if (!encryptedKey) return '';
  
  try {
    // Base64 decode
    const decoded = atob(encryptedKey);
    
    // XOR decryption with salt
    const decrypted = decoded.split('').map((char, i) => {
      const saltChar = SALT.charCodeAt(i % SALT.length);
      return String.fromCharCode(char.charCodeAt(0) ^ saltChar);
    }).join('');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

// Test function (optional)
export const testEncryption = (apiKey) => {
  console.log('Original:', apiKey);
  const encrypted = encryptApiKey(apiKey);
  console.log('Encrypted:', encrypted);
  const decrypted = decryptApiKey(encrypted);
  console.log('Decrypted:', decrypted);
  console.log('Match:', apiKey === decrypted);
};
