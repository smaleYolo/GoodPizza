import React, {useContext, useRef} from "react";
import qs from 'qs';
import {SearchContext} from "../context";
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzas} from "../redux/slices/pizzasSlice";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";



const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
const sorts = [
    {id: 0, sortProperty: 'rating', title: 'популярности DESC'},
    {id: 1, sortProperty: 'price', title: 'цене DESC'},
    {id: 2, sortProperty: 'title', title: 'алфавиту DESC'},
    {id: 3, sortProperty: '-rating', title: 'популярности ASC'},
    {id: 4, sortProperty: '-price', title: 'цене ASC'},
    {id: 5, sortProperty: 'title', title: 'алфавиту ASC'},
]

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {searchValue} = useContext(SearchContext)

    const {currentPage, categoryId, sortType} = useSelector(selectFilter)
    const {pizzas, status} = useSelector(selectPizzas)


    const getPizzas = async () => {

        const orderBy = sorts[sortType].sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = (sortType > 0) ? `&sortBy=${(sorts[sortType].sortProperty).replace('-', '')}&order=${orderBy}` : '';
        const category = (categoryId > 0) ? `&category=${categoryId}` : '';

        dispatch(fetchPizzas({orderBy, sortBy, category, currentPage, searchValue}))
    }

    //при каждом изменении переменных фильтрации и сортировки, переменные записываются в url, на первом рендере - если
    //url пустой - не вшиваем
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sorts[sortType].id,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [currentPage, categoryId, sortType, sorts, navigate])

    //UseEffect отрабатывает при первой загрузке и проверяет url, если в нем что-то есть, парсим параметры в
    //переменную params и обновляем стейты в редаксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(setFilters(params))
            isSearch.current = true;
        }
    }, [dispatch])

    //если был первый рендер, то запращиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false;
    }, [currentPage, categoryId, sortType, sorts, searchValue])

    //Для фильтрации по searchValue использую фронт, для этого меняю массив всех пицц на совпадающие с параметром
    //поисковой строки
    const filteredPizzas = pizzas.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categories={categories} categoryId={categoryId}/>
                <Sort sorts={sorts} sortType={sortType}/>
            </div>

            <h2 className="content__title">{categories[categoryId]} пиццы</h2>

            {
                status === 'error' ? (
                    <InfoBlock title="Ошибка на сервере :(" description="Летим чинить на тележке!"/>
                ) : (
                    <div className="content__items">
                        {
                            status === 'loading'
                                ? ([...new Array(6)].map((_, index) => (<Skeleton key={index}/>)))
                                : (
                                    filteredPizzas.length ? (
                                        filteredPizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>))
                                    ) : (
                                        <NotFoundBlock/>
                                    )
                                )
                        }
                    </div>
                )
            }

            {!searchValue && !categoryId && status === 'success' &&
                <Pagination currentPage={currentPage} setCurrentPage={(page) => dispatch(setCurrentPage(page))}/>}
        </div>
    )
}

export default Home;
