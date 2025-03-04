const SmartLedger = require("smartledger-sdk");
const crypto = require("crypto");

// Mock browser-specific storage for Node.js environment
if (typeof window === "undefined") {
  global.localStorage = {
    _data: {},
    setItem: function (id, val) {
      return (this._data[id] = String(val));
    },
    getItem: function (id) {
      return this._data[id];
    },
    removeItem: function (id) {
      return delete this._data[id];
    },
    clear: function () {
      return (this._data = {});
    },
  };
  global.window = {
    crypto: {
      getRandomValues: function (buffer) {
        return crypto.randomFillSync(buffer);
      },
    },
  };
}

async function demonstrateSDK() {
  try {
    console.log("\n=== SmartLedger SDK Node.js Demo ===\n");

    // 1. BIP39 Mnemonic Operations
    console.log("1. BIP39 Mnemonic Operations:");
    const mnemonic = SmartLedger.generateMnemonic();
    console.log("Generated Mnemonic:", mnemonic);
    console.log("Mnemonic Valid:", SmartLedger.validateMnemonic(mnemonic));
    const seed = await SmartLedger.mnemonicToSeedHex(mnemonic);
    console.log("Seed (first 32 chars):", seed.substring(0, 32), "...\n");

    // 2. HD Wallet Derivation
    console.log("2. HD Wallet Derivation:");
    const path = "m/44'/236'/0'/0/0";
    const derived = await SmartLedger.derivePath(mnemonic, path);
    console.log("Derived Path:", path);
    console.log("Private Key:", derived.privateKey);
    console.log("Public Key:", derived.publicKey);
    console.log("WIF:", derived.wif, "\n");

    // 3. BSV Operations
    console.log("3. BSV Operations:");

    // Generate key pair
    const keyPair = SmartLedger.generateKeyPair();
    const privateKey = SmartLedger.bsv.PrivateKey.fromWIF(
      keyPair.privateKey.toString()
    );
    const publicKey = privateKey.toPublicKey();
    const address = publicKey.toAddress().toString();

    console.log("Generated Key Pair:");
    console.log("- Private Key (WIF):", privateKey.toWIF());
    console.log("- Public Key (Hex):", publicKey.toString());
    console.log("- BSV Address:", address);

    // Sign message
    const message = "Hello SmartLedger!";
    const signature = await SmartLedger.signMessage(
      message,
      keyPair.privateKey.toString()
    );
    console.log("\nMessage Signing:");
    console.log("- Message:", message);
    console.log("- Signature:", signature);

    // Verify signature
    const isValid = await SmartLedger.verifySignature(
      message,
      signature,
      keyPair.publicKey.toString()
    );
    console.log("- Signature Valid:", isValid, "\n");

    // 4. Cryptographic Operations
    console.log("4. Cryptographic Operations:");
    const data = "Sensitive Data";
    const key = "encryption-key";

    // Encryption
    const encrypted = SmartLedger.encrypt(data, key);
    const decrypted = SmartLedger.decrypt(encrypted, key);
    console.log("Encryption Test:");
    console.log("- Original:", data);
    console.log("- Encrypted:", encrypted);
    console.log("- Decrypted:", decrypted);

    // Hashing
    console.log("\nHashing Test:");
    console.log("- SHA256:", SmartLedger.hash(data, "SHA256"));
    console.log("- SHA512:", SmartLedger.hash(data, "SHA512"));
    console.log("- MD5:", SmartLedger.hash(data, "MD5"), "\n");

    // 5. Shamir's Secret Sharing
    console.log("5. Shamir's Secret Sharing:");
    const secret = "My Secret Message";
    const shares = SmartLedger.splitSecret(secret, 5, 3);
    console.log("Original Secret:", secret);
    console.log("Generated Shares:");
    shares.forEach((share, i) =>
      console.log(`- Share ${i + 1}:`, share.substring(0, 32), "...")
    );

    const reconstructed = SmartLedger.combineShares(shares.slice(0, 3));
    console.log("Reconstructed Secret:", reconstructed, "\n");

    // 6. Storage Operations
    console.log("6. Storage Operations:");
    const keyId = "test-key-1";
    const storageKey = "master-storage-key";

    await SmartLedger.storeKey(
      keyId,
      "sensitive-data",
      {
        label: "Test Key",
        timestamp: Date.now(),
      },
      storageKey
    );
    console.log("Stored Key with ID:", keyId);

    const retrieved = await SmartLedger.retrieveKey(keyId, storageKey);
    console.log("Retrieved Key Data:", retrieved);

    const allKeys = await SmartLedger.listKeys();
    console.log("All Stored Keys:", allKeys, "\n");

    // 7. Utility Functions
    console.log("7. Utility Functions:");
    const domain = "test.smartledger.solutions";
    const uuid = SmartLedger.generateUUID(domain);
    console.log("Generated UUID for", domain + ":", uuid);

    const base64Test = "Test String";
    const encoded = SmartLedger.base64Encode(base64Test);
    const decoded = SmartLedger.base64Decode(encoded);
    console.log("Base64 Test:");
    console.log("- Original:", base64Test);
    console.log("- Encoded:", encoded);
    console.log("- Decoded:", decoded);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the demo
demonstrateSDK();
