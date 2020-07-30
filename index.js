const redux = require('redux')
const reduxLogger=require('redux-logger')
const createStore=redux.createStore
const combineReducers=redux.combineReducers
const logger =reduxLogger.createLogger()
const applyMiddleware=redux.applyMiddleware

const BUY_CAKE = "BUY_CAKE"

const BUY_ICECREAME = "BUY_ICECREAME"

//action

function buyCake(){
    return {
        type: BUY_CAKE,
            info: "First redux action"
    }
}

function buyIceCreame(){
    return{
        type:BUY_ICECREAME,
        info:"icecreame"
    }
}

//(previousState,action)=>newState

const initialState={
    numOfCakes:10,
    numOfIceCreams:20
}

const initialCakeState={
    numOfCakes:10
}
const initialIceCreamState={
    numOfIceCreams:10
}

//reducer


const iceCreameReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAME:return{
            ...state,
            numOfIceCreams:state.numOfIceCreams -1
        }
        default: return state
    }
}

const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCakes:state.numOfCakes -1
        }
        default: return state
    }
}

const rootReducer =combineReducers({
    cake: cakeReducer,
    iceCream: iceCreameReducer
})
const store =createStore(rootReducer,applyMiddleware(logger))

console.log("intial state", store.getState());
const unsubscribe =store.subscribe(()=> {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCreame())

unsubscribe()