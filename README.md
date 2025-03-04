# SmartLedger SDK Demo

This project demonstrates the capabilities of the SmartLedger SDK through an interactive web interface. It showcases various cryptographic operations, wallet management, and utility functions provided by the SDK.

## Features

- **BIP39 Mnemonic Operations**

  - Generate mnemonic phrases
  - Validate mnemonics
  - Generate seed from mnemonic

- **HD Wallet Derivation**

  - Derive addresses from standard paths
  - Custom path derivation support

- **Cryptographic Operations**

  - Encryption/Decryption
  - Multiple hashing algorithms (SHA256, SHA512, MD5)

- **Shamir's Secret Sharing**

  - Split secrets into multiple shares
  - Reconstruct secrets using threshold shares

- **BSV Operations**

  - Key pair generation
  - Message signing
  - Signature verification

- **Storage Operations**

  - Key-value storage demonstration
  - Persistent data management

- **Utility Functions**
  - UUID generation
  - Base64 encoding/decoding

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Open `index.html` in a web browser to access the interactive demo.

## Dependencies

- smartledger-sdk: ^1.1.11

## Usage

The demo provides an intuitive web interface with separate sections for each feature category. Each section contains relevant input fields and buttons to test different SDK functionalities. Results are displayed in formatted output areas below each operation.

Open your browser's console for additional debug output during operations.
