const { getTop } = require('../utils/calendar')

describe('calendar', ()=> {
    test('getTop', ()=> {
        const result = getTop(2, 8, 10, {pageX: 10, pageY: 90})
        expect(result).toEqual(1080) 
        const result1 = getTop(2, 9, 10, {pageX: 10, pageY: 0})
        expect(result1).toEqual(0)
    })

})