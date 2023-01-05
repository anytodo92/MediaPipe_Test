import React from 'react';
import DataGrid from 'components/DataGrid';
import { getEditToolbar } from 'components/EditToolbar';
import { useGetPostsQuery } from 'app/services/posts';
import { useDispatch } from 'react-redux';
import { postsApi } from 'app/services/posts';

const postRow = {
  title: '',
  body: '',
};

const EditToolbar = getEditToolbar(postRow);

const categoryColumns = [
  { field: 'id', type: 'number', hide: true },
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 200,
    maxWidth: 250,
    type: 'string',
    flex: 1,
    editable: true,
  },
  {
    field: 'body',
    headerName: 'Body',
    minWidth: 200,
    maxWidth: 300,
    type: 'string',
    flex: 1,
    editable: true,
  },
];

const Posts = () => {
  const { data, error, isLoading } = useGetPostsQuery();
  const dispatch = useDispatch();

  const handleSaveRow = async (row) => {
    if (row.isNew) dispatch(postsApi.endpoints.addPost.initiate(row));
    else dispatch(postsApi.endpoints.editPost.initiate(row));
  };

  const handleDeleteRow = async (id) => {
    dispatch(postsApi.endpoints.deletePost.initiate(id));
  };

  if (error) return <h3>Error loading posts.</h3>;
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <React.Fragment>
      <DataGrid
        columns={categoryColumns}
        initialRows={data}
        handleSaveRow={handleSaveRow}
        handleDeleteRow={handleDeleteRow}
        dataGridProps={{
          components: {
            Toolbar: EditToolbar,
          },
          loading: false,
        }}
      />
    </React.Fragment>
  );
};

export default Posts;
