/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1w5qULfONOqa72as3hiM53L8ItWk4s7Y",
  authDomain: "bad-bank-776ab.firebaseapp.com",
  projectId: "bad-bank-776ab",
  storageBucket: "bad-bank-776ab.appspot.com",
  messagingSenderId: "270649077968",
  appId: "1:270649077968:web:0bd41e610ef76b802b2ed5",
  measurementId: "G-NRN6HV1QFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)