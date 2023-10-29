import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReactPaginate from 'react-paginate';

function App() {
  const [apiData, setApiData] = useState([]);

  const [pageNumber, setPageNumer] = useState(0);
  const itemPage = 6;

  useEffect(() => {
    const handlerApi = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/produtos'
        );
        setApiData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handlerApi();
  }, []);

  const indexOfLastPage = (pageNumber + 1) * itemPage;
  const indexFirstPost = pageNumber * itemPage;
  const currentPost = apiData.slice(indexFirstPost, indexOfLastPage);

  const handlePageClick = (selectedPage) => {
    const pageNumber = selectedPage.selected;
    setPageNumer(pageNumber);
  };

  return (
    <>
      <div>
        <h2>Produtos</h2>
        <ul className='produtos'>
          {currentPost.map((item) => (
            <li key={item.id}>
              <span>ID: {item.id}</span>
              <span>{item.nome}</span>
              <span>R$: {item.valor}</span>
            </li>
          ))}
        </ul>
        <div className='pagination-style'>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Próximo'}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
            pageCount={Math.ceil(apiData.length / itemPage)}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </>
  );
}

export default App;
