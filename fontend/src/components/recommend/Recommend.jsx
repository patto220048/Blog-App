import style from './Recommend.module.scss';

function Recommend() {
    return (
        <div className={style.recommend}>
            <span>Recommend for you</span>

            <div className={style.items} >
                <img src="https://images.unsplash.com/photo-1682685796186-1bb4a5655653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                <h2>Grid system for better Design User Interface</h2>
            </div>

            <div className={style.items} >
                <img src="https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1104&q=80" alt="" />
                <h2>Grid system for better Design User Interface</h2>
            </div>

            <div className={style.items} >
                <img src="https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1104&q=80" alt="" />
                <h2>Grid system for better Design User Interface</h2>
            </div>

            <div className={style.items} >
                <img src="https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1104&q=80" alt="" />
                <h2>Grid system for better Design User Interface</h2>
            </div>
            
            <div className={style.items} >
                <img src="https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1104&q=80" alt="" />
                <h2>Grid system for better Design User Interface</h2>
            </div>
        </div>
    )
}

export default Recommend;
