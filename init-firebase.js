var firebaseConfig = {
    apiKey: "AIzaSyA2zF2IufwdTP59fIV709tzKd0Cx4IGp-E",
    authDomain: "thisgraphis.firebaseapp.com",
    databaseURL: "https://thisgraphis-default-rtdb.firebaseio.com",
    projectId: "thisgraphis",
    storageBucket: "thisgraphis.appspot.com",
    messagingSenderId: "442066372663",
    appId: "1:442066372663:web:aeb3ed81833b0494e897b2",
    measurementId: "G-QKYE2MK2F5"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  var database = getDatabase(app);

  