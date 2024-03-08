import React, { useState, useEffect } from 'react';
import './style.css';
import { Sling as Hamburger } from 'hamburger-react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { gridClasses } from '@mui/system';
import UserActions from './UserActions';
import Button from '@mui/material/Button';

function ListingPage() {
  const [isOpen, setOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('job');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(0);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
    }
    
    fetchListings();
  }, [search, role, page]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${listingType}_list?filter=${role}&search=${search}&limit=${pageSize}&offset=${page * 10}`);
      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        console.log("data.data: ", data.data);
        let lstData = [];
        if (data.data !== '' && typeof data.data !== 'undefined' && data.data.length > 0){
          lstData = data.data;
        }
        setListings(lstData);
        setLoading(false);
      } else {
        console.error('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const toggleSidebar = () => {
    setOpen(!isOpen);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, filterable: false, editable: false, manageable: false },
    { field: 'company', headerName: 'Company', width: 250, filterable: false, editable: false },
    { field: 'title', headerName: 'Title', width: 250, filterable: false, editable: false },
    { field: 'jobroles', headerName: 'JobRole', width: 250, filterable: false, editable: false },
    { field: 'salary', headerName: 'Salary (LPA)', width: 100, filterable: false, editable: false },
    { field: 'description', headerName: 'Description', width: 600, filterable: false, editable: false },
    { 
      field: 'Action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => {
            const link = params.row.link;
            window.open(link, '_blank'); // Open link in new tab
          }}
        >
          Apply
        </Button>
      ),
      filterable: false, 
      editable: false 
    },
    // add more columns as needed
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Hamburger
          toggled={isOpen}
          toggle={toggleSidebar}
          onToggle={(toggled) => {
            setOpen(toggled);
          }}
        />
      </nav>

      <div className={`${isOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <div className="row">
          <div className="col-lg-2 bg-dark sidebar">
            <div className="list-group list-group-flush">
              <button type="button" className="list-group-item list-group-item-action" onClick={() => setListingType('job')}>
                Job Opportunities
              </button>
              <button type="button" className="list-group-item list-group-item-action" onClick={() => setListingType('internship')}>
                Internship Opportunities
              </button>
              <button type="button" className="list-group-item list-group-item-action">
                One-on-One Sessions
              </button>
              <button type="button" className="list-group-item list-group-item-action">
                Interview Preparation
              </button>
              <button type="button" className="list-group-item list-group-item-action">
                Feedback of Companies
              </button>
              <button type="button" className="list-group-item list-group-item-action">
                Mock Test Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`col-lg-10 ${isOpen ? 'content-shifted-right' : ''}`}>
        <div className="container">
          <h2>{listingType.charAt(0).toUpperCase() + listingType.slice(1)} Listings</h2>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            {/* Add your roles here */}
            <option value="Development">Development</option>
            <option value="Management">Management</option>
            {/* etc. */}
          </select>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
            <br></br>
            <br></br>
              <div >
                <DataGrid autoHeight  
                  columns={columns}
                  rows={listings}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageChange={(newPage) => setPage(newPage)}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  getRowSpacing={params=> ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0: 5
                  })}
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
