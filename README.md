# QR Code Validator App

The QR Code Validator App is a robust and efficient React Native application designed to authenticate and manage QR codes for various use cases. This app is perfect for event organizers, businesses, and service providers seeking a reliable solution to prevent QR code misuse and ensure a seamless customer experience.

### App overview 
![1](https://user-images.githubusercontent.com/102714819/229726948-73bc41db-fdd4-4bcf-9753-276f09aae5cb.png)&nbsp;&nbsp;![2](https://user-images.githubusercontent.com/102714819/229727068-c9725eb4-4ed3-4e63-a753-6f1aa881c8bb.png)&nbsp;&nbsp;![3](https://user-images.githubusercontent.com/102714819/229727479-f41f8da4-401a-4de2-9a5a-36ac910403c2.png)

### Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Use Cases](#use-cases)
4. [Acknowledgements](#acknowledgements)

## Features
* QR Code Scanning: The app efficiently scans QR codes and extracts relevant information to validate them against a the data stored in the local storage or can be customized to call an api request.
* Mark as Consumed: Once a QR code is successfully validated, it is marked as "consumed" in the system to prevent unauthorized reuse.
* Admin can reset: A code is granted to reset all the QR codes as unconsumed again.

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites
* [Node.js](https://nodejs.org/) (version 14.x or later)
* [npm](https://www.npmjs.com/) (version 6.x or later)
* [React Native](https://reactnative.dev/) (version 0.71.4 or later)
* [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for running the app on an emulator or physical device

### Installation
 - Clone this repo\
  ```git clone https://github.com/mishenThakshana/qr-code-validator-react-native.git```
 - Navigate to the project directory\
  ```cd qr-code-validator-react-native```
 - Install dependencies\
  ```npm i or yarn install```
 - Replace the array of QR code strings and admin passcode in ```src/config/config.ts```

## Use Cases
* Event Management: Validate entry tickets, manage guest lists, and prevent ticket fraud at conferences, concerts, or other events.
* Retail and E-commerce: Authenticate discount codes, gift cards, or promotional offers to ensure single-use and prevent misuse.
* Access Control: Monitor and regulate access to restricted areas or facilities by validating employee, visitor, or contractor passes.
* Loyalty Programs: Verify and track redemption of loyalty rewards, points, or special offers for members.
* Workshops and Training: Confirm registration and attendance for workshops, seminars, or training sessions.

## Acknowledgements
* [React Native](https://reactnative.dev/)
    
