import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbarmain from '../../../Components/Layouts/Navbarmain';
import Sidebar from '../../../Components/Layouts/SidebarHome';
import Footer from '../../../Components/Layouts/Footer';
import FileUpload from '../../Files/Components/FileUpload';
import FileList from '../../Files/Components/FileList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/RequirementUploadPage.css';

const RequirementUploadPage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { projectId } = useParams();
  const [requirementDocuments, setRequirementDocuments] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/file/${projectId}`);
        setRequirementDocuments(response.data.map(doc => ({
          id: doc._id,
          name: doc.name,
          comments: 0,
          downloadLink: `http://localhost:4000${doc.filePath}`,
          selected: false,
          projectId: doc.projectId,
        })));
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [projectId]);

  const handleUpload = async (files, description) => {
    const formData = new FormData();
    formData.append('file', files[0]); // Assuming single file upload
    formData.append('description', description);
    formData.append('projectId', projectId);

    try {
      const response = await axios.post('http://localhost:4000/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newDocument = {
        id: response.data.file._id,
        name: response.data.file.name,
        comments: 0,
        downloadLink: `http://localhost:4000${response.data.file.filePath}`,
        selected: false,
        projectId: response.data.file.projectId,
      };
      
      setRequirementDocuments(prevDocs => [...prevDocs, newDocument]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSelect = (id) => {
    setRequirementDocuments(requirementDocuments.map(doc =>
      doc.id === id ? { ...doc, selected: !doc.selected } : doc
    ));
  };

  return (
    <div className='PO'>
      <Navbarmain toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div className="content">
        <Container>
          <Row>
            <Col>
              <FileUpload onUpload={handleUpload} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <FileList documents={requirementDocuments} onSelect={handleSelect} />
            </Col>
          </Row>
       </Container>
        </div>
    </div>
      <Footer />
    </div>
  );
};

export default RequirementUploadPage;