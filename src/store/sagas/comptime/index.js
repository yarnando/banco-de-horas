import { takeLatest, put, call, delay } from 'redux-saga/effects'
import { creators as globalCreators } from '../../ducks/_global'
import { types as comptimeTypes } from '../../ducks/comptime'
import { creators as comptimeCreators } from '../../ducks/comptime'
import rsfb from "../../services/firebaseConfig";
import { push } from 'connected-react-router'

function* getComptimeList(action) {
    let { idUsuario, ano, mes } = action.payload
    yield put(globalCreators.loading())
    const querySnapshot = yield call(rsfb.firestore.getCollection, `usuarios/${idUsuario}/${ano}${mes}`)
    let comptimeList = [];
    let comptimeId = '';
    querySnapshot.forEach(res => {
        let comptime = res.data().comptimeList;
        comptimeId = res.id
        comptimeList = [...comptimeList, ...comptime]
    })
    console.log(comptimeId)
    console.log(comptimeList)
    if(!!comptimeList.length) {
        yield put(comptimeCreators.setComptimeListId(comptimeId))     
        yield put(comptimeCreators.setComptimeList(comptimeList))     
    } else {
        console.log('no comptimelist, creating a new one')
        let newComptimeList = yield createNewComptimeList(idUsuario, ano, mes)
        yield put(comptimeCreators.setComptimeList(newComptimeList))   
    } 
    yield put(globalCreators.loading())  
}

function* putComptimeList(action) {
    yield put(globalCreators.loading())
    let { idUsuario, ano, mes, id, comptimeList } = action.payload
    console.log(id)
    yield call( rsfb.firestore.updateDocument, `usuarios/${idUsuario}/${ano}${mes}/${id}`, {comptimeList} )
    yield put(globalCreators.loading())
    yield put(globalCreators.message({ type: "positive", text: "Comptime List updated!" }))
    yield delay(1000)  
    yield put(globalCreators.message({ type: "", text: "" }));      
    yield getComptimeList(action)
    yield put(comptimeCreators.setShowingForm(false)) 
}

function* createNewComptimeList(idUsuario, ano, mes) {
    let numberOfDays = new Date(ano, mes, 0).getDate()        
    let comptimeList = [];
    for (let i = 1; i < numberOfDays; i++) {
        let item = {
            day: `${i<10?'0':''}${i}/${mes}/${ano}`,
            startingTime: '00:00',
            lunchStart: '00:00',
            lunchEnd: '00:00',
            stoppingTime: '00:00',
        }            
        comptimeList.push(item)        
    } 
    yield call( rsfb.firestore.addDocument, `usuarios/${idUsuario}/${ano}${mes}`, {comptimeList} )
    return comptimeList
}

export default [
    takeLatest(comptimeTypes.GET_COMPTIMELIST, getComptimeList),
    takeLatest(comptimeTypes.PUT_COMPTIMELIST, putComptimeList),
]