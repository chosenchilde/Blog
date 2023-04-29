/**
 * Configuração do Firebase
 * MIT License 
 **/

/** 
*  Configuração do Firebase
* IMPORTANTE! 
* Troque os valores de 'firebaseConfig' pelos dados do seu Firebase!
**/

const firebaseConfig = {
    apiKey: "AIzaSyC-F03gW8rnPkC_aaLTxyX2HA7UINHlgHk",
    authDomain: "code-blog-8ad13.firebaseapp.com",
    projectId: "code-blog-8ad13",
    storageBucket: "code-blog-8ad13.appspot.com",
    messagingSenderId: "807708357956",
    appId: "1:807708357956:web:185221e92987da0e281311",
    measurementId: "G-B2E7TS4DQB"
  };
  
// Incializa o Firebase
firebase.initializeApp(firebaseConfig);

// Incializa o Firebase Authentication
const auth = firebase.auth();

// Define o provedor de autenticação
var provider = new firebase.auth.GoogleAuthProvider();