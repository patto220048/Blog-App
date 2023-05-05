import authRoute from './auth.js'

function route(app){

    app.use('/api', authRoute )
  
}
export default route;