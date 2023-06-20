import style from './Search.module.scss';
function Search() {
    return (
        <div className={style.search}>
            <div className={style.searchItem}>
                <span>
                    
                </span>
                <input type="text" placeholder="Search" />
            </div>
        </div>
    );
}

export default Search;
