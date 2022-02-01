// #region 'Importing'
import "./Products.css"

import ProductsHeader from "../../Components/Products/Header/ProductsHeader/ProductsHeader"
import ProductsMain from "../../Components/Products/Main/ProductsMain/ProductsMain"
import ProductsFooter from '../../Components/Products/Footer/ProductsFooter'

import { useState } from "react"
import { useEffect } from "react"
// #endregion


function Products() {

    let globalItemsToDisplay = []

    // #region 'State Object'
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const [initialItems, setInitialItems] = useState([])
    
    const [bagItems, setBagItems] = useState([])
    const [bagItemQuantity, setBagItemQuantity] = useState([])
    
    const [userCatcher, setUserCatcher] = useState([])
    const [userName, setUserName] = useState('')
    
    const [selectType, setSelectType] = useState('Default')
    const [category, setCategory] = useState('Default')
    
    const [searchTerm, setSearchTerm] = useState('')
    
    const [searchOnCategory, setSearchOnCategory] = useState('Default')
    const [selectedModal, setSelectedModal] = useState('')
    // #endregion


    // #region 'Server Functions'

    function getItemsFromServer() {

        fetch('http://localhost:8000/items')
            .then(resp => resp.json())
            .then(itemsFromServer1 => {
            setItems(itemsFromServer1)
        })

    }

    function getInitialItemsFromServer() {

        fetch('http://localhost:8000/items')
            .then(resp => resp.json())
            .then(itemsFromServer2 => {
            setInitialItems(itemsFromServer2)
        })

    }

    function getUsersFromServer() {

        fetch('http://localhost:8000/users')
            .then(resp => resp.json())
            .then(usersFromServer => {
            setUsers(usersFromServer)
        })

    }

    useEffect(getInitialItemsFromServer, [])
    useEffect(getItemsFromServer, [])
    useEffect(getUsersFromServer, [])
    // #endregion

    
    // #region 'Helper Functions'

    // #region 'Filter Functions'

    // #region 'filter search'
    function searchByName(itemToDisplaySorted) {

        return itemToDisplaySorted.filter(function (item) {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

    }
    // #endregion

    // #region 'filter sorting'
    function getSortedByPriceAsc() {
        return globalItemsToDisplay.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1)
    }

    function getSortedByPriceDesc() {
        return getSortedByPriceAsc().reverse()
    }

    function getSortedByNameAsc() {
        return globalItemsToDisplay.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.price > b.price) ? 1 : -1) : -1)
    }

    function getSortedByNameDesc() {
        return getSortedByNameAsc().reverse()
    }

    function getSortedByDateAsc() {
        return globalItemsToDisplay.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : (Date.parse(a.date) === Date.parse(b.date)) ? ((a.name > b.name) ? 1 : -1) : -1)
    }

    function getSortedByDateDesc() {
        return getSortedByDateAsc().reverse()
    }
    // #endregion
    
    // #region 'filter categories'
    function getProteinProducts() {
        return items.filter(function (item) {
            return item.type === 'proteins'
        })
    }

    function getPreWorkoutProducts() {
        return items.filter(function (item) {
            return item.type === 'pre-workouts'
        })
    }

    function getWeightBurnerProducts() {
        return items.filter(function (item) {
            return item.type === 'weight-burner'
        })
    }

    function getAminoacidsProducts() {
        return items.filter(function (item) {
            return item.type === 'aminoacids'
        })
    }

    function getMultivitaminsProducts() {
        return items.filter(function (item) {
            return item.type === 'multivitamins'
        })
    }

    function getWeightGainersProducts() {
        return items.filter(function (item) {
            return item.type === 'weight-gainers'
        })
    }

    function getCreatineProducts() {
        return items.filter(function (item) {
            return item.type === 'creatine'
        })
    }

    function getTestosteroneBoostersProducts() {
        return items.filter(function (item) {
            return item.type === 'testosterone-boosters'
        })
    }

    function getOffersFromState() {
        return items.filter((item) => item.hasOwnProperty('discountPrice'))
    }

    // #endregion

    // #region 'Filtering Display Function'
    function showItems() {

        let itemsToDisplay = []
        let itemToDisplaySorted = []
        let initialFilteredItems = JSON.parse(JSON.stringify(initialItems))
    
        // #region 'Conditionals for ---search select--- based on cagetories with searched item'
        if (searchTerm === '' && category === 'Default' && selectType === 'Default') {
            return initialFilteredItems
        }
    
        else if (searchTerm === '' && category === 'Offers' && selectType === 'Default') {
            itemsToDisplay = items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getOffersFromState()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'Default') {
            itemToDisplaySorted = items
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        // #region 'search ---default category on search--- with sorting'
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'price-asc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'price-desc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'name-asc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'name-desc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'date-asc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Default' && selectType === 'date-desc') {
            itemsToDisplay = items
            itemToDisplaySorted = searchByName(itemsToDisplay)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---proteins--- with sorting'
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'Default') {
            itemToDisplaySorted = getProteinProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'price-asc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'price-desc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'name-asc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'name-desc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'date-asc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Proteins' &&  selectType === 'date-desc') {
            itemsToDisplay = getProteinProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---creatines--- with sorting'
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'Default') {
            itemToDisplaySorted = getCreatineProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'price-asc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'price-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'name-asc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'name-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'date-asc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'Creatines' &&  selectType === 'date-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---multivitamins--- with sorting'
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'Default') {
            itemToDisplaySorted = getMultivitaminsProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'price-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'price-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'name-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'name-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'date-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'MultiVitamins' &&  selectType === 'date-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        //  #endregion
    
        // #region 'search ---Weight-Gainers--- with sorting'
        else if (searchTerm !== '' && searchOnCategory === 'WeightGainers' &&  selectType === 'Default') {
            itemToDisplaySorted = getWeightGainersProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'WeightGainers' &&  selectType === 'price-asc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'WeightGainers' &&  selectType === 'price-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' && searchOnCategory === 'WeightGainers' &&  selectType === 'name-asc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightGainers' &&  selectType === 'name-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightGainers' &&  selectType === 'date-asc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightGainers' &&  selectType === 'date-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---Pre-Workouts--- with sorting'
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'Default') {
            itemToDisplaySorted = getPreWorkoutProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'price-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'price-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'name-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'name-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'date-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts' &&  selectType === 'date-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---Testosterone-Boosters--- with sorting'
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'Default') {
            itemToDisplaySorted = getTestosteroneBoostersProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'price-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'price-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'name-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'name-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'date-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters' &&  selectType === 'date-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'search ---Aminoacids--- with sorting'
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'Default') {
            itemToDisplaySorted = getAminoacidsProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'price-asc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'price-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'name-asc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'name-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'date-asc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids' &&  selectType === 'date-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        //  #endregion
    
        // #region 'search ---WeightBurners--- with sorting'
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'Default') {
            itemToDisplaySorted = getWeightBurnerProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'price-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'price-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'name-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'name-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'date-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners' &&  selectType === 'date-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = itemsToDisplay
    
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
            globalItemsToDisplay = itemToDisplaySorted
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        //  #endregion
    
        // #region 'search ---With no sorting---'
        else if (searchTerm !== '' &&  searchOnCategory === 'MultiVitamins') {
            itemToDisplaySorted = getMultivitaminsProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Creatines') {
            itemToDisplaySorted = getCreatineProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightBurners') {
            itemToDisplaySorted = getWeightBurnerProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'Aminoacids') {
            itemToDisplaySorted = getAminoacidsProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'PreWorkouts') {
            itemToDisplaySorted = getPreWorkoutProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'testosteroneBoosters') {
            itemToDisplaySorted = getTestosteroneBoostersProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
    
        else if (searchTerm !== '' &&  searchOnCategory === 'WeightGainers') {
            itemToDisplaySorted = getWeightGainersProducts()
            itemToDisplaySorted = searchByName(itemToDisplaySorted)
        }
        // #endregion

        // #endregion
    

        // #region 'CONDITIONALS FOR ---DEFAULT--- AND THEIR SORTING OPTIONS
        else if ( category === 'Default' &&  selectType === 'Default') {
            console.log(initialFilteredItems)
            return initialFilteredItems
        }
    
        else if ( category === 'Default' &&  selectType === 'price-asc' ||  selectType === 'price-asc' &&  category === 'Default') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Default' &&  selectType === 'price-desc') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Default' &&  selectType === 'name-asc') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Default' &&  selectType === 'name-desc') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Default' &&  selectType === 'date-asc') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Default' &&  selectType === 'date-desc') {
            itemsToDisplay =  items
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---OFFERS---  AND THEIR SORTING OPTIONS
        else if ( category === 'Offers' &&  selectType === 'Default') {
            itemsToDisplay = initialFilteredItems
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getOffersFromState()
        }
    
        else if ( category === 'Offers' &&  selectType === 'price-asc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Offers' &&  selectType === 'price-desc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Offers' &&  selectType === 'name-asc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Offers' &&  selectType === 'name-desc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Offers' &&  selectType === 'date-asc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Offers' &&  selectType === 'date-desc') {
            itemsToDisplay = getOffersFromState()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---PROTEINS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Proteins' &&  selectType === 'Default') {
            itemToDisplaySorted = getProteinProducts()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'price-asc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'price-desc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'name-asc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'name-desc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'date-asc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Proteins' &&  selectType === 'date-desc') {
            itemsToDisplay = getProteinProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---MULTIVITAMINS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Multivitamins' &&  selectType === 'Default') {
            itemToDisplaySorted = getMultivitaminsProducts()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'price-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'price-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'name-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'name-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'date-asc') {
            itemsToDisplay = getMultivitaminsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Multivitamins' &&  selectType === 'date-desc') {
            itemsToDisplay = getMultivitaminsProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---PRE-WORKOUT--- AND THEIR SORTING OPTIONS
        else if ( category === 'Pre-Workouts' &&  selectType === 'Default') {
            itemToDisplaySorted = getPreWorkoutProducts()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'price-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'price-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'name-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'name-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'date-asc') {
            itemsToDisplay = getPreWorkoutProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Pre-Workouts' &&  selectType === 'date-desc') {
            itemsToDisplay = getPreWorkoutProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---WEIGHT-GAINERS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'Default') {
            itemToDisplaySorted = getWeightGainersProducts()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'price-asc') {
            itemsToDisplay = getWeightGainersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'price-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'name-asc') {
            itemsToDisplay = getWeightGainersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'name-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'date-asc') {
            itemsToDisplay = getWeightGainersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Weight-Gainers' || category === 'weight-Gainers' &&  selectType === 'date-desc') {
            itemsToDisplay = getWeightGainersProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---CREATINE--- AND THEIR SORTING OPTIONS
        else if ( category === 'Creatine' &&  selectType === 'Default') {
            itemToDisplaySorted = getCreatineProducts()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'price-asc') {
            itemsToDisplay = getCreatineProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'price-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'name-asc') {
            itemsToDisplay = getCreatineProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'name-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'date-asc') {
            itemsToDisplay = getCreatineProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Creatine' &&  selectType === 'date-desc') {
            itemsToDisplay = getCreatineProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---AMINOACIDS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Aminoacids' &&  selectType === 'Default') {
            itemToDisplaySorted = getAminoacidsProducts()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'price-asc') {
            itemsToDisplay = getAminoacidsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'price-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'name-asc') {
            itemsToDisplay = getAminoacidsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'name-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'date-asc') {
            itemsToDisplay = getAminoacidsProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Aminoacids' &&  selectType === 'date-desc') {
            itemsToDisplay = getAminoacidsProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---WEIGHT-BURNERS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Weight-Burner' &&  selectType === 'Default') {
            itemToDisplaySorted = getWeightBurnerProducts()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'price-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'price-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'name-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'name-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'date-asc') {
            itemsToDisplay = getWeightBurnerProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Weight-Burner' &&  selectType === 'date-desc') {
            itemsToDisplay = getWeightBurnerProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        // #region 'CONDITIONALS FOR ---TESTOSTERONE-BOOSTERS--- AND THEIR SORTING OPTIONS
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'Default') {
            itemToDisplaySorted = getTestosteroneBoostersProducts()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'price-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByPriceAsc()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'price-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = getSortedByPriceDesc()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'name-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByNameAsc()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'name-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = getSortedByNameDesc()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'date-asc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            globalItemsToDisplay = itemsToDisplay
    
            itemToDisplaySorted = getSortedByDateAsc()
        }
    
        else if ( category === 'Testosterone-Boosters' &&  selectType === 'date-desc') {
            itemsToDisplay = getTestosteroneBoostersProducts()
            itemToDisplaySorted = getSortedByDateDesc()
        }
        // #endregion
    
        return itemToDisplaySorted
    
    }
    // #endregion

    // #endregion
    
    // #endregion


    // #region 'Returning Html of the page'
    return (

        <>

            <section className="container-menus">

                <ProductsHeader 
                    selectedModal = {selectedModal}
                    setSelectedModal = {setSelectedModal}

                    searchTerm = {searchTerm}
                    setSearchTerm = {setSearchTerm}

                    searchOnCategory = {searchOnCategory}
                    setSearchOnCategory = {setSearchOnCategory}

                    userName = {userName}
                    setUserName = {setUserName}

                    userCatcher = {userCatcher}
                    setUserCatcher = {setUserCatcher}

                    selectType = {selectType}
                    setSelectType = {setSelectType}
                />
                
                <ProductsMain 
                    items = {items}
                    setItems = {setItems}

                    initialItems = {initialItems}
                    setInitialItems = {setInitialItems}

                    selectType = {selectType}
                    setSelectType = {setSelectType}

                    category = {category}
                    setCategory = {setCategory}

                    showItems = {showItems}
                />
                    
                <ProductsFooter />
                    
            </section>
                                                
        </>

    )
    // #endregion

}

export default Products