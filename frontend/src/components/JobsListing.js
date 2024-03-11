import React, { useState, useEffect } from 'react';
import './style.css';
import { Sling as Hamburger } from 'hamburger-react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Plus } from 'react-bootstrap-icons';
import { API_ENDPOINTS } from '../config/config'; 
import { Toolbar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function ListingPage() {
  const [isOpen, setOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('job');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newRecord, setNewRecord] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const pageTitleMap = {
    prep: 'Interview Preparation Listing',
    job: 'Job Opportunities',
    expert: 'One-on-One Sessions',
    internship: 'Internship Opportunities',
    feedback: 'Company Reviews & Ratings'
  };

  const PageTitle = pageTitleMap[listingType];

  useEffect(() => {
    console.log("Inside useEffect");
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
    } else {
      const admin = user.data && user.data.isAdmin ? user.data.isAdmin: false;
      setIsAdmin(admin); 
    
      fetchListings();
    }
  }, [search, role, page, listingType, navigate, newRecord]);

  const fetchListings = async () => {
    try {
      let url = '';
      if (listingType === 'job' || listingType === 'internship') {
        url = API_ENDPOINTS.JOBS + `?filter=${role}&search=${search}&limit=${pageSize}&offset=${page * 10}&type=${listingType}`;
      } else if (listingType === 'expert') {
        url = API_ENDPOINTS.EXPERT + `?filter=${role}&search=${search}&limit=${pageSize}&offset=${page * 10}`;
      } else if (listingType === 'prep') {
        url = API_ENDPOINTS.INTERVIEW_PREP + `?filter=${role}&search=${search}&limit=${pageSize}&offset=${page * 10}`;
      } else if (listingType === 'feedback') {
        url = API_ENDPOINTS.FEEDBACK + `?filter=${role}&search=${search}&limit=${pageSize}&offset=${page * 10}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setListings(data.data || []);
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

  const handleListingTypeChange = (type) => {
    setListingType(type);
    setLoading(true);
    setPage(0);
  };

  const handleContactClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');

    navigate('/');
  };

  const handleAddRecord = async () => {
    try {
      let apiUrl = {
        'job': API_ENDPOINTS.JOBS,
        'internship': API_ENDPOINTS.JOBS,
        'expert': API_ENDPOINTS.EXPERT,
        'prep': API_ENDPOINTS.INTERVIEW_PREP,
        'feedback': API_ENDPOINTS.FEEDBACK,
      }
      const newRecordWithType = { ...newRecord, type: listingType };
      const response = await fetch(apiUrl[listingType], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record: newRecordWithType  }),
      });
  
      if (response.ok) {
        console.log('Record added successfully');
        setShowAddInput(false);
        setNewRecord('');
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const renderRating = (value) => {
    const stars = [];
    for (let i = 0; i < value; i++) {
      stars.push(<StarIcon key={i} style={{ color: value >= 3 ? 'gold' : 'red' }} />);
    }
    return stars;
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70, filterable: false, editable: false, manageable: false },
    { field: `${listingType === 'expert' ? 'name' : 'title'}`, headerName: `${listingType === 'expert' ? 'Name' : 'Title'}`, width: 250, filterable: false, editable: false, hide: listingType === 'feedback' ? true : false },
    { field: `${listingType === 'prep' ? 'platform' : 'company'}`, headerName: `${listingType === 'prep' ? 'Platform' : 'Company'}`, width: 250, filterable: false, editable: false  },
    { field: `${listingType === 'expert' || listingType === 'prep'|| listingType === 'feedback' ? 'jobrole' : 'jobroles'}`, headerName: 'JobRole', width: 250, filterable: false, editable: false },
    { field: 'salary', headerName: 'Salary (LPA)', width: 100, filterable: false, editable: false, hide: listingType === 'expert' || listingType === 'prep' || listingType === 'feedback' ? true : false },
    { field: `${listingType === 'feedback' ? 'reviews' : 'description'}`, headerName: `${listingType === 'feedback' ? 'Reviews' : 'Description'}`, width: 600, filterable: false, editable: false, hide: listingType === 'prep' ? true : false },
    { 
      field: 'Action', 
      headerName: 'Action', 
      width: listingType === 'prep' ? 300 : 150, 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => {
            if (listingType === 'expert') {
              handleContactClick(params.row.link);
            } else {
              const link = params.row.link;
              window.open(link, '_blank');
            }
          }}
        >
          {listingType === 'expert' ? 'Contact' : listingType === 'prep' ? 'Start Preparing Now' : 'Apply'}
        </Button>
      ),
      filterable: false, 
      editable: false,
      hide: listingType === 'feedback' ? true : false
    },
    {
      field: 'rating',
      headerName: 'Ratings',
      width: 250,
      filterable: false,
      editable: false,
      manageable: false,
      hide: listingType === 'feedback' ? false : true,
      renderCell: (params) => (
        <div>
          {renderRating(params.value)}
        </div>
      )
    }
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
        <a className="navbar-brand" href="/"> &nbsp; Opportunity Cruiser  &nbsp;</a>
        <h1 className="navbar-brand mx-auto text-center" > &nbsp; {PageTitle}</h1>
        <div className="navbar-nav flex-row ms-auto me-4">
          <a className="btn btn-outline-danger me-3" href="/" role="button" onClick={() => handleLogout()}>Logout</a>
        </div>
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
              <button type="button" className="list-group-item list-group-item-action" onClick={() => handleListingTypeChange('expert')}>
                One-on-One Sessions
              </button>
              <button type="button" className="list-group-item list-group-item-action" onClick={() => handleListingTypeChange('prep')}>
                Interview Preparation
              </button>
              <button type="button" className="list-group-item list-group-item-action" onClick={() => handleListingTypeChange('feedback')}>
                Company Reviews & Ratings
              </button>
              <button type="button" className="list-group-item list-group-item-action">
                Mock Test Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`col-md-9 ${isOpen ? 'content-shifted-right' : 'content-shifted-left'}`}>
        <div className="container">
          <div className="d-flex align-items-center">
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="datagrid-container">
                <DataGrid 
                  autoHeight  
                  className="bootstrap-datagrid"
                  columns={columns}
                  rows={listings}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 20]}
                  onPageChange={(newPage) => setPage(newPage)}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  getRowSpacing={params=> ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0: 5
                  })}
                  sx={{
                    border: 'none',
                    width: isOpen ? '75vw': '92vw'
                  }}
                  components={{
                    Toolbar: () => (
                      <Toolbar
                        className="bg-light d-flex flex-wrap justify-content-between align-items-center"
                        sx={{ border: '1px solid #ddd', borderRadius: '4px' }}
                      >
                        <div className="input-group mt-3 mb-3">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-control"
                            autoFocus
                          />
                          <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="form-select me-2"
                          >
                            <option value="">All Roles</option>
                            <option value="Development">Development</option>
                            <option value="Management">Management</option>
                          </select>
                          {(isAdmin || listingType==='feedback') && (
                            <div
                              className="plus-icon"
                              style={{
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'transform 0.5s',
                                transform: showAddInput ? 'rotate(45deg)' : 'none',
                              }}
                              onClick={() => setShowAddInput(!showAddInput)}
                            >
                              <div
                                style={{
                                  backgroundColor: 'green',
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Plus size={40} style={{ color: 'white' }} />
                              </div>
                            </div>
                          )}
                        </div>

                        {showAddInput && (
                          <div>
                            <br />
                            <table className="table">
                              <tbody>
                                {columns.map((column) => (
                                  column.headerName !== 'ID' && !column.hide && (
                                    <tr key={column.field}>
                                      <td>{column.headerName}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={newRecord[column.field] || ''}
                                          name={column.field}
                                          onChange={(e) =>
                                            setNewRecord({ ...newRecord, [column.field]: e.target.value })
                                          }
                                          autoFocus
                                        />
                                      </td>
                                    </tr>
                                  )
                                ))}
                              </tbody>
                            </table>
                            <br />
                            <button className="btn btn-primary mb-3 w-100" type="button" onClick={handleAddRecord}>Add</button>
                          </div>
                        )}
                      </Toolbar>
                    ),
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
