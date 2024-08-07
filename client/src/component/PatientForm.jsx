import React, { useState } from 'react';
import '../styles/PatientForm.css'

const PatientForm = ({ 
    isAddingToExisting, 
    uploadData, 
    newPatient, 
    patients, 
    selectedBodyPart, 
    handleInputChange, 
    handleFileChange, 
    handleSubmit, 
    handleBackClick 
}) => {
    const [selectedFileName, setSelectedFileName] = useState('');

    const onFileChange = (e) => {
        handleFileChange(e);
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName('');
        }
    };

    return (
        <div className="dashboard-container">
            <img 
                src="src/assets/images/undo.png" 
                alt="Back" 
                className="back-button-icon" 
                onClick={handleBackClick} 
            />
            <form onSubmit={handleSubmit} className="patient-form">
                {isAddingToExisting ? (
                    <>
                        <label>
                            Patient:
                            <select name="patientId" value={uploadData.patientId} onChange={handleInputChange} required>
                                <option value="">Select a patient</option>
                                {patients.map(patient => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.name} - {patient.idNumber}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Description:
                            <textarea name="description" value={uploadData.description} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Body Part:
                            <input type="text" name="bodyPart" value={selectedBodyPart} readOnly required />
                        </label>
                        <label>
                            Upload Image:
                            <input type="file" name="image" onChange={onFileChange} id="file-upload" style={{ display: 'none' }} required />
                            <label htmlFor="file-upload" className="upload-image-label">
                                <img src="src/assets/images/upload-file.png" alt="Upload" className="upload-button-icon" />
                            </label>
                            {selectedFileName && <p className="file-name">File selected: {selectedFileName}</p>}
                        </label>
                    </>
                ) : (
                    <>
                        <h2>Create a New Patient</h2>
                        <label>
                            Name:
                            <input type="text" name="name" value={newPatient.name} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Age:
                            <input type="number" name="age" value={newPatient.age} onChange={handleInputChange} min="0" required />
                        </label>
                        <label>
                            Gender:
                            <select name="gender" value={newPatient.gender} onChange={handleInputChange} required>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                        <label>
                            ID Number:
                            <input type="text" name="idNumber" value={newPatient.idNumber} onChange={handleInputChange} required />
                        </label>
                    </>
                )}
                <div className="button-container">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleBackClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
