import { firebase, googleAuthProvider } from '../firebase/firebase'
import database from '../firebase/firebase.js'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider).then((ref) => {
            console.log('user id', ref.user.uid)
            const uid = ref.user.uid
            const displayName = ref.user.displayName
            const user = {
                displayName
            }
            return database.ref(`users/${uid}`).once('value', (snapshot) => {
                
                let exists = (snapshot.val() !== null)
                if (!exists) {
                    return database.ref(`users/${uid}`).set(user).then(() => {
                        console.log('name pushed', user.displayName)
                    })
                } else {
                    console.log('user exists in db')
                }
            })
        })
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}