import * as firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyD9YKRvuh2nnnTL8mwbKyJkd0I6lyqaPMA',
	authDomain: 'rebustest-141b3.firebaseapp.com',
	databaseURL: 'https://rebustest-141b3.firebaseio.com',
	projectId: 'rebustest-141b3',
	storageBucket: 'rebustest-141b3.appspot.com',
	messagingSenderId: '410642016028'
}

firebase.initializeApp(firebaseConfig)

export default firebase