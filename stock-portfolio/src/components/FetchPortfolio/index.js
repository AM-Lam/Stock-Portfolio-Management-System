// import React from 'react';
// import { useState, useRef, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// function loadServerRows(page, data) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data.rows.slice(page * 5, (page + 1) * 5));
//     }, Math.random() * 500 + 100); // simulate network latency
//   });
// }

// function StockGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     maxColumns: 6,
//   });

//   const [page, setPage] = useState(0);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectionModel, setSelectionModel] = useState([]);
//   const prevSelectionModel = useRef(selectionModel);

//   useEffect(() => {
//     let active = true;

//     (async () => {
//       setLoading(true);
//       const newRows = await loadServerRows(page, data);

//       if (!active) {
//         return;
//       }

//       setRows(newRows);
//       setLoading(false);
//       setTimeout(() => {
//         setSelectionModel(prevSelectionModel.current);
//       });
//     })();

//     return () => {
//       active = false; 
//   }, [page, data]);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={data.columns}
//         pagination
//         checkboxSelection
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         rowCount={100}
//         paginationMode="server"
//         onPageChange={(newPage) => {
//           prevSelectionModel.current = selectionModel;
//           setPage(newPage);
//         }}
//         onSelectionModelChange={(newSelectionModel) => {
//           setSelectionModel(newSelectionModel);
//         }}
//         selectionModel={selectionModel}
//         loading={loading}
//       />
//     </div>
//   );
// }
// export default StockGrid;