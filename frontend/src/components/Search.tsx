import Filter from "./Filter/Filter"
import Button from "./Button/Button"
import SearchInput from "./SearchInput/SearchInput"

import './Search.css'

export default function Search(){

    return(
        <div className="section">
            <div className="section-header">
            <h3>
                Get Started
            </h3>
            <p>
                Search Your Scholarship!
            </p>
            </div>
            <div className="section__search-input">
            <SearchInput/>
            <Button>Search</Button>
            </div>
            <Filter/>
        </div>
    )
}