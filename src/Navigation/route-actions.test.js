import {
    refreshMeetings,
    refreshStories,
    routerActions,
    viewCreateMeeting,
    viewCreateStory,
    viewMeeting,
    viewMeetings,
    viewMeetingSaga,
    viewMeetingsSaga,
    viewStories,
    viewStoriesSaga,
    viewStory,
    viewStorySaga,
    watchRouterAsync,
} from './route-actions';
import {delay, put, select, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE, push, replace} from 'connected-react-router';
import {GetCurrentMeeting} from '../Meetings/Actions/CurrentMeetingActions';
import {CurrentMeetingId, CurrentUserId} from "../Common/selectors";

describe('Route Actions', () => {

    it('should view create meeting', () => {
        expect(viewCreateMeeting()).toEqual(push('/meeting/create/'));
    });

    it('should view create story', () => {
        expect(viewCreateStory()).toEqual(push('/story/create/'));
    });

    it('should view meeting estimate', () => {
        expect(viewMeeting('FOO')).toEqual(push('/meeting/FOO/estimate/'));
    });

    it('should view story summary', () => {
        expect(viewStory('BAR', 'FOO')).toEqual(push('/meeting/BAR/story/FOO/summary/'));
    });

    it('should view stories', () => {
        expect(viewStories('mockMeetingId')).toEqual(push('/meeting/mockMeetingId/stories/'));
    });

    it('should refresh stories', () => {
        expect(refreshStories('mockMeetingId')).toEqual(replace('/meeting/mockMeetingId/stories/'));
    });


    it('should view meetings', () => {
        expect(viewMeetings()).toEqual(push('/meetings/'));
    });

    it('should refresh meetings', () => {
        expect(refreshMeetings()).toEqual(replace('/meetings/'));
    });

    describe('RouterActions', () => {

        it('should dispatch replace to create page with nextPathName equal to current path name when landing not on create page', () => {
            const mockMeetingId = '13847gf81374gr183o4';
            const mockRouterPayload = {
                location: {
                    pathname: `/meeting/${mockMeetingId}/estimate/`
                }
            };
            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));
            expect(saga.next(null).value).toEqual(delay(1));
            expect(saga.next().value).toEqual(put(replace({
                pathname: '/',
                state: {'nextPathname': mockRouterPayload.location.pathname}
            })));
        });

        it('should dispatch GetCurrentMeeting if location starts with /meeting/ and does not end in create/', () => {
            const mockMeetingId = '13847gf81374gr183o4';
            const mockRouterPayload = {
                location: {
                    pathname: '/meeting/' + mockMeetingId
                }
            };
            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));
            expect(saga.next().value).toEqual(put(GetCurrentMeeting(mockMeetingId)));
        });

        it('should not dispatch GetCurrentMeeting if location starts with /meeting/ but ends in create/', () => {
            const mockMeetingId = '13847gf81374gr183o4';
            const mockRouterPayload = {
                location: {
                    pathname: '/meeting/create/'
                }
            };
            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));
            expect(saga.next().value).not.toEqual(put(GetCurrentMeeting(mockMeetingId)));
        });

        it('should not dispatch GetCurrentMeeting if location does not start with /meeting/', () => {
            const mockMeetingId = '13847gf81374gr183o4';
            const mockRouterPayload = {
                location: {
                    pathname: '/notmeeting/' + mockMeetingId
                }
            };
            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));
            expect(saga.next().value).not.toEqual(put(GetCurrentMeeting(mockMeetingId)));
        });

        it('should dispatch replace to meetings when landing on create story page with no currentMeetingId', () => {
            const mockRouterPayload = {
                location: {
                    pathname: '/story/create/'
                }
            };

            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));

            expect(saga.next().value).toEqual(select(CurrentMeetingId));
            expect(saga.next(null).value).toEqual(delay(1));
            expect(saga.next().value).toEqual(put(refreshMeetings()));
            expect(saga.next().done).toBeTruthy();

        });

        it('should not dispatch replace to meetings when landing on create story page with currentMeetingId', () => {
            const currentMeetingId = 'mockCurrentMeetingId';
            const mockRouterPayload = {
                location: {
                    pathname: '/story/create/'
                }
            };

            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));

            expect(saga.next().value).toEqual(select(CurrentMeetingId));
            expect(saga.next(currentMeetingId).done).toBeTruthy();
        });

        it('should not get currentMeetingId when path does not start with /story/create/', () => {
            const currentMeetingId = 'mockCurrentMeetingId';
            const mockRouterPayload = {
                location: {
                    pathname: '/notStoryCreate/'
                }
            };

            const saga = routerActions({payload: mockRouterPayload});
            expect(saga.next().value).toEqual(select(CurrentUserId));
            expect(saga.next().done).toBeTruthy();
        });

    });

    it('should watch view actions', () => {
        const watcher = watchRouterAsync();
        expect(watcher.next().value).toEqual(takeLatest(LOCATION_CHANGE, routerActions));
        expect(watcher.next().done).toBeTruthy();
    });
});
