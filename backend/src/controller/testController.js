import db from '../database/db.js'


class testController {
    test(req, res) {
        res.json('hello')
    }
}

export default new testController