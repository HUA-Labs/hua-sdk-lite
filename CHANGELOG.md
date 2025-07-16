# CHANGELOG — hua-sdk-lite

## [2.1.1] - 2025-07-16

- **Complete Test Suite**: 39 comprehensive tests covering all functionality
- **Jest Integration**: Full testing framework with coverage reporting
- **Enhanced Developer Experience**: Improved error handling and validation
- **Documentation Updates**: Korean and English README with accurate API key formats

### 🔧 Improvements

- **Comprehensive Testing**: Added 17+ test cases for error handling, session management, and message processing
- **Better Error Messages**: More descriptive and helpful error messages for developers
- **Robust Network Handling**: Improved timeout and connection error handling
- **Complete Test Coverage**: Full test suite with Jest for reliability

### 🐛 Bug Fixes

- Fixed API key format validation to match actual service requirements
- Improved retry mechanism for temporary server failures
- Enhanced error type checking and handling

### 📚 Documentation

- Updated API key format documentation
- Added comprehensive error handling guide
- Improved developer experience with better examples

---

## [2.1.0] - 2025-07-16

- **Perfect API Key Validation**: Support for both guest keys (64-char random) and user keys (hua_ prefix)
- **Smart Retry Logic**: Automatic retry for 502, 503, 504 server errors with exponential backoff
- **Comprehensive Error Handling**: 17 test cases covering all error scenarios
- **Real-world Service Compatibility**: Validated against actual HUA API key formats

### 🔧 Improvements

- **Enhanced Input Validation**: Strict validation for tone, mode, tier, and language parameters
- **Better Error Messages**: More descriptive and helpful error messages for developers
- **Robust Network Handling**: Improved timeout and connection error handling
- **Complete Test Coverage**: Full test suite with Jest for reliability

### 🐛 Bug Fixes

- Fixed API key format validation to match actual service requirements
- Improved retry mechanism for temporary server failures
- Enhanced error type checking and handling

### 📚 Documentation

- Updated API key format documentation
- Added comprehensive error handling guide
- Improved developer experience with better examples

---

## [2.0.1] - 2025-07-10

### 🔧 Bug Fixes

- Fixed TypeScript compilation issues
- Improved error handling for network failures

### 📚 Documentation

- Updated README with better examples
- Added Korean documentation

---

## [2.0.0] - 2025-07-09

### 🎉 Major Release

- Complete rewrite with TypeScript
- New class-based architecture
- Enhanced type safety
- Improved error handling
- Better developer experience

### ✨ New Features

- Support for multiple LLM providers
- Streaming chat support
- Batch processing capabilities
- Event system for monitoring
- Comprehensive preset system

### 🔧 Technical Improvements

- Modern ES6+ syntax
- Better memory management
- Improved performance
- Enhanced debugging capabilities
