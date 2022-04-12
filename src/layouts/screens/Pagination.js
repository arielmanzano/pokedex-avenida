import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';

import { fetchPokemons } from '../../state/actions';

const PaginationComponent = () => {
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch()
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchPokemons(`limit=20&offset=${(page - 1) * 20}`))
  }, [dispatch, page])

  return (
    <div>
      <Typography>Page: {page}</Typography>
      <Pagination count={900 / 20} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationComponent;