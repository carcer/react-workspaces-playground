import { put, takeEvery, all } from 'redux-saga/effects';
import { incrementByAmount, incrementAsync } from './counterSlice';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* performIncrementAsync(action: any) {
	yield delay(1000);
	yield put(incrementByAmount(action.payload));
}

export function* watchIncrementAsync() {
	yield takeEvery(incrementAsync, performIncrementAsync);
}

export default function* rootSaga() {
	yield all([watchIncrementAsync()]);
}
