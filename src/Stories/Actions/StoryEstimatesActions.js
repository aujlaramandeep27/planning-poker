import {StoriesAPI} from '../API/Stories.api'
import {call, delay, put, race, take} from 'redux-saga/effects';

export const STORY_ESTIMATES_SUCCESS = 'STORY_ESTIMATES_SUCCESS';
export const STORY_ESTIMATES_ERROR = 'STORY_ESTIMATES_ERROR';
export const STORY_ESTIMATES_START_POLLING_REQUESTED = 'STORY_ESTIMATES_START_POLLING_REQUESTED';
export const STORY_ESTIMATES_STOP_POLLING_REQUESTED = 'STORY_ESTIMATES_STOP_POLLING_REQUESTED';

export const POLLING_DELAY = 4000;

export function* watchStoryEstimatesAsync() {
    while (true) {
        let payload = yield take(STORY_ESTIMATES_START_POLLING_REQUESTED);
        yield race({
            task: call(pollStoryEstimatesAsync, payload),
            cancel: take(STORY_ESTIMATES_STOP_POLLING_REQUESTED)
        });
    }
}

export function StartPollingStoryEstimates(storyId) {
    return {
        type: STORY_ESTIMATES_START_POLLING_REQUESTED,
        payload: storyId
    }
}

export function StopPollingStoryEstimates() {
    return {
        type: STORY_ESTIMATES_STOP_POLLING_REQUESTED
    }
}

export function* pollStoryEstimatesAsync({payload: storyId}) {
    while (true) {
        try {
            const story = yield call(StoriesAPI.getStoryEstimates, storyId);
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
        payload: {storyEstimates: storyEstimates}
    };
}

export function StoryEstimatesError(error) {
    return {
        type: STORY_ESTIMATES_ERROR,
        payload: {error}
    };
}