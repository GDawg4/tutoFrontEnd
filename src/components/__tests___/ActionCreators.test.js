import * as actions from '../../actions/courses'
import * as types from '../../types/courses'
import courses from '../../reducers/courses'

describe('actions', () => {
    it('should create an action to start fetching courses', () => {
        const expectedAction = {
            type:types.COURSE_FETCH_STARTED
        }
        expect(actions.startFetchingCourse()).toEqual(expectedAction)
    })

    it('should create an action to select a course', () => {
        const expectedAction = {
            type:types.COURSE_SELECTED,
            payload:{
                'id':5
            }
        }
        expect(actions.selectCourse(5)).toEqual(expectedAction)
    })
});

describe('reducers', () => {
    it('should return an initital state', () => {
        expect(courses(undefined, {})).toEqual({
            'byId':{},
            'error':null,
            isFetching:false,
            'order':[],
            'selected':null
        })
    });

    it('should handle select a course', () => {
        expect(
            courses(undefined, {
                type:types.COURSE_SELECTED,
                payload:{
                    'id':5
                }
            })
        ).toEqual({
            'byId':{},
            'error':null,
            isFetching:false,
            'order':[],
            'selected':5
        })
    }
    )

    expect(
        courses(
            {
                'byId':{},
                'error':null,
                'isFetching':false,
                'order':[],
                'selected':5
            },
            {
                type:types.COURSE_DESELECTED
            }
        ).toEqual({
            'byId':{},
            'error':null,
            'isFetching':false,
            'order':[],
            'selected':null
        })
    )
}
)