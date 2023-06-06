import authRoute from './auth.js'
import postRoute from './post.js'

function route(app){

    app.use('/api/auth', authRoute )
    app.use('/api/post', postRoute )
  
}
export default route;