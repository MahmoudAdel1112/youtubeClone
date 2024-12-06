import { useState } from "react"
import { Search } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(searchTerm){
            navigate(`/search/${searchTerm}`)
        }
        setSearchTerm('');
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={handleChange}
                        className="rounded-xl h-8 outline-none text-xl p-3 w-[50vw] md:w-[35vw]"
                    />
                    <button 
                    type="submit"
                    className=""
                    >
                    <Search sx={{color: 'red', fontSize: '35px', marginLeft: '10px'}}></Search>
                    </button>
            </form>
        </div>
    )
}
