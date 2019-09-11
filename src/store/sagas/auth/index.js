import { takeLatest, put, call, select, delay } from "redux-saga/effects";
import { push } from 'connected-react-router'
import { types as globalTypes, creators as globalCreators } from "../../ducks/_global";
import { types as authTypes, creators as authCreators } from "../../ducks/auth";
import rsfb from "../../services/firebaseConfig";

const getUser = (state) => state.auth.user

function* signUp() {

  let user = yield select(getUser)

  try {

    yield put({ type: globalTypes.LOADING });
    yield call(rsfb.auth.createUserWithEmailAndPassword, user.email, user.password);
    yield put(globalCreators.message({ type: "positive", text: "Your account has been created!" }));
    yield put({ type: globalTypes.LOADING });
    yield put(authCreators.user({ email: '', password: '' }))
    yield delay(1000)  
    yield put(authCreators.userLogged(true));
    yield put(globalCreators.message({ type: "", text: "" }));      
    yield put(push(''))

  } catch (error) {

    yield put(globalCreators.message({ type: "danger", text: `${error}` }));
    yield put({ type: globalTypes.ERROR });
    yield delay(1000)  
    yield put(globalCreators.message({ type: "", text: "" }));      

  }

}

function* signIn() {

    let user = yield select(getUser)

    try {
        yield put({ type: globalTypes.LOADING });
        yield call(rsfb.auth.signInWithEmailAndPassword, user.email, user.password);
        yield put(globalCreators.message({ type: "positive", text: "Logged with success!" }));
        yield put({ type: globalTypes.LOADING });
        yield put(authCreators.user({ email: '', password: '' }))      
        yield delay(1000)  
        yield put(authCreators.userLogged(true));
        yield put(globalCreators.message({ type: "", text: "" }));            
        yield put(push(''))
      } catch (error) {
        yield put(globalCreators.message({ type: "danger", text: "Error logging in: " + error }));
        yield put({ type: globalTypes.ERROR });
        yield put({ type: globalTypes.LOADING });
        yield delay(1000)  
        yield put(globalCreators.message({ type: "", text: "" }));          
      }
}

function* logOut() {

    try {

        yield put({ type: globalTypes.LOADING });
        yield call(rsfb.auth.signOut);
        yield put({ type: globalTypes.LOADING });
        yield put(globalCreators.message({ type: "positive", text: "Logged out!" }));
        yield delay(1000)  
        yield put(globalCreators.message({ type: "", text: "" }));            
        yield put(authCreators.userLogged(false));

      } catch (error) {

        yield put(globalCreators.message({ type: "danger", text: "Error logging out: " + error }));
        yield put({ type: globalTypes.ERROR });
        yield delay(1000)  
        yield put(globalCreators.message({ type: "", text: "" }));           

      }
}

export default [
  takeLatest(authTypes.SIGNUP, signUp),
  takeLatest(authTypes.SIGNIN, signIn),
  takeLatest(authTypes.LOGOUT, logOut)
];
