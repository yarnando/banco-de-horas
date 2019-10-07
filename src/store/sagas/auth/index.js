import { takeLatest, put, call, select, delay } from "redux-saga/effects";
import { push } from 'connected-react-router'
import { types as globalTypes, creators as globalCreators } from "../../ducks/_global";
import { types as authTypes, creators as authCreators } from "../../ducks/auth";
import rsfb from "../../services/firebaseConfig";

const getUser = (state) => state.auth.user

function* signUp() {

  let user = yield select(getUser)

  try {

    yield put(globalCreators.loading(true))
    yield call(rsfb.auth.createUserWithEmailAndPassword, user.email, user.password);
    yield put(globalCreators.message({ type: "positive", text: "Your account has been created!" }));
    yield put(globalCreators.loading(false))
    yield put(authCreators.user({ email: user.email, password: '' }))
    yield delay(1500)  
    yield put(authCreators.userLogged(true));
    yield put(globalCreators.message({ type: "", text: "" }));      
    yield put(push('/comptime'))

  } catch (error) {

    yield put(globalCreators.message({ type: "danger", text: `${error}` }));
    yield put({ type: globalTypes.ERROR });
    yield put(globalCreators.loading(false))
    yield delay(3000)  
    yield put(globalCreators.message({ type: "", text: "" }));      

  }

}

function* signIn() {

    let user = yield select(getUser)

    try {
        yield put(globalCreators.loading(true))
        yield call(rsfb.auth.signInWithEmailAndPassword, user.email, user.password);
        yield put(globalCreators.message({ type: "positive", text: "Logged with success!" }));
        yield put(globalCreators.loading(false))  
        yield delay(1500)  
        yield put(authCreators.userLogged(true));
        yield put(authCreators.user({ email: user.email, password: '' }))          
        yield put(push('/comptime'))
      } catch (error) {
        yield put(globalCreators.message({ type: "danger", text: error }));
        yield put({ type: globalTypes.ERROR });
        yield put(globalCreators.loading(false))
        yield delay(3000)  
        yield put(globalCreators.message({ type: "", text: "" }));          
      }
}

function* logOut() {

    try {

        yield put(globalCreators.loading(true))
        yield call(rsfb.auth.signOut);
        yield put(globalCreators.loading(false))
        yield put(globalCreators.message({ type: "positive", text: "Logged out!" }));
        yield put(authCreators.user({ email: '', password: '' }))           
        yield put(globalCreators.message({ type: "", text: "" }));            
        yield put(authCreators.userLogged(false));
        yield put(push('/signin'))

      } catch (error) {

        yield put(globalCreators.message({ type: "danger", text: error }));
        yield put({ type: globalTypes.ERROR });
        yield delay(3000)  
        yield put(globalCreators.message({ type: "", text: "" }));   
        yield put(globalCreators.loading(false))        

      }
}

export default [
  takeLatest(authTypes.SIGNUP, signUp),
  takeLatest(authTypes.SIGNIN, signIn),
  takeLatest(authTypes.LOGOUT, logOut)
];
