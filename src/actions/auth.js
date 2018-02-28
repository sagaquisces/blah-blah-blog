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
            // const user = {
            //     displayName: ref.user.displayName,
            // }
            // console.log(user)
            // return database.ref(`users/${ref.user.uid}`).set(user).then(() => {
            //     console.log('name pushed', user.displayName)
            // })
        })
    }
}

// export const startAddExpense = (expenseData = {}) => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid
//         const {
//             description = '', 
//             note = '', 
//             amount = 0, 
//             createdAt = 0 
//         } = expenseData
//         const expense = {
//             description,
//             note,
//             amount,
//             createdAt
//         }
//         return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
//             dispatch(addExpense({
//                 id: ref.key,
//                 ...expense
//             }))
//         })
//     }
// }

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}