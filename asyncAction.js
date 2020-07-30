const redux = require('redux')
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios =require('axios')
console.log("1")
const initialState = {
    loading: false,
    users: [],
    error: '',
  
}
console.log("2")
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
console.log("3")

const fetchUsersRequest = () => {
    console.log("4")
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    console.log("users")
    console.log(users)
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    console.log("error")
    console.log(error)
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    console.log("5")
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            console.log("6")
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_FAILURE:
            console.log("7")
            return {
                loading: false,
                error: action.payload,
                users:[]
            }
        case FETCH_USERS_SUCCESS:
            console.log("8")
            return {
                loading: false,
                users: action.payload,
                error:''
            }
            console.log("9")
    }
    console.log("10")
}
console.log("11")
const fetchUsers =()=>{
    console.log("12")
    return function(dispatch){
        console.log("13")
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            //response.data is the array of users
            const users =response.data.map(user =>user.id)
            dispatch(fetchUsersSuccess(users))
            console.log("14")
        })
        .catch(error=>{
            console.log("15")
            //error.messagae
            dispatch(fetchUsersFailure(error.message))
        })
        console.log("16")
    }
    console.log("17")
}


//create a redux store.
console.log("18")
const store = createStore(reducer,applyMiddleware(thunkMiddleware),console.log("18.1"))
console.log("19")
store.subscribe(()=>{ console.log("data"),console.log(store.getState()),console.log("19.1")})
console.log("20")
store.dispatch(fetchUsers(),console.log("20.1"))
console.log("21")

