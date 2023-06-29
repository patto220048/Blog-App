import authRoute from './auth.js'
import postRoute from './post.js'
import userRoute from './user.js'
function route(app){

    app.use('/api/auth', authRoute )
    app.use('/api/post', postRoute )
    app.use('/api/users', userRoute )
}
export default route;