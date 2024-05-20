import React, { useState } from 'react';
import './registration.css';

const Registration = () => {
  const [activeTab, setActiveTab] = useState('approved');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [deniedData, setDeniedData] = useState([]);
  const [dummyData, setDummyData] = useState([
    { id: 1, name: 'Aryan', usn: '1BM21CS001', courses: ['Math', 'Science', 'History'] },
    { id: 2, name: 'Jane', usn: '1BM21CS007', courses: ['English', 'Physics', 'Geography'] },
    { id: 3, name: 'Alice', usn: '1BM21CS067', courses: ['Chemistry', 'Biology', 'Art'] },
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleStudentSelection = (student) => {
    const isSelected = selectedStudents.some((s) => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const approveSelectedStudents = () => {
    setApprovedData([...approvedData, ...selectedStudents]);
    setDeniedData(deniedData.filter((s) => !selectedStudents.includes(s)));
    setSelectedStudents([]);

    // Remove selected students from 'Yet to Approve'
    const remainingStudents = dummyData.filter((student) => !selectedStudents.includes(student));
    setDummyData(remainingStudents);
  };

  const denySelectedStudents = () => {
    setDeniedData([...deniedData, ...selectedStudents]);
    setSelectedStudents([]);

    // Remove selected students from 'Yet to Approve'
    const remainingStudents = dummyData.filter((student) => !selectedStudents.includes(student));
    setDummyData(remainingStudents);
  };

  const reviewStudent = (student) => {
    setApprovedData(approvedData.filter((s) => s !== student));
    setDummyData([...dummyData, student]);
    setDeniedData(deniedData.filter((s) => s !== student));
  };
  

  return (
    <>
      <nav className="navbar1">
        <img src="images/bms_logo.png" alt="BMS Logo" className="logo" />
        <button className="btn-group_item1">Logout</button>
      </nav>
      <div className="sidebar">
        <button
          className={activeTab === 'approved' ? 'active' : ''}
          onClick={() => handleTabClick('approved')}
        >
          Approved
        </button>
        <button
          className={activeTab === 'denied' ? 'active' : ''}
          onClick={() => handleTabClick('denied')}
        >
          Denied
        </button>
        <button
          className={activeTab === 'yet-to-approve' ? 'active' : ''}
          onClick={() => handleTabClick('yet-to-approve')}
        >
          Yet to Approve
        </button>
      </div>
      <div className="content">
        <div className={`tab-content ${activeTab === 'approved' ? 'active' : ''}`} id="tab-approved">
          <h2>Approved</h2>
          <table className="verify-courses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedData.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.usn}</td>
                  <td>{student.courses.join(', ')}</td>
                  <td>
                    <button>View</button>
                    <button onClick={() => reviewStudent(student)}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`tab-content ${activeTab === 'denied' ? 'active' : ''}`} id="tab-denied">
          <h2>Denied</h2>
          <table className="verify-courses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deniedData.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.usn}</td>
                  <td>{student.courses.join(', ')}</td>
                  <td>
                    <button onClick={() => reviewStudent(student)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`tab-content ${activeTab === 'yet-to-approve' ? 'active' : ''}`} id="tab-yet-to-approve">
          <h2>Yet to Approve</h2>
          <table className="verify-courses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Courses</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((student) => (
                <tr key={`${student.id}-${activeTab}`}>
                  <td>{student.name}</td>
                  <td>{student.usn}</td>
                  <td>{student.courses.join(', ')}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => toggleStudentSelection(student)}
                      checked={selectedStudents.some((s) => s.id === student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={approveSelectedStudents}>Approve Selected</button>
          <button onClick={denySelectedStudents}>Deny Selected</button>
          
        </div>
      </div>
    </>
  );
};

export default Registration;
