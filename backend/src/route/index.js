import testRoute from './test.js'

function route(app){

    app.use('/api', testRoute )
  
}
export default route;