import { CurrentStoryAPI } from '../API/CurrentStory.api'
import { take, call, put, race, delay } from 'redux-saga/effects';

export const CURRENT_STORY_SUCCESS = 'CURRENT_STORY_SUCCESS';
export const CURRENT_STORY_ERROR = 'CURRENT_STORY_ERROR';
export const CURRENT_STORY_GET_REQUESTED = 'CURRENT_STORY_GET_REQUESTED';
export const CURRENT_STORY_STOP_POLLING_REQUESTED = 'CURRENT_STORY_STOP_POLLING_REQUESTED';

export const STORY_ESTIMATES_SUCCESS = 'STORY_ESTIMATES_SUCCESS';
export const STORY_ESTIMATES_ERROR = 'STORY_ESTIMATES_ERROR';
export const STORY_ESTIMATES_GET_REQUESTED = 'STORY_ESTIMATES_GET_REQUESTED';
export const STORY_ESTIMATES_STOP_POLLING_REQUESTED = 'STORY_ESTIMATES_STOP_POLLING_REQUESTED';

export const POLLING_DELAY = 4000;

export function* watchCurrentStoryAsync() {
    while (true) {
        let payload = yield take(CURRENT_STORY_GET_REQUESTED);
        yield race([
            call(getCurrentStoryAsync, payload),
            take(CURRENT_STORY_STOP_POLLING_REQUESTED)
        ]);
    }
}

export function GetCurrentStory(meetingId) {
    return {
        type: CURRENT_STORY_GET_REQUESTED,
        payload: meetingId
    }
}

export function StopCurrentStoryPolling() {
    return {
        type: CURRENT_STORY_STOP_POLLING_REQUESTED
    }
}

export function* getCurrentStoryAsync({payload: meetingId}){
    while(true) {
        try {
            const story = yield call(CurrentStoryAPI.byMeetingId, meetingId);
            yield put(CurrentStorySuccess(story));
        }
        catch (e) {
            yield put(CurrentStoryError(e));
        }
        yield delay(POLLING_DELAY);
    }
}

export function CurrentStorySuccess(currentStory) {
    return {
        type: CURRENT_STORY_SUCCESS,
        payload: {currentStory}
    };
}

export function CurrentStoryError(error) {
    return {
        type: CURRENT_STORY_ERROR,
        payload: {error}
    };
}

export function* watchStoryEstimatesAsync() {
    while (true) {
        let payload = yield take(STORY_ESTIMATES_GET_REQUESTED);
        yield race([
            call(getStoryEstimatesAsync, payload),
            take(STORY_ESTIMATES_STOP_POLLING_REQUESTED)
        ]);
    }
}

export function GetStoryEstimates(storyId) {
    return {
        type: STORY_ESTIMATES_GET_REQUESTED,
        payload: storyId
    }
}

export function StopStoryEstimatesPolling() {
    return {
        type: STORY_ESTIMATES_STOP_POLLING_REQUESTED
    }
}

export function* getStoryEstimatesAsync({payload: storyId}){
    while(true) {
        try {
            const story = yield call(CurrentStoryAPI.estimateList, storyId);
            yield put(StoryEstimatesSuccess(story));
        }
        catch (e) {
            yield put(StoryEstimatesError(e));
        }
        yield delay(POLLING_DELAY);
    }
}

export function StoryEstimatesSuccess(storyEstimates) {
    return {
        type: STORY_ESTIMATES_SUCCESS,
        payload: {estimateList: storyEstimates}
    };
}

export function StoryEstimatesError(error) {
    return {
        type: STORY_ESTIMATES_ERROR,
        payload: {error}
    };
}
