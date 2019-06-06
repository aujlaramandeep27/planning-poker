import { StoriesSuccess, StoriesError, getStoriesAsync, createStoryAsync} from './StoriesActions';
import { StoriesAPI } from "../API/Stories.api";
import { call, put, select } from '@redux-saga/core/effects';

describe('Stories Actions', () => {
    let fixture;
    const currentMeetingId = '123';

    describe('GetStories for currentMeeting', () => {

        beforeEach(() => { 
            fixture = getStoriesAsync();
        });

        it('should dispatch action', () => {
            expect(fixture.next().value).toEqual(select());
            expect(fixture.next({currentMeeting: {_id: currentMeetingId}}).value).toEqual(call(StoriesAPI.all, currentMeetingId));
            expect(fixture.next([]).value).toEqual(put(StoriesSuccess([])));
            expect(fixture.next().done).toBeTruthy();
        });

        it('should handle errors', () => {
            fixture.next();
            let e = {message: 'Failed!'};
            expect(fixture.throw(e).value).toEqual(put(StoriesError(e)));
            expect(fixture.next().done).toBeTruthy();
        });
    });

    describe('CreateStory for currentMeeting', () => {
        const storyBody = {
            name: 'Test Story'
        };

        beforeEach(() => { 
            const expectedPayload = storyBody;
            fixture = createStoryAsync({payload: expectedPayload});
        });

        it('should dispatch action', () => {
            expect(fixture.next().value).toEqual(select());
            expect(fixture.next({currentMeeting: {_id: currentMeetingId}}).value).toEqual(call(StoriesAPI.post, currentMeetingId, storyBody));
            expect(fixture.next().done).toBeTruthy();
        });

        it('should handle errors', () => {
            fixture.next();
            let e = {message: 'Failed!'};
            expect(fixture.throw(e).value).toEqual(put(StoriesError(e)));
            expect(fixture.next().done).toBeTruthy();
        });
    });

});