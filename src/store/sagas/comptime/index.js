import { takeLatest, put, call, delay } from 'redux-saga/effects'
import { creators as globalCreators } from '../../ducks/_global'
import { types as comptimeTypes } from '../../ducks/comptime'
import { creators as comptimeCreators } from '../../ducks/comptime'
import rsfb from "../../services/firebaseConfig";
import { push } from 'connected-react-router'

function* getComptimeList(action) {
    let { idUsuario, anoMes } = action.payload
    yield put(globalCreators.loading())
    const querySnapshot = yield call(rsfb.firestore.getCollection, `usuarios/${idUsuario}/${anoMes}`)
    let comptimeList = [];
    querySnapshot.forEach(res => {
        let comptime = res.data();
        comptime.id = res.id;
        comptimeList = [...comptimeList, comptime];
    })
    
    yield put(comptimeCreators.setComptimeList(comptimeList))
    yield put(globalCreators.loading())    
}

function* putComptimeList(action) {
    yield put(globalCreators.loading())
    let { idUsuario, anoMes, comptimeList, emptyComptime } = action.payload
    yield call( rsfb.firestore.updateDocument, `usuarios/${idUsuario}/${anoMes}`, comptimeList )
    yield put(globalCreators.loading())
    yield put(globalCreators.message({ type: "positive", text: "Comptime List updated!" }))
    yield delay(1000)  
    yield put(globalCreators.message({ type: "", text: "" }));      
    yield getComptimeList()
}

export default [
    takeLatest(comptimeTypes.GET_COMPTIMELIST, getComptimeList),
    takeLatest(comptimeTypes.PUT_COMPTIME, putComptimeList),
]